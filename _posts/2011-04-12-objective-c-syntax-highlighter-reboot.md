---
layout: post
title: "Objective-C Syntax Highlighter Reboot"
author: "Scott Densmore"
date: 2011-04-12 02:45 -0700
---

I really like [Syntax Highlighter](http://alexgorbatchev.com/SyntaxHighlighter/). I like when the code is put in a pre tag and looks like something from the IDE. I had an Objective C highlighter for a previous version of Syntax Highlighter, so I decided to upgrade and post the highlighter to [github](https://github.com/scottdensmore/ObjectiveCSyntaxHighlighter). I am sure I have missed some things here and I hope that others fork and update it as the platform(s) get updated. Here is an example of what it looks like. [Download](https://github.com/scottdensmore/ObjectiveCSyntaxHighlighter) and enjoy!

**Sample**

```objective-c
#import <UIKit/UIKit.h>

@class CalcViewController;

@interface CalcAppDelegate : NSObject <UIApplicationDelegate> {
@private
    UIWindow           \*window;
    CalcViewController \*calcViewController;
    NSString           \*name;
    int                 age;
}

@property (nonatomic, retain) IBOutlet UIWindow  \*window;
@property (nonatomic, retain) CalcViewController \*calcViewController;

@end
```

```objective-c
#import "CalcViewController.h"

@implementation CalcViewController

@synthesize displayField;

- (id)initWithNibName:(NSString \*)nibNameOrNil bundle:(NSBundle \*)nibBundleOrNil {
    if ((self = \[super initWithNibName:nibNameOrNil bundle:nibBundleOrNil\])) {
        calculator = \[Calculator new\];
    }
    return self;
}

- (void) dealloc {
    \[calculator release\];
    \[super dealloc\];
}

- (BOOL) shouldAutorotateToInterfaceOrientation:(UIInterfaceOrientation)interfaceOrientation {
    return (interfaceOrientation == UIInterfaceOrientationPortrait);
}

- (IBAction) press:(id)sender {
    \[calculator input:\[sender titleForState:UIControlStateNormal\]\];
    \[displayField setText:\[calculator displayValue\]\];
}

@end
```