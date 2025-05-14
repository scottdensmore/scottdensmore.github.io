---
layout: post
title: "Paging with Windows Azure Table Storage"
author: "Scott Densmore"
date: 2010-04-27 02:39 -0700
---

Steve Marx has a great post on [paging over data](http://blog.smarx.com/posts/paging-over-data-in-windows-azure-tables) that uses the Storage Client Library shipped with previous versions of the Windows Azure SDK. You can update this code and make it work with the current SDK. It uses the DataServiceQuery and uses the underlying rest header calls to get the next partition and row key for the next query. In the current SDK, the [CloudTableQuery\<TElement\>](http://msdn.microsoft.com/en-us/library/ee758648.aspx) now handles dealing with continuation tokens. If you execute queries, you will not need to deal with the 1000 entity limitation. You can read more about this from [Neil Mackenzie's post on queries](http://nmackenzie.spaces.live.com/blog/cns!B863FF075995D18A!564.entry).

If you just execute your query you will not deal with the continuation token and just run through your results. This could be bad if you have a large result set (blocking IIS threads etc etc). To handle this, you will use the Async version to execute the query so you can get to the [ResultSegment\<TElement\>](http://msdn.microsoft.com/en-us/library/ee758683.aspx) and the [ResultContinuation](http://msdn.microsoft.com/en-us/library/microsoft.windowsazure.storageclient.resultcontinuation.aspx) depending on your query.

In the [sample](/assets/files/Continuation.zip), we are displaying 3 entities per page. To get to the next or previous page of data we create a stack of tokens to allow you to move forward and back. The sample stores this in session so they can persist between post backs. Since the [ReusltContinuation](http://msdn.microsoft.com/en-us/library/microsoft.windowsazure.storageclient.resultcontinuation.aspx) object is serializable you can store this anywhere to persists between post backs. The stack is just an implementation detail to keep up with where you are in the query. The following is a diagram of what is going on on the page:

[![continuationtoken](/assets/img/continuationtoken.png "continuationtoken")](/assets/img/continuationtoken.png)

This is basically the same as what Steve did in his post but using the tokens and adding back functionality.

[Download the sample](/assets/files/Continuation.zip).

Listened to: The Baying Of The Hounds from the album "Ghost Reveries" by [Opeth](http://www.google.com/search?q=%22Opeth%22)