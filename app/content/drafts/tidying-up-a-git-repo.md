---
title: Tidying up a git repo
date: 2020-09-08
updated: 2020-09-08
intro: git clone --bare --mirror [path] du -h [folder] 10 largest commits ` git verify-pack -v objects/pack/[file].idx | sort -k 3 -n | tail -10 ` `git rev-list --objects --all | grep [hash]` - find ...
draft: true
---

git clone --bare --mirror [path]
du -h [folder]

10 largest commits

` git verify-pack -v objects/pack/[file].idx | sort -k 3 -n | tail -10 `

`git rev-list --objects --all | grep [hash]` - find the files (e.g. `5541740b808089a6738d6d830ffac0b9b31c4732 html/ukpi/6UK-P&I_Publication_home.jpg`)

Need `git-filter-repo` installed

`git filter-repo --path [path] --invert-paths`

`git gc --aggressive --prune=now`


- - - 

delete, git add origin git push etc

`git fetch origin`
`git reset --hard [branch]`