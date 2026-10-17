#!/bin/sh
OUTPUTFILE=$(date '+%FT%T').jpg
rpicam-still --output /home/pi/thermo/public/images/$OUTPUTFILE
cp /home/pi/thermo/public/images/$OUTPUTFILE /home/pi/thermo/public/images/webcam.jpg
