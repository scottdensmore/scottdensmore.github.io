---
layout: post
title: Finding Loaded Frameworks in macOS
author: Scott Densmore
date: 2017-11-25 13:38:59 -0800
tags:
- azure
- windows
- ios
- career
---
I have been sitting on this for a while. After starting back at Microsoft, I work on HockeyApp which includes the HockeyApp macOS application. The app had a bug that would always ask to give access to the users Address Book even though the app didn't ever use it. I sat with one of the Apple Engineers while at WWDC and he taught be a trick to see what was being loaded in the bundle. We put the following code in main:

```objectivec
[[NSNotificationCenter defaultCenter] addObserverForName:NSBundleDidLoadNotification object:nil queue:nil usingBlock:^(NSNotification * _Nonnull note) {
        NSLog(@"note.object:%@", [note object]);
    }];
```

This should us that the contacts framework was being loaded by the logging framework we were using. We updated the logging from the older version and all is well.
