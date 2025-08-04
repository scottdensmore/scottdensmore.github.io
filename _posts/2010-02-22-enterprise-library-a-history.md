---
layout: post
title: 'Enterprise Library: A History'
author: Scott Densmore
date: 2010-02-22 01:54 -0700
tags:
- conference
- windows
- azure
- visual-studio
- architecture
- agile
- opinion
- ios
- career
- best-practices
- dotnet
---

With the release of [Enterprise Library 5.0 beta 1](http://www.codeplex.com/entlib) (including [Unity 2.0](http://unity.codeplex.com/wikipage?title=Unity2Beta1ChangeLog&referringTitle=Unity2%20Beta1)) I thought I would give a (somewhat) brief history of the project. When we released version 1.0, I don't think any of us ever thought there would be a 5.

Version 1- January 2005
-----------------------

This is where it all started. Tom Hollander and I spent the better part of a month talking with [Avanade](http://www.avanade.com/) about ACA.NET in January of 2004. Patterns and Practices had licensed ACA.NET and we needed to figure out what we wanted to ship as Enterprise Library V1. After much debate we decided we would change, refactor, and or rewrite much of what was there. This decision was not taken lightly. We felt that shipping this as source, trying to define the right guidance, and adapting some of the best practices at the time required this change. We decided we would include, Data Access, Exception Handling, Logging, Security, Caching, Cryptography and Configuration (although you could argue that Configuration was just a need to glue all the blocks together). Each of these would include a design time experience that would make configuration the blocks easier.

One of the major changes we wanted to make was the separation of design time and runtime. One of the reasons we wanted to do this is because we had two scenarios we wanted to meet: one was a Visual Studio Integrated experience and the second was tan ability for customers to only install what they needed / wanted. The Visual Studio integration was driven around some work that the group was doing to try and integration our deliverables into Visual Studio. Later this would be known as gat / gax. This separation would also make it easier to drop things if necessary which is exactly what we did with the Visual Studio integration.

Another thing we did with this project that was different than before was doing Agile Development in a team room. We took a conference room offline and moved everyone into it. Test, Dev, doc, PM and architect shared a room built for 6 with about 10 people. It was amazing and we nick named it the Delta Lounge. Little did we know it at the time, but this would lead us to get a whole new space built for patterns and practices by Microsoft. We spent the next 10 months in this room working through all the changes and scenarios for the project.

Not everything was easy. We had lots of good debates on how we would accomplish this delivery. We had challenges of building a CI server, getting test integrated into the new development style and the challenge of listening / taking the right feedback. All that and trying to run a project with a new process, I am absolutely amazed that we did it.

None of this could have happened without the help of some great people. To name a few: Brian Button, Tom Hollander, Jim Newkirk, Peter Provost, EdJez and the great folks at Avanade. I am sure there are more that I have missed. In the end I believe we shipped something we were all happy with at the time.

Version 1.1 - June 2005
-----------------------

A couple of months after we celebrated the release of 1.0 we found a few issues that we didn't find in testing. This release was basically Brian Button and myself. No real game changers, just a few fixes, testing and a release.

Version 2.0 - January 2006
--------------------------

We knew .NET 2.0 was coming although we never knew how popular Enterprise Library would be so in hind sight we should have paid more attention. When we shipped 1.x we were using .NET 1.x version of configuration and .NET 2.0 change how configuration was done. Also we wanted to update the configuration code that we had that was very DI like and move it to a more DI centric framework. At the time this was Object Builder. Object Builder was a framework for building objects that came from Brad Wilson and Peter Provost working on CAB. We wanted to also put this in so we could have a place to wire up instrumentation in our blocks. Instrumentation was one of those areas that we did not get to work on as much as we wanted to in version 1.x. All these changes meant we were going to break old clients. This was a big learning for us: don't forget to see what is coming. Backwards compatibility may be the work of the devil, yet people really seem to want it.

This version we had Fernando Simonazzi join the team (he is still around for version 5). We started to make these changes. At this point we needed a new team room so we decided to do something crazy. We would merge two teams into one room. CAB and Enterprise Library would try and live together. Let me go ahead and say: not the best idea we ever had. Yet, I will say that I have never worked anywhere else that would let us try crazy things like this. Thanks Microsoft!

As we were working through version 2.0, we mostly focused on the plumbing and a new few features. Most of the plumbing affected the tool so we had a lot of work to do. Yes we realized this was a smell and we were doing what we could to fix it. Also, we got a visit from one the PMs on the .NET framework team about customers who were not moving to .NET 2.0 before we fixed a bug with Configuration that we introduced based on the 1.0 configuration schema. The customer was Disney. I am absolutely aware of the irony after spending 1.5 years at Disney.

After getting the fix out and releasing 2.0 I decided it was time to move on from patterns & practices for a while. We accomplished a lot in 6 months and we were happy with all that we had accomplished from the 1.0 release one year earlier.

Version 3.0 - April 2007
------------------------

I was not on this version, yet there are a few things in here that got done that tie back to some of our vision since 1.0. This release saw [Chris Tavaras](http://www.tavaresstudios.com/Blog/) take over as development lead. The big wins here where 2 new blocks and the Visual Studio integration of the tool. The 2 new blocks where: Validation and Policy Injection. The Policy Injection was really cool because it introduced AOP style interception for the blocks. No more writing all that static factory code every where. At this point the teams were in the new space for patterns and practices. It was a far cry from the cramped days in the Delta Lounge.

Version 3.1 - May 2007
----------------------

A small update to version 3.

Version 4.0 - May 2008
----------------------

This is my return to patterns & practices to make some updates to Enterprise Library. I had done a talk at the patterns & practices Summit in 2007 about changes to make to Enterprise Library. The biggest change was to take a lot of the work that was in the infrastructure of Enterprise Library and make it available as a DI container. Then Enterprise Library could be changed to use this container or any other container in the market. The goal would be to have something like this: `EnterpriseLibrary.Resolve<Database>();`

The first thing we had to do was come up with a name for this DI container. I know that sounds a little crazy, yet without a name, it is hard to get people talking about it and sharing that common vocabulary as a team. Grigori and I were sitting in a office trying to come up with a name. After many names that I will not even mention, I looked around the room, saw a box for Uniden Phones and said "Unity!".

[Grigori](http://blogs.msdn.com/agile/default.aspx) was our Product Manager (now the Program Manger and the Enterprise Library Guardian) at the time. He has been promoting writing testable code since he got to patterns & practices. He was a big driver behind this release. He is still driving the project forward.

[Chris](http://www.tavaresstudios.com/Blog/) was/is the brain behind Unity. He's been the architect and dev lead of the project.

With the name out of the way we could focus on getting things done. We had a lot of changes to make and Unity to build. We had another great team and spent most of our time fixing things to support the theme of DI. This release was all about enabling this not necessarily getting it all done.  

It was amazing what we got done in 6 months!

Version 4.1 - October 2008
--------------------------

this was the beginning of the move of pieces of interception infrastructure from one block (PIAB) to the core of EntLib (the work we continue in v5 and plan to finish in v6). This is when the Unity interception mechanism was introduced and 2 two new interceptors were added (significantly better performing than the old RemoteProxy interceptor from PIAB). This release also added support for generics and arrays in Unity as well as integration with VS2008 SP1. The original 4.0 release intentionally shipped against VS2008 Beta (as we shipped earlier) and 4.1 release was ought to happen regardless of bugs.

Version 5.0 beta 1- February 2010
---------------------------------

This is the end result of the work we did in Version 4.0. This is probably the biggest upgrade since version 2.0. All the work here is the culmination of all the things we wanted to do since the end of version 1. The team even did some great work on the tool and making it easier to develop against. I think this is going to be the best release since 1.0. Also, the count of dlls is down from 96 to 34. Truly amazing.

One of the major things that I love about the release is the revamp of the tool. This was a major undertaking. [Bob](http://blogs.msdn.com/bobbrum/) and [Olaf](http://bloggingabout.net/blogs/olaf/) should be commended for the effort.

Another major theme carried over from version 4 that was championed by Grigori was [ease and simplicity](http://blogs.msdn.com/agile/archive/2009/05/14/taking-user-experience-seriously.aspx). More awesome!

All of this couldn't be possible without our testers: Rohit as the test lead and Mani who's been on EntLib team since very early release 1.0 and only skipped v4), to Erik for automating our security testing, and to Masashi for automating our UI testing. And praise for the doc team, Alex and Dennis for helping improve our learnability story. It's not easy to reconcile 1200 pages of the docs from so many releases.

Congratulations to the entire [Enterprise Library team](http://entlib.codeplex.com/wikipage?title=EntLib5Team&referringTitle=EntLib5%20Beta1).

History provides us with perspective. 5 years and 5 versions. Keep providing feedback and help shape the future. This is your Enterprise Library.