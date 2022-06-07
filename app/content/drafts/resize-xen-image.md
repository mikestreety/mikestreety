

1. `xl list`
1. `xl shutdown <name>`
2. `cat /etc/xen/<name>.cfg`
3. Make a note of `'file:/var/lib/xen/domains/<name>/disk.img,xvda1,w',`
4. `cd <path>`
5. `cp disk.img backup.img`
6. `dd if=/dev/zero bs=2G count=2 >> disk.img` - that adds 4g (2 lots of 2gb) - increase the count (maybe drop the bs) if you get an error like `dd: memory exhausted by input buffer of size` - e.g. `dd if=/dev/zero of=/swapfile bs=1M count=2048` - 2048 lots of 1mb
7. Check the disk `e2fsck -f disk.img`
8. Resize the disk
