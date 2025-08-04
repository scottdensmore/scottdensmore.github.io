---
layout: post
title: Iron Foundry V2
author: Scott Densmore
date: 2014-05-18 02:35 -0700
tags:
- dotnet
- azure
- windows
- career
---

For the last several months I have been working on an extension with Cloud Foundry V2 that allows users to deploy Windows / .NET applications: Iron Foundry. 

Most of the work done here is to put in a DEA and Warden (and a couple of things) that runs on Windows.  We forked the ruby DEA and built a .NET service to emulate the Warden.

The Warden was interesting to work on. We incorporated the use of [Job Objects](http://msdn.microsoft.com/en-us/library/windows/desktop/ms684161(v=vs.85).aspx) to limit CPU and memory to the process we host.  We either host your executable or host your web app in a host that uses HostableWebCore. (Right now we support .NET apps.) 

We really want to get feedback from developers. So [sign up](http://app.ironfoundry.org/signup) to get an account and start deploying apps.

To learn more go read the [intro blog post](http://www.ironfoundry.org/2014/05/07/ironfoundry-v2-launch/).