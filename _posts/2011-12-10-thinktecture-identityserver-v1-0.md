---
layout: post
title: "Thinktecture IdentityServer v1.0"
author: "Scott Densmore"
date: 2011-12-10 02:56 -0700
---

If you are interested in Claims Based Identity you have to check this out.  I can't recommend this enough. I am really looking forward to the Azure release!

[Thinktecture IdentityServer v1.0](http://www.leastprivilege.com/ThinktectureIdentityServerV10.aspx): "

Yeah – it is finally done. I just uploaded the v1 bits to [Codeplex](http://identityserver.codeplex.com) and the [documentation](https://identity.thinktecture.com/idsrv/docs/) to our server. Here's the official blurb…

[Thinktecture](http://www.thinktecture.com) IdentityServer is an open source security token service based on Microsoft .NET, ASP.NET MVC, WCF and WIF.

**High level features**

* Multiple protocols support (WS-Trust, WS-Federation, OAuth2, WRAP, JSNotify, HTTP GET)
* Multiple token support (SAML 1.1/2.0, SWT)
* Out of the box integration with ASP.NET membership, roles and profile
* Support for username/password and client certificates authentication
* Support for WS-Federation metadata
* Support for WS-Trust identity delegation
* Extensibility points to customize configuration and user management handling

![Architecture Diagram](/assets/img/idsrv_arch.png)

**Disclaimer**

I did thorough testing of all features of IdentityServer - but keep in mind that this is an open source project and I am the only architect, developer and tester on the team.  
IdentityServer also lacks many of the enterprise-level features like configuration services, proxy support, operations integration etc.  
I only recommend using IdentityServer if you also understand how it works (to be able to support it). I am offering consulting to help you with customization and lock down - contact me.

[Download](http://identityserver.codeplex.com). [Documentation](https://identity.thinktecture.com/idsrv/docs/).

Up next is v1 of the Azure version. Have fun!

(Via [LeastPrivilege](http://www.leastprivilege.com/).)