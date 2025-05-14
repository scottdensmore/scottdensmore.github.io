---
layout: post
title: "Protecting Your Config in Windows Azure"
microblog: false
audio:
date: 2010-11-06 02:39 -0700
guid: http://scottdensmore.micro.blog/2010/11/06/protecting-your-config-in-windows-azure.html
---

Ever since we have done Windows Azure Guidance, we have not had a story for securing the web config in the cloud.  If you want to be able to be able to change your role configuration without uploading your package again, the best place to store the information is in your service settings (service configuration file). These settings can then be changed from your portal or in your settings before you upload your package.  These are not exposed like the web config. If you need to store information in your web config and want to secure it, the way to do this is detailed [here](http://code.msdn.microsoft.com/pkcs12protectedconfg).  It is a provider for encrypting your information configuration sections.