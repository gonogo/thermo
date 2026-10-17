#!python-venv/bin/python

# Can enable debug output by uncommenting:
#import logging
#logging.basicConfig(level=logging.DEBUG)

import board
import digitalio
import adafruit_max31855
import time
import sys
spi = board.SPI()
cs = digitalio.DigitalInOut(board.D4)
max31855 = adafruit_max31855.MAX31855(spi, cs)

# Loop printing measurements every second.
while True:
	print('{0:0.2F}'.format(max31855.temperature))
	sys.stdout.flush()
	time.sleep(1.0)
