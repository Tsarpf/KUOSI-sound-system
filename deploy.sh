#!/bin/bash

rsync -av --progress ./ /home/tsarpf/public_html/KUOSI-sound-system/ --exclude .git/ --exclude websockify/ --exclude server/
