in `/etc/profile` (or bashrc)

```
eval $(ssh-agent -s)
ssh-add ~/.ssh/id_ed25519
ssh -o 'ForwardAgent yes' gateway 'ssh-add'
```

In `ssh/config`

```
Host *
    AddKeysToAgent confirm 1d
```