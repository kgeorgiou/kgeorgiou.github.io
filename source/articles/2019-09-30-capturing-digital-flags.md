---
title: 'Capturing Digital Flags'
published: true
date: 2019-09-30
tags: security ctf infosec competition
---

<iframe width="690" height="315" src="https://www.youtube.com/embed/2xZZJjRWlas" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" style="margin-top: 16px" allowfullscreen></iframe>

### What?

Borrowing from [Google's](https://buildyourfuture.withgoogle.com/events/ctf/#!?detail-content-tabby_activeEl=about) great explanation:

> "Capture The Flag" (CTF) competitions (in the cybersecurity sense) are not related to running outdoors or playing first-person shooters. Instead, they consist of a set of computer security puzzles (or challenges) involving reverse-engineering, memory corruption, cryptography, web technologies, and more. When players solve them they get a "flag," a secret string which can be exchanged for points. The more points a team earns, the higher up it moves in rank.

Taking a stab at solving cybersecurity challenges in CTF competitions can be a rewarding and fun experience. Especially when participating as a team where you can bounce ideas off each other and exchange nuggets of knowledge in the process.

But how do these challenges look like?

The most elementary Web challenge would be a flag (e.g. `flag{_tHat_w0z_eaZy_}`) "hidden" inside the source code of the web page. Another example would be a username & password protected portal that's vulnerable to a simple SQL injection, e.g. entering `' OR 1=1 --` as the username and password.

When it comes to Crypto(graphy), one of the most basic challenges would read: "My friend Caesar sent me this message but I can't decrypt it. Can you help? `synt{l0h_f0yi3q_gur_p1cu3e}`". The description serves as a strong hint on how to solve this by pointing to the [Caesar Cipher](https://en.wikipedia.org/wiki/Caesar_cipher) (ROT13).

Some other challenge categories include: steganography, reverse engineering, forensics, miscellaneous.

Some notes to keep in mind:

- Each challenge is deployed with an intentional vulnerability. The author has intended solutions in mind, but it's very common for unintended solutions to be discovered by contestants. (Ever heard about a box that you're supposed think outside of it? 📦)
- Each challenge is deployed in a sandboxed environment. Even though you may gain access to the filesystem, you probably can't break things out of the scope of the challenge - you're most likely inside a virtual machine.
- Subtle hints usually exist in the challenge's name or description.

### Why?

Most of the benefits of participating in this kind of competitions are intangible, like learning and picking up new skills while having fun. However, sometimes, especially if you do well, there are some tangible benefits up for grabs also! 💰

- Each flag captured comes with a burst of dopamine, especially if many hours were invested. Solving a hard problem that brings lots of points to your team, makes you feel like a million bucks! At least briefly, until you're humbled and driven back to the imposter syndrome zone by the next puzzle 😅.
- It's a chance to get to know people and bond over crafting blind SQL injections late at night or putting your primary school math together to break that weak RSA key.
- The CTF mentality transfers and applies to most tech day jobs. Diving deep to understand the root cause of a pesky bug, understanding an organization's systems inside out, and of course patching potential vulnerabilities along the way.
- Most CTF competitions have prize money for the top 3 teams. If your team is doing well, then recognition by the CTF community will lead to invitations to onsite events and conferences.
- CTFs are a great segue to [bug bounty hunting](https://hackerone.com).

### Where do I begin?

Personally my first interaction with solving CTF style puzzles was [HackThisSite](https://hackthissite.org).

But there are plenty of beginner friendly resources out there:

- [Natas Wargames](https://overthewire.org/wargames/natas/) - Natas teaches the basics of serverside web-security
- [PicoCTF](https://picoctf.com) - CMU Cybersecurity Competition
- [Cryptopals](https://cryptopals.com) - 48 exercises on real-world crypto attacks
- [CyberChef](https://gchq.github.io/CyberChef) - The Cyber Swiss Army Knife

### Personal Note

I play in CTF competitions as a member of the [CYberMouflons](https://cybermouflons.com).

This blog post was fuelled by my excitement when this item arrived in the mail, as a reward for us placing 23rd in Facebook's 2019 CTF.

<img src="/capturing-digital-flags/coinfbctf2019.png" width="690" alt="Facebook CTF 2019 coin" />

(Lemon, in lieu of banana, for scale.)

It may just be a round piece of wood for some, but for us it's the first tangible prize we received from a CTF and we're definitely framing it on the wall!

### Post Scriptum

Tyler Nighswander of [Plaid Parliament of Pwning](https://pwning.net) (Carnegie Mellon's hacking team) explains all of the above in detail in his talk at USENIX Enigma 2016:

<iframe width="690" height="315" src="https://www.youtube.com/embed/-r-B1uOj0W4" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
