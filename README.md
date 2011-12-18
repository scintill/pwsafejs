pwsafejs
---
Browser-based viewer for Password Safe v3 files (http://passwordsafe.sourceforge.net/)

*NOTE:* This is alpha quality and hasn't been checked much for security yet, nor am I any sort of expert on security.  The password file is sent as-is (that is, an encrypted binary file) from the server to your browser, where it is decrypted by this application using the passphrase you supply.  Nobody should be able to see your passwords by sniffing the network, and your decrypted data (hopefully) won't be cached by the browser/OS, but I don't think I can forensically scrub secrets, and I could be missing something obvious... use at your own risk.

Intro and use
---
This is a Javascript reader for Password Safe V3 files.  To use it, place your Password Safe DB in the directory and name it pass.psafe3.  You can test on your hard drive (with the --allow-file-access-from-files command line argument for Chrome, or something similar for other browsers) or online.

The interface is really clunky right now, with a pretty plain list of your accounts.  Click an account to see the username and password.  I want to make a pretty, more full-featured, and secure UI, but I also just wanted to get this out in case I never get around to that.

Compatibility
---
I've seen this work in recent versions of Google Chrome and Mozilla Firefox on Linux and Windows, the Browser in Android 2.3 on my Nexus One, and Safari in iOS 4.2.1.  The recent addition of the HMAC integrity verification is causing Mobile Safari to timeout the process on a moderately-sized database (possibly related to my iPod being old and slow.) For now this could probably be disabled with little fear of consequence if you need to run it on an old iOS device.

Known issues
---
- Ignores grouping of accounts
- Does not show all fields associated with your accounts -- should be pretty easy to add if you want though
- The decryption process can take almost 10 seconds on big enough databases, at least with the Android and iOS devices I tested with. I should figure out how to work around timeouts, and probably add some sort of progress indicator.
- As mentioned, probably not very secure. Since my use case is logging into an account from a foreign computer I trust at least enough that I'm willing to potentially compromise that particular account, I'm interested in finding a way to not put "all my eggs in one basket." So far I can't think of a clever way to give myself access to arbitrary sets of account info without giving attakers the keys to ALL account info. Putting sensitive accounts into a separate database that you protect more carefully is probably a good idea though.

Credits
---
See COPYING.md

Resources
---
- [Password Safe V3 file format official document](http://passwordsafe.svn.sourceforge.net/viewvc/passwordsafe/trunk/pwsafe/pwsafe/docs/formatV3.txt)
- [File format summary](http://keybox.rubyforge.org/password-safe-db-format.html)
