---
layout: post
title: "Another Update for the Deployment scripts for Windows Azure"
microblog: false
audio:
date: 2011-02-24 02:45 -0700
guid: http://scottdensmore.micro.blog/2011/02/24/another-update-for-the-deployment-scripts-for-windows-azure.html
---

[Tom Hollander](http://blogs.msdn.com/b/tomholl/) called me the other day looking for some advice on deployment scripts for Windows Azure. Given that I have not got around to updating these for the new SDK and commandlets, I decided it was about time. Tom did beat me to the punch and put out [his own post](http://blogs.msdn.com/b/tomholl/archive/2011/02/23/using-msbuild-to-deploy-to-multiple-windows-azure-environments.aspx) (which is very good), yet I figured I would update the scripts and push them out to [github](https://github.com/scottdensmore/AzureDeploySample).  Now anytime you want, you can fork, send me pull requests etc.

The only major changes besides the SDK and Commandlet updates where the ideas incorporated from Tom's post. I now pass all the info to the PowerShell scripts from the msbuild file. I also fixed a problem in the deploy PowerShell script. If you don't have the names of your service host and storage account the same, the deploy fails.  You can read more about it [here](http://social.msdn.microsoft.com/Forums/en-US/windowsazure/thread/504abb65-ac68-4f65-ac7c-335ace6830ba/).

Have fun in the cloud!
