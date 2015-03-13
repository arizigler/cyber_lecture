#!/usr/bin/env python

import smtplib

from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.utils import formataddr
from email.header import Header

from optparse import OptionParser
parser = OptionParser()
parser.add_option("-a", "--author", dest="author",
                                    help="The sender name as will be in the header")
parser.add_option("-f", "--from",
                                    dest="from_address", default='system@facebook.com',
                                    help="from address")
parser.add_option("-t", "--to",
                                    dest="to_address", default='arizigler@gmail.com',
                                    help="to adress")
parser.add_option("-s", "--subject",
                                    dest="subject", default='',
                                    help="message's subject")
parser.add_option("-m", "--message",
                                    dest="message", default='',
                                    help="message itself (html formatted)")

(options, args) = parser.parse_args()
# me == my email address
# you == recipient's email address

author = formataddr((str(Header(unicode(options.author),'utf-8')),options.from_address))

print "Sending..."

# Create message container - the correct MIME type is multipart/alternative.
msg = MIMEMultipart('alternative')
msg['Subject'] = options.subject
msg['From'] = author
msg['To'] = options.to_address

# Create the body of the message (a plain-text and an HTML version).
text = "none"
html = """\
    <html>
<head></head>
<body>
%s.
</p>
</body>
</html>
""" % options.message

# Record the MIME types of both parts - text/plain and text/html.
part1 = MIMEText(text, 'plain')
part2 = MIMEText(html, 'html')

# Attach parts into message container.
# According to RFC 2046, the last part of a multipart message, in this case
# the HTML message, is best and preferred.
msg.attach(part1)
msg.attach(part2)

# Send the message via local SMTP server.
s = smtplib.SMTP('smtpcorp.com', port=2525)
# sendmail function takes 3 arguments: sender's address, recipient's address
# and message to send - here it is sent as one string.
s.login('ariz','njacho~123')
s.sendmail(options.from_address, [options.to_address], msg.as_string())
print "Done!"
s.quit()
