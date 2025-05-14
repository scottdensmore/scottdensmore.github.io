---
layout: post
title: "Cocoa to WSDL Web Service or \"Hi PC.. it is me Mac\""
author: "Scott Densmore"
date: 2008-09-20 01:30 -0700
---
A while back I read [Kevin Hoffman's blog](http://dotnetaddict.dotnetdevelopersjournal.com/read/poster/87984.htm) [attempting to connect to a WSDL Web Service](http://dotnetaddict.dotnetdevelopersjournal.com/consuming_a_wsdl_web_service_from_cocoa__failed_attempt_1.htm) and it didn't work out so well for him. I don't know if he got any further, yet I decided that I wanted to give it a go. I decided I wanted build an application so I needed a theme. I decided I would build a Reservation system. This would allow me to build the Web Services .NET / WCF and a client in Cocoa (I say a client because I am going to try and also build one with MVC / Dynamic Data).

My first step was to figure out how to get the Mac to see the service and talk to it. I fired up [VMWare Fusion](http://www.vmware.com/products/fusion/) (running 2.0) and built a simple WCF service. This web service just echoed back the string that was passed in as a message. I hosted the service in IIS 6 on Win2K3 Standard. Windows side done now over to the Mac.

What I really wanted was a simple client that I could test if could connect and call the service (similar to the the Wcf Test Client). After a little google whispering I found a really cool tool called [SoapClient](http://www.ditchnet.org/soapclient/) that did just this. I found the IP address of my VM (I am using NAT) and sent a request via SOAP Client. Uh-oh... no dice what I got back was not what I expected. I got nothing.

I was a little stumped until I remembered that WCF broke out it's WSDL and XSD and assembled it using imports. Apparently, this is not handled by the [WebServiceCore framework](http://developer.apple.com/documentation/Networking/Conceptual/UsingWebservices/2_conceptual_folder/chapter_2_section_2.html#//apple_ref/doc/uid/TP30000985-CH205-TPXREF101). I needed a way to solve this problem. After a bit of spelunking I decided I needed a [IWsdlExportExtension](http://msdn.microsoft.com/en-us/library/system.servicemodel.description.iwsdlexportextension.aspx). I found a cool [article](http://blogs.thinktecture.com/cweyer/archive/2007/05/10/414840.aspx) from [Christian Weyer](http://blogs.thinktecture.com/cweyer/default.aspx) on how to solve some of this problem. This will import the XSD schemas into the WSDL (I am still working on getting the external WSDLs imported). Instead of using the Service Factory approach I decided to create an [IServiceBehavior](http://msdn.microsoft.com/en-us/library/system.servicemodel.description.iservicebehavior.aspx) and [BehaviorExtensionElement](http://msdn.microsoft.com/en-us/library/system.servicemodel.configuration.behaviorextensionelement.aspx) so that I can control this from configuration.

What's Next?

A list of stories to start working through to build the reservation system. I want to build out some stories so I can have some direction on what I want to build. I also want to try and work in unit testing my Mac Client code. Also trying to figure out where I want to store my source.

Download the code for the WCF service so far:[Download Reservation.zip (1622.9K)](/assets/files/Reservation.zip)
