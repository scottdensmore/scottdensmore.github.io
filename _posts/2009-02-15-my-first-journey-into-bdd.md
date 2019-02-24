---
layout: post
title: "My First Journey into BDD"
microblog: false
audio:
date: 2009-02-15 01:54 -0700
guid: http://scottdensmore.micro.blog/2009/02/15/my-first-journey-into-bdd.hml
---

Lately I have been trying to teach people TDD and running into the usual suspects of misconceptions. I decided that maybe it was about time to update my tool belt and try teaching in a new way. I also wanted to try out something new and hopefully improve myself. I decided to give [BDD (Behavior Driven Development)](http://behaviour-driven.org/) a try.

I have been practicing TDD for many years now and I just recently started reading about BDD. When I read [Dan North's intro about BDD,](http://dannorth.net/introducing-bdd) I had a funny feeling I had heard this story before. Back in 2004 while working at Microsoft, I was pairing with [Brian Button](http://www.agileprogrammer.com/oneagilecoder/) when he said something that stuck with me, yet I have not thought about in years: "Instead of Test Fixture per class, why not test per feature.". (I know that is probably not word for word.) All this started to rush back at me so I decided to do a bit more reading. There are quite a few frameworks for working in BDD, yet I thought I would start simple and use what we do at work. (Always find it easier to start with what people know when learning something new).

I think the hardest thing for me to change in my thinking was the naming of my test class. (This is where the flashback to [Brian](http://www.agileprogrammer.com/oneagilecoder/) happened again so I just dove in and gave it a try). I would normally just give my tests the name $ClassUnderTest$Tests. That really doesn't communicate my intent. It really just is a logical grouping. If I use the file as a grouping now, it makes it easier for me to switch. I now call my file $SystemUnderTest$Specs (where System Under Test could be a class). What helped me out tremendously is thinking of my feature / design as a user story. I gained much of this through reading [Scott Bellware's article](http://www.code-magazine.com/article.aspx?quickid=0805061&page=1) that focused around this area.

Lets take a look at the before and after to see the difference:

```csharp
\[TestClass\]
public class GuestServiceTests
{
    \[TestMethod\]
    public void ShouldUpdateGuestAccountWhenRequestingARefund()
    {
        // Arrange
        Mock<IAccountService> accountService = new Mock<IAccountService>();
        GuestService guestService = new GuestService(accountService.Object);
        int guestId = 7;
        decimal amount = 100M;

        // Act
        guestService.RequestRefund(guestId, amount);

        // Assert
        accountService.Verify(x=>x.PostRefund(7, 100M));
    }
}

\[TestClass\]
public class when\_guest\_requests\_a\_refund
{
    GuestService guestService;

    // Arrange
    \[TestInitialize\]
    public void Context()
    {
        Mock<IAccountService> accountService = new Mock<IAccountService>();
        guestService = new GuestService(accountService.Object);
    }

    public void should\_update\_guest\_account\_with\_amount()
    {
        // Arrange
        int guestId = 7;
        decimal amount = 100;
        // Act
        guestService.RequestRefund(guestId, amount);
        // Assert
        accountService.Verify(x=>x.PostRefund(guestId, amount));
    }
}
```

In this example, I am using the [Test Fixture Per Class](http://xunitpatterns.com/Testcase%20Class%20per%20Fixture.html) pattern as the classic approach. \[I must admit that way back in my learnings of TDD I learned that very descriptive names are important.\] The three main portions of your test are still the same: Arrange / Act / Assert, just laid out differently (I labeled them here for the example). The difference is really about how you arrange the tests themselves. This is not the only difference, you also have to think about how this code communicates to the person looking at it. I find this the one thing I really like about this approach. You focus on the concern that you are testing (refunding a guest account). The underscores are a style thing. If you don't like them, don't use them. Some frameworks use this to build reports and I have found that it is easier to read with the underscores.

The one thing I don't like about the way the test looks right now is a little bit of readability. I also feel the act and arrange should not be together: things just don't seem to flow. If you think about it: you also have to replicate arrange portions in each test (like guest identifier and amount) because we don't have a place to set this up. It also is missing some key pieces that Scott explains in his article. Here we change a couple of things around and I think come up with something easier to read (and explain):

```csharp
public class ContextSpecification
{
    \[TestInitialize\]
    public void Initialize()
    {
        Context();
        Because();
    }

    protected virtual void Context() {}
    protected virtual void Because() {}
}

\[TestClass\]
public class when\_guest\_requests\_a\_refund : ContextSpecification
{
    GuestService guestService;
    int guestId;
    decimal amount;

    // Arrange
    protected override void Context()
    {
        Mock<IAccountService> accountService = new Mock<IAccountService>();
        guestService = new GuestService(accountService.Object);
    }

    // Act (Arrange for concern)
    protected override void Because()
    {
        guestId = 7;
        amount = 100M;
        guestService.Request(Refund);
    }

    // Assert
    \[TestMethod\]
    public void should\_update\_guest\_account\_with\_amount()
    {
        accountService.Verify(x=>x.PostRefund(guestId, amount));
    }
}
```

All this for me is just the first part of my journey. Lately I have been moving to writing more of my tests in this style and I am finding I really like it. I don't recommend you go and change all your unit tests to this style: it is not worth it. Just try it out. Get a feel for it. Don't get caught up in different styles at first. Learn them, internalize them and do what works for you.

BDD Frameworks

* [MSpec](http://codebetter.com/blogs/aaron.jensen/archive/2008/05/08/introducing-machine-specifications-or-mspec-for-short.aspx)
* [SpecUnit](http://code.google.com/p/specunit-net/)
* [NSpec](http://nspec.tigris.org/source/browse/nspec/)
* [xUnit.BDDExtensions](http://www.bjoernrochel.de/2008/10/04/introducing-xunitbddextensions/)