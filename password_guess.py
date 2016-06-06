#!/usr/bin/env python
import time

myfile = "pass"
my_pass = ""
start_time = time.time()
with open(myfile, 'r') as infile:
    for line in infile:
        line = line.rstrip()
        if (line == ''):
            continue
        my_pass = line
A = 65
Z = 91
a = 97
z = 123

concatenated = range(A,Z) + range(a,z)

for i1 in map(chr, concatenated):
    for i2 in map(chr, concatenated):
        for i3 in map(chr, concatenated):
            for i4 in map(chr, concatenated):
                word = i1 + i2 + i3 + i4
#                print "Guessing word " + word
                if (word == my_pass):
                    print "password is " + word
                    print("--- %s seconds ---" % (time.time() - start_time))
                    exit(0)
print "didn't find the password"

