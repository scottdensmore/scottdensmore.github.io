---
layout: post
title: "Asynchronous calls in C++ Windows Store Unit Tests"
microblog: false
audo:
date: 2013-01-01 02:32 -0700
guid: http://scottdensmore.micro.blog/2013/01/01/revisiting-an-agile-approach-to-building-a-mac-application.html
---

**Note**

I had previously published this and with all the new things I have learned, I thought it time to update and change since I am doing things different now.  I admit, this seems to be a bit easier.

I have written quite a bit about using agile techniques (unit testing, continuous integration, etc) and in this post, I am going to put it all together. We will go through how to setup the project, build the application test first, how to integrate code coverage and source control flow to build features.

[Download the code.](https://github.com/scottdensmore/ContactManager)

**The Application**

The application itself is not all that important. I picked something that would be easy to build and demonstrate the concepts. The application is a contact application. I based it around the post of [Building a Modern Cocoa App](http://www.mcubedsw.com/blog/index.php/site/comments/building_a_modern_cocoa_app/) by [Martin Pilkington](http://www.mcubedsw.com/about).  I think the post does a great job of explaining an approach to building modern Cocoa Applications that I have taken when building apps for the Mac. The contact manager application is a Cocoa Application that uses Core Data as it's backing store with Unit Tests which gives us two projects, ContactManager and ContactManagerTests.

**Setup**

After creating the project in Xcode 4, I needed to make a few changes to the project. The first thing I wanted to do is change to use the LVVM compiler and the lldb debugger. I also set the build to always run the static analyzer. The other thing I wanted to do is get code coverage. I also added some tools to the project. Since I am going to be doing test first, I added the OCMock framework and because I wanted some output for the code coverage, I added the lcov toolset from Linux (geninfo, genhtml).

For OCMock, I added the framework to the ContactManagerTests project. The problem I ran into was that the framework would not load into the test bundle because it could not be found. This is because of the location of the file in the Frameworks directory.  [I had to change the Runpath Search Path to @loader\_path/../Framework.](http://www.mulle-kybernetik.com/forum/viewtopic.php?f=4&t=271&sid=baddd9135cb7e12facc56cdc66e3ba9f)

For the Coverage configuration in the ContactManager project, I did the following:

*   set Generate Test Coverage Files to Yes
*   set Instrument Program Flow to Yes

All of this setup can be done once and create a custom project if you create a lot of these types of projects.

**Test First**

Now that we have everything setup and ready to go, we need to figure out how to break this code into it's parts. The application stores contacts in Core Data and uses binding KVO / KVC to build out the UI. The first story I decided to take on saving a contact (since that is one of the major features of the app). I am going to describe this story (and not all of them) and you can look at the rest of the code to see how things

**Save a Contact**

I decided that I wanted to store first name, last name, email and phone number. Nothing amazing here. I do this with the Core Data modeler and create a Contact object class from the model I created. After this I decide to create a ContactDataController that would manage contact data. I decided to also add a CoreDataController that would manage the Core Data infrastructure (much like that from the Modern App by Martin). One thing I didn't want is a Singleton. Singletons are really hard to test and I avoid them as much as possible. For this I decided to inject the CoreDataController into the ContactDataController and make that the default initializer.

Once I had this infrastructure and tests in place I created the UI and the list and detail view controllers for the UI, I needed to figure out how to add the tests to ensure that things are working properly. Chris Hanson has had a great [set of posts](http://eschatologist.net/blog/?tag=user-interface-testing) on doing just this. The main idea is that you will trust that Cocoa will do the right thing (KVO / KVC) but you want to verify that all the things are setup to make it work. I did just this by creating some simple methods that verify that Cocoa hooked up my Views and Controllers and that I didn't forget anything. If you look at the tests, it is pretty easy to see how this works.

That is the pattern that I followed for all the code in this application. You can review the rest of the code to see how it all fits together.

**Code Coverage**

After the setup, when you run your tests, you get the code that is covered. The key here is how you want to view it. Once you have your code instrumented, you can use a tool like [CoverStory](http://code.google.com/p/coverstory/) to view it, yet I wanted something more automated. I found a [great article](http://qualitycoding.org/xcode-code-coverage/#comment-1817) that fits in with my workflow. This allows me to use lcov to generate a file that I can see before I integrate into CI (Continuous Integration) server. 

Since I do not install the command line tools I did change the envcov.sh file to add the bin file to the path that includes gcov.  

export PATH=$PATH:/Applications/Xcode.app/Contents/Developer/usr/bin

You will have to download the [lcov tool](http://downloads.sourceforge.net/ltp/lcov-1.10.tar.gz) for the project since the licence is iffy. 

**Source Control Flow**

This one was pretty easy as well. I followed the process from [here](http://nvie.com/posts/a-successful-git-branching-model/). They call this git flow and it is pretty well laid out. I used this for all my projects now. The key is that you have to use branches. You do everything off topic branches and master is pretty much your release. I find that doing this helps me focus on working on one thing at a time. If I am writing a large commit message that includes to much work... I feel I am breaking some sort of magical law :). 

I use [home-brew](http://mxcl.github.com/homebrew/) to install everything. You can install git and gitflow using this.

**Wrap Up**

The [code](https://github.com/scottdensmore/ContactManager) is the best place to learn. I hope you find a few nuggets in here that you can use on your projects. It has taken me a while to find my groove yet I am really happy with this now. And I am always looking to improve.

If you want to know more about Unit Testing I would go check out [Unit Testing with Xcode](http://ideveloper.tv/store/details?product_code=10007) or [Test-Driven iOS Development](http://www.amazon.com/Test-Driven-iOS-Development-Developers-Library/dp/0321774183/ref=sr_1_1?ie=UTF8&qid=1357072434&sr=8-1&keywords=unit+testing+ios).

Enjoy!