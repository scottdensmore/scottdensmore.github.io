---
layout: post
title: New Release for Windows Azure Toolkit for iOS
author: Scott Densmore
date: 2011-11-14 02:55 -0700
tags:
- web
- windows
- azure
- git
- ios
- testing
- career
---

Today I just pushed a new version of the Windows Azure Toolkit for iOS to github (tagged v1.3.0). These changes include new versions for the [Windows Azure Toolkit for iOS](https://github.com/microsoft-dpe/wa-toolkit-ios), the [Configuration Utility](https://github.com/microsoft-dpe/wa-toolkit-ios-configutility) and the [Cloud Ready Packages](https://github.com/microsoft-dpe/wa-toolkit-cloudreadypackages). There are a quite a few changes in this update including:

* New Cloud Ready Packages to support different sizes using ACS or Membership Services
* An update Configuration Utility to support creating the Service Definition files for the new Cloud Ready Packages
* Support for the new Packages in the Toolkit
* Updated header documentation
* Support for properties in Blobs and Containers
* Split out the Unit Testing library so it clearly identifies the tests that are Integration Tests vs Unit Tests
* A few fixes and enhancements via the issues on GitHub.

This is a pretty significant update to the Toolkit. This is a great upgrade for those using the Toolkit or those looking to add it to their Application.

We are working on updating the packages with a few more enhancements. This will mean another release with these and further enhancements. If you have any issues, please report them on the github page for the appropriate project.  The upcoming changes include the following:

* Support the 2011-08-18 version changes
* Add new properties to support the new blob API in the new Cloud Ready Packages
* Add new integration tests for new APIs

If you want to follow along with these changes, you can watch the develop branch of each project.

We are also hoping to create a new video to show off how you can use the new toolkit.

Enjoy!