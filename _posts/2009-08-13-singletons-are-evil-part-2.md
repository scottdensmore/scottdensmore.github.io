---
layout: post
title: Singletons Are Evil Part 2
author: Scott Densmore
date: 2009-08-13 01:54 -0700
tags:
- dotnet
- azure
- windows
- conference
---

A while back I wrote a post about why [singletons are evil](http://blogs.msdn.com/scottdensmore/archive/2004/05/25/140827.aspx). I still agree with that statement, yet after my comment on twitter today, I think I need to show how you can solve this problem differently.  
  
The first problem we need to solve is creating the instance itself. This can become difficult if we have dependencies and we are trying to limit the creation. For example we have class Foo that is our singleton:

```csharp
public static class Foo
{
    static Foo instance;

    public static Foo Current
    {
        if (instance == null)
        {
            instance = new Foo();
        }
        return instance;
    }

    public void SomeMethod()
    {}

    public void SomeOtherMethod(int x, int y)
    {}
}
```

Great! Easy enough and no big issues other than this is quite contrived and nothing in the real world is this easy. So lets go ahead and tackle the next big problem: Multithreading. We fix our class with a double check lock and end up with this:

```csharp
public static class Foo
{
    static volatile Foo instance;
    static object syncObj = new object();

    public static Foo Current
    {
        if (instance == null)
        {
            lock (syncObj)
            {
                if (instance == null)
                    instance = new Foo();
            }
        }
        return instance;
    }

    public void SomeMethod()
    {}

    public void SomeOtherMethod(int x, int y)
    {}
}
```

I am starting to feel a little dirty, but I can handle a little dirt. Now we are good except that Foo now has a dependency: Bar. Why the dependency? Well that is the object that we use to get some of the information we want in our singleton. Ok, lets see what this looks like:

```csharp
public static class Foo
{
    readonly Bar bar;
    static volatile Foo instance;
    static object syncObj = new object();

    private Foo(Bar bar)
    {
        this.bar = bar;
    }

    public static Foo Current
    {
        if (instance == null)
        {
            lock (syncObj)
            {
                if (instance == null)
                    instance = new Foo(new Bar(new Bar()));
            }
        }
        return instance;
    }

    public void SomeMethod()
    {}

    public void SomeOtherMethod(int x, int y)
    {}
}
```

At this point alarm bells should be going off and your brain should be going to [DEFCON 1](http://en.wikipedia.org/wiki/DEFCON). We introduced Bar only to see that it needed a Baz. We have violated SRP and coupled all our classes together. Now imagine writing a test around any class that needed to use Foo. You get one Foo and all its dependencies that need to be cleared between tests. This causes you to write that clear method on your class that really is only needed to get rid of state you were trying to support anyway.

So hopefully by now, we agree that this is evil. Yet, I agree that singletons are something useful in the right scenario. So how can you avoid [Global Thermonuclear War](http://en.wikipedia.org/wiki/WarGames) when using a singleton? Well fire up your trusty IoC container and let it manage it for you. Here is an example in [Unity](http://msdn.microsoft.com/en-us/library/dd203104.aspx).

```csharp
public class Baz{}
public class Bar
{
    readonly Baz baz;

    public Bar(Baz baz)
    {
        this.baz = baz;
    }
}

public class Foo
{
    readonly Bar bar;

    public Foo(Bar bar)
    {
        this.bar = bar;
    }

    public void SomeMethod()
    {}

    public void SomeOtherMethod(int x, int y)
    {}
}
...
IUnityContainer container = new UnityContainer();
container.RegisterType(typeof(Baz), typeof(Baz));
container.RegisterType(typeof(Bar), typeof(Bar));
container.RegisterType(typeof(Foo), typeof(Foo), new ContainerControlledLifetimeManager());
```

Now we have separated the creation of the object and it's life time from the object itself. This way we let the container handle the singletoness of the object and it's creation. You still have to deal with multithreaded access to the dependencies of Foo, but when you decide that is just way to evil and there are better ways to solve this problem, you can change the lifetime management and go on about your business. This also frees you up to easily test this object and perform refactorings (like the ones [Sean](http://www.lostechies.com/blogs/sean_chambers/) is talking about this month).

Did I mention singletons are evil?

[Deliverance](http://www.last.fm/music/Opeth/_/Deliverance) by [Opeth](http://www.last.fm/music/Opeth)