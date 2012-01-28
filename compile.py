#!/usr/bin/python

import httplib, urllib, sys, os, json

# Define the parameters for the POST request and encode them in
# a URL-safe format.

if len(sys.argv) <= 1:
  print 'Usage: ' + sys.argv[0] + ' FILES...'
  sys.exit();

params = urllib.urlencode([
#    ('js_code', sys.argv[1]),
    ('compilation_level', 'SIMPLE_OPTIMIZATIONS'),
    ('output_format', 'json'),
    ('output_info', 'compiled_code'),
    ('output_info', 'errors'),
    ('output_info', 'warnings'),
#    ('output_info', 'statistics'),
  ])

# Always use the following value for the Content-type header.
headers = { "Content-type": "application/x-www-form-urlencoded" }
conn = httplib.HTTPConnection('closure-compiler.appspot.com')
errors = False

for file in sys.argv[1:]:
  f = open(file)
  js = urllib.urlencode([('js_code', f.read())]);
  f.close()
  
  conn.request('POST', '/compile', params+'&'+js, headers)
  data = json.load(conn.getresponse())

  if 'errors' in data:
    print '!! Errors found in ' + file
    print data['errors']
    errors = True
  
  if 'warnings' in data:
    print '!! Warnings in ' + file
    print data['warnings']
  
  if not errors and 'compiledCode' in data:
    filename = os.path.splitext(file)[0] + '.min.js'
    outfile = open(filename,'w')
    outfile.write(data['compiledCode'])
    outfile.close()
  elif not errors:
    print 'No errors found, but compiled code is missing for ' + file
    errors = True


conn.close
sys.exit(1 if errors else 0)
