---
layout: post
title: 'Build Numbers, Tags, Releases: Oh My!'
author: Scott Densmore
date: 2013-01-02 02:33 -0700
tags:
- git
- ios
- career
---

Working on a Mac / iOS projects, I have been trying to come up with an easy way to bump versions when it goes out the door for testing or production. Mostly I have been working it out manually, yet that is now fun after the dozenth time. I  started looking around for something that would fit my [workflow](http://nvie.com/posts/a-successful-git-branching-model/). I found a couple of posts that help me out.

* [NSScreencast Versioning](http://nsscreencast.com/episodes/55-versioning)
* [Semantic Versioning Specification](http://semver.org)
* [AdHoc builds](http://nsscreencast.com/episodes/18-adhoc-provisioning)

I have also embraced schemes.  Schemes are powerful and allow me to to things for particular builds. In the example you will see how I created a Adhoc scheme (a scheme I use for beta testing etc) and bump the build before each archive. I update the marketing version with agvtool when I start working on a new version.

After refining this for a while I have changed my workflow now to this:

1. Update Marketing version (1.0.0) when I start working on new version.
2. Create a Adhoc scheme that bumps the build number because you will only need to do this when you distribute on TestFlight (or something like that) 
3. Eventually one of these builds will be the release that you will tag in the branch that is for releases so you can use tag.sh

Pretty easy now. 

Download the code from the GitHub project [here](https://github.com/scottdensmore/BuildNumberTest).

Updated 6/20/2013 with new workflow.

Enjoy!