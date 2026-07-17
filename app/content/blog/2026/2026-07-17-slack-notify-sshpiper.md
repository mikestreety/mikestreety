---
title: Notify Slack when an SSH connection is made with sshpiper
intro: For transparency and audits, send Slack notifications when someone connects to a live server
tags:
  - CLI
  - Slack
---

Keeping track of which developer is connecting to which server can be a job in itself. There are plenty of ways to handle it, from sending logs to dedicated software to writing them to a file that someone has to check manually.

Our [sshpiper](https://github.com/tg123/sshpiper) setup takes a different approach and sends a Slack notification to a dedicated channel whenever a connection happens. This means we can keep an eye on things and quickly confirm that connections are genuine and expected.

To make this work, we built a custom notification plugin that sits between the existing [fail2ban](https://github.com/tg123/sshpiper/blob/master/plugin/failtoban) and [workingdir](https://github.com/tg123/sshpiper/blob/master/plugin/workingdir) plugins.

<div class="note">A working sshpiper install is required for this</div>

## Overview

The files used for this plugin are

- `/plugins/authnotify/main.go` - The go code (which gets compiled)
- `/etc/sshpiperd/slack-webhook-url` - Text file with your incoming webhook

## The plugin code

This is a slightly trimmed down version of the one we have so you can get the basics going. There's an explanation at the end as to the additional checks we have. Feel free to [reach out](https://www.mikestreety.co.uk/contact/) if you'd like an example.

Create a file/folder for you plugin (ours lives in `/plugins/authnotify/main.go`)

<details>

<summary><code>main.go</code></summary>

```go
package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"log/slog"
	"net"
	"net/http"
	"os"

	"github.com/tg123/sshpiper/libplugin"
	"github.com/urfave/cli/v2"
	"golang.org/x/crypto/ssh"
)

func main() {
	libplugin.CreateAndRunPluginTemplate(&libplugin.PluginTemplate{
		Name: "authnotify",
		Flags: []cli.Flag{
			&cli.StringFlag{Name: "authorized-keys", Value: "/etc/sshpiperd/shared/authorized_keys"},
			&cli.StringFlag{Name: "slack-webhook-url-file"},
		},
		CreateConfig: func(c *cli.Context) (*libplugin.SshPiperPluginConfig, error) {
			authorizedKeysPath := c.String("authorized-keys")

			webhookURL := ""
			if f := c.String("slack-webhook-url-file"); f != "" {
				if b, err := os.ReadFile(f); err == nil {
					webhookURL = string(bytes.TrimSpace(b))
				}
			}

			return &libplugin.SshPiperPluginConfig{

				// Runs once per key the client's SSH agent offers.
				PublicKeyCallback: func(conn libplugin.ConnMetadata, key []byte) (*libplugin.Upstream, error) {
					identity := lookupIdentity(authorizedKeysPath, key)
					slog.Info("auth attempt", "identity", identity, "remote", conn.RemoteAddr())

					if identity == "" {
						// Not our key to judge — offer the agent's next key
						// instead of rejecting (that would trip failtoban)
						// or advancing (we'd miss whichever key actually works).
						return &libplugin.Upstream{
							Auth: libplugin.CreateRetryCurrentPluginAuth(map[string]string{}),
						}, nil
					}

					// Matched: hand off to workingdir, which makes the real
					// accept/reject decision. Carry identity forward for later.
					return &libplugin.Upstream{
						Auth: libplugin.CreateNextPluginAuth(map[string]string{"identity": identity}),
					}, nil
				},

				// Runs only once a connection is actually accepted and piped.
				PipeStartCallback: func(conn libplugin.ConnMetadata) {
					identity := conn.GetMeta("identity")
					ip, _, _ := net.SplitHostPort(conn.RemoteAddr())
					postToSlack(webhookURL, identity, conn.User(), ip)
				},
			}, nil
		},
	})
}

// lookupIdentity re-reads and re-parses authorized_keys on every call. The
// real plugin caches this on file mtime (see authnotify's authorizedKeysCache)
// so the hot auth path isn't re-parsing the file per offered key — trimmed
// here for clarity.
func lookupIdentity(path string, offeredKeyBytes []byte) string {
	offeredKey, err := ssh.ParsePublicKey(offeredKeyBytes)
	if err != nil {
		return ""
	}

	data, err := os.ReadFile(path)
	if err != nil {
		return ""
	}

	rest := data
	for len(rest) > 0 {
		key, comment, _, remainder, err := ssh.ParseAuthorizedKey(rest)
		if err != nil {
			break
		}
		if key != nil && bytes.Equal(key.Marshal(), offeredKey.Marshal()) {
			return comment
		}
		rest = remainder
	}

	return ""
}

func postToSlack(webhookURL, identity, client, ip string) {
	if webhookURL == "" || identity == "" {
		return
	}
	payload, err := json.Marshal(map[string]string{
		"text": fmt.Sprintf("SSH: %s connected to *%s* from %s", identity, client, ip),
	})
	if err != nil {
		return
	}
	http.Post(webhookURL, "application/json", bytes.NewReader(payload))
}
```

</details>

## Build the plugin

Once saved, we need to compile the plugin and move to a more suitable location (`/opt/sshpiper/bin/` is where we have compiled all of our sshpiper plugins)

```bash
cd plugins/authnotify && go build -o /opt/sshpiper/bin/authnotify .
```

## Slack webhook

Next, create a file (`/etc/sshpiperd/slack-webhook-url`) which contains your Slack incoming webhook (you'll need to [make an app](https://docs.slack.dev/messaging/sending-messages-using-incoming-webhooks/) to get this)

```bash
nano /etc/sshpiperd/slack-webhook-url
```

We then need to lock down the permissions as best we can on the file

```
chown sshpiper:sshpiper /etc/sshpiperd/slack-webhook-url
chmod 600 /etc/sshpiperd/slack-webhook-url
```

## Wire up the plugin

We have our sshpiper instance running as a service, but however you initialise sshpiper, add the custom plugin 

Note: Update the path to your `authorized_keys` file, as well as the `slack-webhook-url` if different.

```bash
/opt/sshpiper/bin/failtoban \
    --max-failures=20 --ban-duration=15m --ignore-ip=127.0.0.1 \
    -- \
    /opt/sshpiper/bin/authnotify --authorized-keys /etc/sshpiperd/shared/authorized_keys \
        --slack-webhook-url-file /etc/sshpiperd/slack-webhook-url  \
    -- \
    /opt/sshpiper/bin/workingdir --root /etc/sshpiperd/hosts --strict-hostkey
```

## Additions

There are a few additions to our plugin we have (removed from above for simplicity) which might be worth exploring:

- `authorized_keys` caching - cache the `authorized_keys` file based on modified time to save loading it each connection
- Grace period - ours inspects user, ip and target and, if it matches one from the last 30 seconds it skips sending the Slack message (handy for repeated or flaky connections)

If you would like more information or an example of the expanding plugin, [let me know](/contact/).