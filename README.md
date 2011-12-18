psafejs
---
Browser-based viewer for Password Safe v3 files (http://passwordsafe.sourceforge.net/)

*NOTE:* This is alpha quality and hasn't been checked much for security yet, nor am I any sort of expert on security.  The password file is sent as-is (that is, an encrypted binary file) from the server to your browser, where it is decrypted by this application using the passphrase you supply.  Nobody should be able to see your passwords by sniffing the network, and your decrypted data (hopefully) won't be cached by the browser/OS, but I don't think I can forensically scrub secrets, and I could be missing something obvious... use at your own risk.

Intro and use
---
This is a Javascript reader for Password Safe V3 files.  To use it, place your Password Safe DB in the directory and name it pass.psafe3.  You can test on your hard drive (with the --allow-file-access-from-files command line argument for Chrome, or something similar for other browsers) or online.

The interface is really clunky right now, with a pretty plain list of your accounts.  Click an account to see the username and password.  I want to make a pretty, more full-featured, and secure UI, but I also just wanted to get this out in case I never get around to that.

Known issues
---
- Ignores grouping of accounts
- Does not show all fields associated with your accounts (although most of the code to obtain this info is there)
- Does not check the integrity hash, which I suppose means your DB could be corrupted or tampered with and you would get no warning other than your data appearing as garbage

Credits
---
See COPYING.md

Resources
---
- [Password Safe V3 file format official document](http://passwordsafe.svn.sourceforge.net/viewvc/passwordsafe/trunk/pwsafe/pwsafe/docs/formatV3.txt)
- [File format summary](http://keybox.rubyforge.org/password-safe-db-format.html)
