---
layout: post
title: Creating a SSL Certificate for the Cloud Ready Packages for the iOS Windows
  Azure Toolkit
author: Scott Densmore
date: 2012-01-29 02:20 -0700
tags:
- windows
- azure
- git
- security
- ios
---

With the [iOS Windows Azure Toolkit](https://github.com/microsoft-dpe/wa-toolkit-ios), you can use the ready made Windows Azure Packages that use ACS or Membership to manage users to Windows Azure Storage. These packages require you to have a SSL certificate. More than likely you are running on a Mac.

This is pretty straight forward. You will need to create a certificate and then create a PKCS12 (.pfx) file for it.  You can generate the certificate from terminal using [openssl](http://www.openssl.org/docs/apps/req.html) with the following steps:

* open a terminal window
* enter the command: `openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout iOSWAToolkit.pem -out iOSWAToolkit.pem`  
  * iOSWAToolkit is the name of the file you want and can be anything you like.
  * This will create a certificate that you can use to create the PKCS12 certificate. This command will ask for all the information for your cert that you enter.
* enter the command: `openssl pkcs12 -export -out iOSWAToolkit.pfx -in iOSWAToolkit.pem -name "iOSWAToolkit"`
  * iOSWAToolkit is the name of the file you want and can be anything you like.
  * This will ask you for a password that you need to remember so you can enter it when uploading to Windows Azure.
* enter the command: `openssl x509 -outform der -in iOSWAToolkit.pem -out iOSWAToolkit.cer`
  * This will export a certificate with the public key which is what you will need for the service config file.

You will have two certificates that you will need to get the [Cloud Ready Package](https://github.com/microsoft-dpe/wa-toolkit-cloudreadypackages)(s) deployed.  This is really easy when you use the [Cloud Configuration Utility](https://github.com/microsoft-dpe/wa-toolkit-ios-configutility).