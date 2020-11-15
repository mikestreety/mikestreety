---
title: Fixing an IP address on a Raspberry Pi (and Debian in General)
published: 2020-6-8
updated: 2020-6-8
draft: true
---

pi@raspberrypi:~ $ ip a
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
    inet6 ::1/128 scope host
       valid_lft forever preferred_lft forever
2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc pfifo_fast state UP group default qlen 1000
    link/ether b8:27:eb:a8:a3:b1 brd ff:ff:ff:ff:ff:ff
    inet 192.168.5.98/24 brd 192.168.5.255 scope global dynamic noprefixroute eth0
       valid_lft 73610sec preferred_lft 62810sec
    inet6 fd91:92f5:342c:1:365d:bf0d:6de7:ee82/64 scope global dynamic mngtmpaddr noprefixroute
       valid_lft 7129sec preferred_lft 7129sec
    inet6 fe80::560c:68f9:eaac:86c6/64 scope link
       valid_lft forever preferred_lft forever



pi@raspberrypi:~ $ sudo vim /etc/network/interfaces


auto eth0
iface eth0 inet static
	address 192.168.5.5

sudo /etc/init.d/networking restart