#!/usr/bin/python

import sys, os, re, json


# Bump manifest version number
manifest = open('src/manifest.json', 'r+')
manifestJson = json.load(manifest);

version = str(int(manifestJson['version']) + 1);

manifest.seek(0);
contents = manifest.read();
manifest.seek(0);
manifest.write(re.sub('"version": "\d+"', '"version": "' + version + '"', contents))
manifest.truncate();
manifest.close();

# Package extension and move it into release/
filename = 'bettergb-' + version + '.crx'
os.system('google-chrome --pack-extension=src/ --pack-extension-key=private_key.pem --no-message-box && mv src.crx release/' + filename)

# Update updates.xml
updates = open('updates.xml', 'r+')
contents = updates.read();
updates.seek(0);
contents = re.sub('bettergb-\d+.crx', 'bettergb-' + version + '.crx', contents)
contents = re.sub('version=\'\d+\'', 'version=\'' + version + '\'', contents)
updates.write(contents)
updates.truncate()
updates.close()

# Update README
readme = open('README.markdown', 'r+')
contents = readme.read();
readme.seek(0);
readme.write(re.sub('bettergb-\d+.crx', 'bettergb-' + version + '.crx', contents))
readme.truncate()
readme.close()
