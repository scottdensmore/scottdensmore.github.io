---
layout: post
title: "How a Checkbox Saved Paving My Machine"
author: "Scott Densmore"
date: 2010-05-28 02:39 -0700
---

Last week we started working on the code for part 2 of our [Windows Azure Architecture Guidance](http://wag.codeplex.com). Eugenio has a great [writeup of our start to Part 2](http://blogs.msdn.com/b/eugeniop/archive/2010/05/24/windows-azure-architecture-guide-part-2-tailspin-surveys-authn-and-authz.aspx). We started framing out the code for our project. We decided to use MVC 2, .NET 4.0 / VS2010 for this project. Once we started hosting the application in Azure using .NET 4.0 (yes there are tools coming for this), the application stopped working on my machine. At first I thought this was an Azure problem but come to find out it is actually has to do with MVC 2 and IIS. The problem came down to a check box. The problem is actually documented in a [KB](http://support.microsoft.com/?kbid=2023146) and the ReadMe from the .NET 4 install. Both talk about returning a 404 errors, but I found that my situation turned into blank pages. All this came down to a single checkbox in IIS: HTTP Redirection.

![IIS Check Box](/assets/img/iis_checkbox.jpg)

I will not bore you with my 3 days of fighting this. Most people will not run into this if you are not selective about what you install in IIS. I let the WebPI install the Azure Tools for Visual Studio 2008 and when I upgraded to Visual Studio 2010 this was not selected. I could run ASP.NET 4.0 applications, MVC 2 applications targeting 3.5, but not MVC 2 applications targeting .NET 4.0 when running under IIS. I hope this helps someone else that runs into this problem.

Thanks to all the help from [Brad Wilson](http://bradwilson.typepad.com/), [Phil Hack](http://haacked.com/) and the rest of the team for helping me figure this out.

Listened to: The Baying Of The Hounds from the album "Ghost Reveries" by [Opeth](http://www.google.com/search?q=%22Opeth%22)