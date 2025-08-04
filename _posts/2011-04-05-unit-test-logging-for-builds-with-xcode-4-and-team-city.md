---
layout: post
title: Unit Test Logging for Builds with Xcode 4 and Team City
author: Scott Densmore
date: 2011-04-05 02:45 -0700
tags:
- git
- visual-studio
- agile
- ios
- testing
- career
---

One of the things I wanted to do after getting comfortable with the iOS/Mac platform(s) was trying to take my "agile" ways to the platforms (for this post specifically testing). I started learning all this in the Xcode 3 days. I really think with the release of Xcode 4, things are getting much better. WIth workspaces, schemes and better unit testing integration, I believe Xcode 4 is making my life as a developer easier on the platform.

All the code for this project can be found on github [here](https://github.com/scottdensmore/OCUnitLogger).

**Unit Testing**

Unit testing is by far the lowest hanging fruit. I spent a good bit of time learning the shipping tools for Xcode (OCUnit). I also spent some time looking at the unit testing tools like [GHUnit](https://github.com/gabriel/gh-unit) and [Google Toolbox for Mac (GTM)](http://code.google.com/p/google-toolbox-for-mac/), yet I am pretty pragmatic and found that for the most part, OCUnit did what I needed.  The only other tool that I use for testing is [OCMock](http://www.mulle-kybernetik.com/software/OCMock/). I know a lot of people also use [OCHamcrest](http://code.google.com/p/hamcrest/) for extending the assertion macros, I just have not found I use it myself.

I know a lot of people are using specifications these days to do more user level testing. There are a few projects out there that you might find interesting:

* [UISpec](http://code.google.com/p/uispec/)**
* [iCuke](https://github.com/unboxed/icuke)**
* Instruments Automation Testing (another blog post on this later)**

**Continuous Integration**

This is where the rubber meets the road. Getting your software working on your machine is one thing (and sometimes a hard thing), yet having a repeatable automated build that can build and test your software on another machine is something that makes me feel all warm and fuzzy inside. I have been using [JetBrain's TeamCity](http://www.jetbrains.com/teamcity/) for a few years now and wanted to get my project building, archiving, reporting unit tests and possibly code coverage (more about code coverage in another post).

Getting TeamCity up and running is fairly straightforward.

*   Download the latest version of TeamCity
*   Open a Terminal Window
*   Change to the directory where you unzipped TeamCity (/Application/TeamCity)
*   Change to the bin directory
*   Run TeamCity by executing the runAll.sh script (./runAll.sh start)

The hard part was getting the project running with test output, which is what this long winded post is all about.

**Team City Project Setup**

Using a sample project based on the [bowling game unit testing example](http://www.objectmentor.com/resources/articles/xpepisode.htm), here is how the project is setup. This is based on the sample for the OCUnitLogger project. This is a very simple setup and you can make this as complicated (or as easy) as you need it to be.

_Setup a Project_  
I created a project called OCUnitLogger and give it a good description.

_Setup a Build Configuration_  
I created one called Bowling with a description.

![Project Setup](/assets/img/project-setup.png "Project Setup.png")

_Setup the General Settings_  
I left all the defaults on this one.

![General Settings](/assets/img/general-settings.png "General Settings.png")

_Setup the Version Control Settings_  
I left the defaults on most of these

![Version Control Settings](/assets/img/version-control-settings.png "Version Control Settings.png")

_Setup a VCS Root_  
I set this to use git and check out anonymously using the default polling policy.

![VCS Root](/assets/img/vcs-root.png "VCS Root.png")

_Setup a Build Step_  
This build step is probably the most important part. Building the project is quite easy. You setup the build to build from the command line using xcodebuild. (You can see usage for xcodebuild using xcodebuild -usage.) I have setup this project to just build all targets for this project. Also, I setup the reporting for my tests as JUnit and where it can find the xml file (more on this later).

![Build Step](/assets/img/build-step.png "Build Step.png")

_Setup a Build Trigger_  
We want the build to trigger every time a checkin occurs so we set that up.

![Build Trigger](/assets/img/build-trigger.png "Build Trigger.png")

**The Logger**

OCUnit works using the NSNotificationCenter. By creating a new object to listen for the events, we can create an xml document that mimics JUnit output.

```objective-c
NSNotificationCenter *center = [NSNotificationCenter defaultCenter];
[center addObserver:self selector:@selector(testSuiteStarted:) name:SenTestSuiteDidStartNotification object:nil];
[center addObserver:self selector:@selector(testSuiteStopped:) name:SenTestSuiteDidStopNotification object:nil];
[center addObserver:self selector:@selector(testCaseStarted:) name:SenTestCaseDidStartNotification object:nil];
[center addObserver:self selector:@selector(testCaseStopped:) name:SenTestCaseDidStopNotification object:nil];
[center addObserver:self selector:@selector(testCaseFailed:) name:SenTestCaseDidFailNotification object:nil];
```

The new object is called OCUnitToJUnitLogger. I create a static instance and in each notification we generate the required nodes. I am using the Google Data XML node so that this works in both a Mac and iOS project.

```objective-c
static OCUnitToJUnitLogger *instance = nil;

static void __attribute__ ((constructor)) OCUnitToJUnitLoggerStart(void)
{
    instance = [OCUnitToJUnitLogger new];
}

static void __attribute__ ((destructor)) OCUnitToJUnitLoggerStop(void)
{
    [instance writeResultFile];
    [instance release];
}
```

The output goes to a file called ocunit.xml. You can change this in the OCUnitToJUnitLogger.m on line 88.

It is pretty easy to use. Drag the Logger folder into your project for your unit testing bundle and build. You will also need to add the libxml2.2.7.3 (or the latest) library to your link phase and then add /usr/include/libxml2 to the header search path.

![Libxml2](/assets/img/libxml2.png "libxml2.png")

![Libxml2 Headers](/assets/img/libxml2-headers.png "Libxml2 Headers.png")

**The Bowling Project**

The bowling project is a Coca Framework project created with Unit Tests. It is pretty standard stuff. The only thing I did was add the logger to the project  and this is what I get from TeamCity:
![Tests](/assets/img/tests.png "Tests.png")  

**Conclusion**

This is a pretty simple add to any of your projects. If you are using TeamCity and want to have a good log for your unit tests, you can drop this in and have TeamCity do the rest. If you want to make it better please fork from [here](https://github.com/scottdensmore/OCUnitLogger) and pound away.