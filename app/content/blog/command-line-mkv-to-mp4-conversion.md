---
title: Command line MKV to mp4 conversion
published: 2017-7-26
updated: 2017-7-26
draft: true
---

`sudo apt-get install libav-tools`

`sudo avconv -stats -i "/mnt/Media/Downloads/Fargo.S03E04.720p.HDTV.x264-AVS[eztv].mkv" -codec copy "/mnt/Media/Downloads/Fargo.S03E04.720p.HDTV.x264-AVS[eztv].mp4" -y`

```
sudo find $1 -name *.mkv |
while read filename
do
	result_string="${filename/mkv/mp4}"
	sudo avconv -stats -i "$filename" -codec copy "$result_string" -y
done
```

./MKVConvert.sh /path/to/mkv