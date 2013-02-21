pwsafejs
---
Browser-based viewer for Password Safe v3 files (http://passwordsafe.sourceforge.net/)

*NOTE:* This is beta quality and hasn't been checked much for security, nor am I any sort of expert on security.  It's probably best to consider a _weak_ passphrase as _no_ passphrase, especially since you are publishing your passphrase database online.  Use at your own risk, and please read the security notes below.

Intro and use
---
This is a Javascript reader for Password Safe V3 files.  To use it, place your Password Safe DB in the directory and name it pass.psafe3.  You can test on your hard drive (with the --allow-file-access-from-files command line argument for Chrome, or something similar for other browsers) or online.

You can see a [live demo here](http://scintill.net/pwsafejs) (password is "pass").

The interface is really clunky right now, with a pretty plain list of your accounts.  Click an account to see the username and password.  I want to make a pretty, more full-featured, and secure UI, but I also just wanted to get this out in case I never get around to that.

Compatibility
---
I've tested that it works in Google Chrome and Mozilla Firefox on Linux and Windows, Internet Explorer 8 (Windows 7), the Browser in Android 2.3 on my Nexus One, and Safari in iOS 4.2.1.

It's optimized for web worker-capable browsers but uses several setTimeout() calls when Workers aren't available.  Decryption can take 10-15 seconds on slow platforms such as my Nexus One and old iPod.

Known issues/TODOs
---
- Ignores grouping of accounts
- Does not show all fields associated with your accounts -- should be pretty easy to add if you want though
- Not _super_ secure, read below for more information.
- Build into single self-contained file for easier security audit/checksum/signing?
- On-screen keyboard to defeat keyloggers? This seems kind of silly to me though, because then you are vulnerable to physical eavesdroppers watching you forced to peck out your passphrase at 1 char/sec. Maybe mixing both would help to prevent either type of attacker from getting the full passphrase.

Security notes
---
- The password file is sent as-is (that is, an encrypted binary file) from the server to your browser, where it is decrypted by this application using the passphrase you supply.  Nobody should be able to see your passwords by sniffing the network, and your decrypted data shouldn't be cached by browser's HTTP cache layer.  I don't think I can forensically scrub secrets (JS strings are immutable), so there is a possibility plaintext passwords could be recovered by a memory dump.
- If you are concerned about a proactive attacker, take precautions against someone injecting spy code into the application.  Ideas: use HTTPS and verify that the certificate is what it's supposed to be; download the code locally and inspect it (possibly to see if it matches a known-good hash checksum), then run it locally.
- Keeping separate databases based on credential importance (email vs. banks vs. stupid sites that make you register) and encrypting with separate passphrases might be a good way to hedge against compromise while accessing a low-security/trivial account on a public computer.
- I have my copy behind Apache's built in HTTP Digest authentication with a pretty trivial password, basically just to keep it from being indexed by search engines and/or downloaded for offline cracking.

Credits
---
See libpwsafejs/COPYING.md.

Note on strange revision history
---
I rewrote the repository into two repos so that the PWSafe database logic would be more reusable, trying to preserve history _and_ not waste space (probably a silly idea.)  So, if you want to execute old revisions, you'll have to also check out a contemporaneous revision from the new [libpwsafejs](http://github.com/scintill/libpwsafejs).
