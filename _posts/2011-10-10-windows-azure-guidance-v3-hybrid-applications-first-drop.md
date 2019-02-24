---
layout: post
title: "Windows Azure Guidance V3 - Hybrid Applications First Drop"
microblog: false
audio:
date: 2011-10-10 02:55 -0700
guid: http://scottdensmore.micro.blog/2011/10/10/windows-azure-guidance-v3-hybrid-applications-first-drop.html
---

We have been working on a new guide that is focusing on Hybrid Applications with Windows Azure. The focus is connecting on premise and off premise applications. The scenario focuses on a fictitious company "Trey Research" that supplies custom parts that then is fulfilled by offsite vendors. We show how to connect the application running in the cloud back to the corporate on premise app and

This first drop focuses on the conversation with the shipping providers. It uses the Service Bus V2 (App Fabric) shipped at Build. The web site runs and Windows Azure and allows you to create orders and then has a simple WinForms application that polls the queue.

To run the app: start the Windows Azure Cloud project, then right click the WinForms application and Debug Start New Instance.

This our first drop and we have quite a bit to go. Your feedback can help us shape the future.

Go get the drop [here](http://wag.codeplex.com/) and leave your feedback!