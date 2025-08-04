---
layout: post
title: 'Windows Azure Deployment for your Build Server Part 2 : Deploy Certs'
date: 2010-04-15 02:39 -0700
author: Scott Densmore
tags:
- web
- windows
- azure
- git
- security
- career
---

In [Part 1](ttp://scottdensmore.micro.blog/2010/03/28/azure-deployment-for-your-build-server.html) I discussed how you could use msbuild + PowerShell to deploy your Windows Azure projects. Another thing you might need to deploy is your certificates for SSL etc. I figured that was the next logical step so I modified the scripts to include this. The new deploycert.ps1 file takes you API certificate, the hosted service name and the cert path and password for your certificate. I added a property group to hold the certificate information in the msbuild file.

I also updated the msbuild file to change the azure information. I made a big assumption about how things worked that I didn't comment on last time. The azure information included the storage account information so you could swap out the connection strings. The assumption I made was that the hosted service and storage service names where the same. That was dumb. I updated the property group to better represent what is going on.

The last piece of information on this is that you should make sure that you secure this information. I would suggest you have this build just on the build server and not for devs. We are going to cover this in more detail when the guide come out. Check [our site](http://wag.codeplex.com) often.

[Download Azure Deploy Script](/assets/files/AzureDeploy.zip)

**Update \[02/25/2011\]**

Made some pretty significant changes and moved code to github.  [Check out latest post](http://scottdensmore.typepad.com/blog/2011/02/another-update-for-the-deployment-scripts-for-windows-azure.html).

Listened to: The Consciousness Eaters from the album "Dark Matter Dimensions" by [Scar Symmetry](http://www.google.com/search?q=%22Scar%20Symmetry%22)