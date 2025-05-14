---
layout: post
title: "MonoTouch Comparison with Apple Tools"
author: "Scott Densmore"
date: 2009-10-20 01:54 -0700
---

I have been playing around with MonoTouch trying to figure out if I liked the new approach to building Cocoa Touch apps. I decided to take a couple of the samples built using MonoTouch and build them for the Cocoa Touch using Apple's toolset.

### HelloWorld

I decided to start out with the easiest thing first: building HelloWorld based on this [article](http://monotouch.net/Tutorials/MonoDevelop_HelloWorld). I read through the article and built the Apple version first. Open XCode and choose a new Window-based application. This is the closest to the iPhone application from MonoTouch. The first thing I noticed is that I do things opposite of how they are done in MonoTouch. When I am going to create outlets for connecting objects from Interface Builder, I do that in code then go to Interface Builder. This is how "stylish" programmers do things. At least that is what I learned at the [Big Nerd Ranch](http://www.bignerdranch.com/index.shtml). So I opened up the header file and updated it to look like this:

```objective-c
#import <UIKit/UIKit.h>

@interface HelloWorldObjCAppDelegate : NSObject <UIApplicationDelegate> {  
    UIWindow \*window;  
    UIButton \*button;  
    UILabel \*label;  
}

@property (nonatomic, retain) IBOutlet UIWindow \*window;
@property (nonatomic, retain) IBOutlet UIButton \*button;
@property (nonatomic, retain) IBOutlet UILabel \*label;

\- (IBAction)sampleTap:(id)sender;

@end
```

I added two properties for the button and label. I use custom Text Macros for doing this so I don't have to do a lot of typing \[more on this later\]. After this I opened up Interface Builder and setup the interface and made the connections. The connections are the same except they are already part of the UIApplicationDelegate.

![IBMTCActn.png](/assets/img/ibmtcactn.png)

![IBMTCOut.png](/assets/img/ibmtcout.png)

Now for the fun part. Adding in the code for the actions. Unlike Cocoa on Snow Leopard, there is no support for blocks on the iPhone so I don't get similar delegate support. If you want to have it you can get [plblocks](http://code.google.com/p/plblocks/). The code in the implementation file looks like this:

```objective-c
@implementation HelloWorldObjCAppDelegate

@synthesize window;
@synthesize button;
@synthesize label;

\- (IBAction)sampleTap:(id)sender {  
    \[label setText:@"Second button clicked"\];  
}

\- (void)buttonEvent:(id)sender {  
    static int count = 0;  
    \[label setText:\[NSString stringWithFormat:@"I have been tapped %d times.", count++\]\];  
}

\- (void)applicationDidFinishLaunching:(UIApplication \*)application {  
    \[button addTarget:self action:@selector(buttonEvent:) forControlEvents:UIControlEventTouchDown\];  
    // Override point for customization after application launch  
    \[window makeKeyAndVisible\];  
}

\- (void)dealloc {  
    \[window release\];  
    \[button release\];  
    \[label release\];  
    \[super dealloc\];
}
@end
```

The `addTarget:action message` is what happens under the covers when you connect your action and event in Interface Builder. I set the text for the label using NSString stringWithFormat:. This is just like string.Format with `printf` arguments. All in all, not much code except for the release calls and not much difference in the hello world.

[Get code here.](/assets/files/MonoTouchCompare.zip)

### RSS Reader

I moved to a little harder sample. I am using the [RSS Reader tutorial](http://www.alexyork.net/blog/post/UINavigationController-with-MonoTouch-Building-a-simple-RSS-reader-Part-1.aspx). The first thing I needed to do is figure out the layout of the response from the rss. I use [HTTP Client](http://ditchnet.org/httpclient/) to view requests / response. In XCode I created a Navigation based application. I renamed a few files (RootViewController -> NewsArticleViewController) via the Rename r[efactoring support in XCode](http://developer.apple.com/mac/library/documentation/DeveloperTools/Conceptual/XcodeWorkspace/150-Code_Refactoring/refactoring.html#//apple_ref/doc/uid/TP40006920-CH265-SW1) (yes XCode has some refactoring and also takes snapshots of your code before it makes the changes). I also added the News Article model class and a parser for the rss feed. The Cocoa framework doesn't have a built in XML Document, but instead uses SAX style NSXMLParser. I wanted to hide this and also do it in a background thread using an NSOperation. Here is what my project looks like:  
  
![GroupsandFiles.png](/assets/img/groupsandfiles.png)  
  
I will not bore you with the gory details of the code in the parser. I could have used some third party library code to make it easier, yet I decided to stick with what comes in the box. Check out the [touchcode](http://code.google.com/p/touchcode) project if you want something else. The key was to have it parse through the code and build up the models from the rss feed. Another difference is that I reference the DetailsViewController from the NewsArticleViewController. I dragged a UIViewController into the controller and set it's class to DetailsViewController in the identity inspector and NIB name to DetailsViewController in the attributes inspector.  
![ViewController.png](/assets/img/viewcontroller.png)  
I added an outlet in the NewsArticleViewController and hooked this up in Interface Builder. I added the title to the navigation controller and showed it so I could navigate back to the list. The UI needs a little love to spice it up. Given everything, not much more code than MonoTouch.

[Get code here.](/assets/files/MonoTouchCompare.zip)

### The Takeaways

MonoTouch is a great start. It comes down to language differences. If you want to learn more about them Matt Gallagher has an [amazing post](http://cocoawithlove.com/2009/10/objective-c-niche-why-it-survives-in.html) that you should read. It took me a while to get comfortable with Objective-C (a couple of months). The language itself is pretty easy. I really like it because of the dynamic nature. The IDE is lacking in functionality especially a debugger, which makes it hard to switch. I find the use of classes for delegate markers a little odd since they are protocols in Obj-C and more akin to interfaces. I understand the reason for not doing this is because in Obj-C, things can be optional. This is not possible in a strongly typed language like C# (see Matt's post). The Garbage Collection is nice yet I think as a platform, Cocoa Touch will get GC just like Cocoa for OS X. I am more of an XCode person, so I wish they would have invested in working with XCode. All in all, to really understand building Cocoa Touch apps, you will need to understand the underlying framework (Cocoa Touch). The abstraction is interesting to make it work with a static language like C#. I will keep my eye on this to see where it goes. I don't think it is worth the $500 US to switch for me right now.

### Tools

[TextMacros Article](http://www.turkeysheartrhinos.com/?p=8)
[XCode Article](http://cocoawithlove.com/2008/06/hidden-xcode-build-debug-and-template.html)  
[Accessorizer](http://www.kevincallahan.org/software/accessorizer.html) - good code generator / helper / expander

Listened to: Octane Twisted from the album "The Incident" by [Porcupine Tree](http://www.google.com/search?q=%22Porcupine%20Tree%22)