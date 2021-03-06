---
layout: post
title: "Asynchronous calls in C++ Windows Store Unit Tests"
microblog: false
audo:
date: 2012-12-11 02:33 -0700
guid: http://scottdensmore.micro.blog/2012/12/11/asynchronous-calls-in-c-windows-store-unit-tests.html
---

In our Hilo project we wrote TDD with lots of unit tests. The one thing we noticed is there were no good way to run tests that were asynchronous. Given that most everything in Windows 8 store apps need to be async, we wrote some test helpers to do this. Looks like the team took this and made an extension to easily get it.  The only thing that is missing is the UI portion of the helpers.  If you really need that (and you probably will), you can get it from the [Hilo project](http://hilo.codeplex.com).

[Go read about it](http://blogs.msdn.com/b/visualstudioalm/archive/2012/12/10/asynchronous-calls-in-c-windows-store-unit-tests.aspx).

Enjoy!