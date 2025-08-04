---
layout: post
title: NHibernate 2.0 with SQLite for UnitTesting
author: Scott Densmore
date: 2008-12-03 01:30 -0700
tags:
- database
- testing
---

I spent the last month learning NHibernate and I am definitely a fan. I have been using [SQLite](http://sqlite.phxsoftware.com/) for unit testing similar to [Ayende](http://ayende.com/Blog/Default.aspx) in his [post](http://ayende.com/Blog/archive/2006/10/14/UnitTestingWithNHibernateActiveRecord.aspx). The problem I ran into is that every time I ran my tests the connection was getting reset. A little google whispering and I found the answer in [Justin Etheredge's](http://www.codethinked.com/) [post](http://www.codethinked.com/post/2008/10/19/NHibernate-20-SQLite-and-In-Memory-Databases.aspx). Hopefully this will help me remember as well as others.

Here is what the code should look like:

```csharp
public override ISessionFactory BuildSessionFactory()
{
   var properties = new Dictionary
                        {
                            { "connection.driver_class", "NHibernate.Driver.SQLite20Driver" },
                            { "dialect", "NHibernate.Dialect.SQLiteDialect" },
                            { "connection.connection_string", "Data Source=:memory:;Version=3;New=True;" },
                            { "connection.provider", "NHibernate.Connection.DriverConnectionProvider" },
                            { "connection.release_mode", "on_close" },
                            { "show_sql", "true" }
                        };

    configuration = new Configuration { Properties = properties };
    configuration = configuration.AddAssembly(typeof(Ticket).Assembly);
    return configuration.BuildSessionFactory();
}
```

The winning line is "connection.release\_mode" setting it to "on\_close".

Listened to: Apollo I: The Writing Writer from the album "From Fear Through The Eyes Of Madness" by [Coheed & Cambria](http://www.google.com/search?q=%22Coheed%20&%20Cambria%22)