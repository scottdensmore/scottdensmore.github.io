---
layout: post
title: "Simple Capped Exponential Back-Off for Queues"
microblog: false
audo:
date: 2012-04-28 02:34 -0700
guid: http://scottdensmore.micro.blog/2012/04/28/simple-capped-exponential-back-off-for-queues.html
---

Really cool post on Windows Azure Queues. This is something that would be easy to replace in our [guidance on Windows Azure](http://msdn.microsoft.com/en-us/library/ff898430.aspx).

> [Simple Capped Exponential Back-Off for Queues](http://www.wadewegner.com/2012/04/simple-capped-exponential-back-off-for-queues/): "
> Recently [Steve Marx](http://blog.smarx.com/) and I spent a few hours working on a best practices document for Windows Azure. As expected, this was a fun and educational experience – plenty of goofing around, but also some really good discussion on things to think about when building applications for Windows Azure. One of the items we discussed is a better approach for sleeping inside the Worker Role when pulling from queues. Rather than defaulting to a retry every 10 seconds we decided that the best approach is to exponentially back-off on your queue reads while capping it with an upper bound. "

(Via [Wade Wegner](http://www.wadewegner.com).)