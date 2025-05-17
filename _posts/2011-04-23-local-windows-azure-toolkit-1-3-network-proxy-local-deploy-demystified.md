---
layout: post
title: "Local Windows Azure Toolkit >= 1.3 + Network Proxy + Local Deploy = Demystified"
author: "Scott Densmore"
date: 2011-04-23 02:45 -0700
---

I was working on updating the [TailSpin application](http://wag.codeplex.com/) to use Windows Azure Access Control Service (ACS) this week and ran into a small problem.  I am using a WebClient in the controller to call back to ACS to get a list of the Identity Providers. While testing the implementation, I would constantly get a 500 error when running in the local dev fabric. When I would run the web site in IIS it would work just fine. This was driving me insane. I spent a few hours "boogling" (bing + google) around looking for an answer. I could not find anything.

There was a good reason for this. Most of the rest of the world doesn't work behind the Microsoft Corporate Network. The problem comes down to the Identity of the AppPool trying to get through our proxy. I had thought that this was network (meaning Microsoft Network) problem, yet I couldn't remember exactly where I had seen this before. Luckily, I work with some awesome people and Wade Wegner reminded me of the [post](http://www.wadewegner.com/2011/01/programmatically-changing-the-apppool-identity-in-a-windows-azure-web-role/) he did that talks about just this problem. You can either remove the <Sites> elements in your service definition or follow [Wade's post](http://www.wadewegner.com/2011/01/programmatically-changing-the-apppool-identity-in-a-windows-azure-web-role/) and change your startup to change the AppPool Identity for the project.

In the end I just removed the service definition <Sites> element to move me back to the hostable web core. I can then change this back with my build that I already use to adjust config when I deploy. In university, I would write things down so it would help me remember important information, I am hoping this does the same.