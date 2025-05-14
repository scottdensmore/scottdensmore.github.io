---
layout: post
title: "Azure Deployment for your Build Server"
date: 2010-03-28 02:39 -0700
author: "Scott Densmore"
---

One of the more mundane tasks when working with Azure is the deployment process. There are APIs that can help deploy your application without having to go through the [Windows Azure portal](http://windows.azure.com) and Visual Studio. These APIs have been wrapped up nicely with the [Windows Azure Service Management CmdLets](http://code.msdn.microsoft.com/azurecmdlets). The one thing that would make this all better is if we could use these APIs and scripts to deploy our project every time a build we define happens. That is exactly what we have done for our [Windows Azure Guidance](http://wag.codeplex.com/) and I wanted to go ahead and get it out there for people to use. My friend [Jim's post](http://www.jimzimmerman.com/blog/2010/03/16/Deploying+An+Azure+Project+Using+TFS+2010.aspx) was a start and this is the next step.

**Tools**

* [Windows Azure SDK 1.1](http://www.microsoft.com/downloads/details.aspx?familyid=DBA6A576-468D-4EF6-877E-B14E3C865D3A&displaylang=en)
* [Windows Azure Tools for Visual Studio](ttp://www.microsoft.com/downloads/details.aspx?FamilyID=5664019e-6860-4c33-9843-4eb40b297ab6&displaylang=en)
* PowerShell
* [Windows Azure Service Management CmdLets](http://code.msdn.microsoft.com/azurecmdlets)
* Visual Studio 2008 SP1
* .NET 3.5 SP1

**Overview**

In the zip file there is a Windows Azure project with a web role using ASP.NET and a Worker role. The project doesn't actually do anything because the point here is just to illustrate the deployment process. There are two major issues that come up when you have to build and deploy your project. The first is updating and managing your ServiceConfiguration file that points to the correct storage location with your key. Normally you want this to point to using local development storage and not have to manage multiple files / entries. The second issue is that of the deployment itself. Where do you deploy the package and how do you make sure you do it consistently?

**Deploy.ps1**

The key to the deployment is the commandlets and putting them together. The script takes 4 arguments: build path, package name, service configuration file name and the service name. The build path is the path where your project builds your deployment package (C:\\MyBuildPath). The package name is the file name for your package to upload to azure (mypackage.cspkg). The service configuration file name is your service configuration file for your project / package (ServiceConfiguration.cscfg). The service name is the storage service name where you will upload your package (myservice). You also have to have an API certificate for your account installed on your machine and get that for the script. You will also need your subscription id which you can find on your account page on the Windows Azure Portal. The first part is to determine if the snap-ins for the commandlet are added and if not add them. After this, we get the hosted service for staging. You could change this if you want to get it for production. If the deployment already exists we suspend it, then delete it. We then deploy the new package and run it.

**The Build Script**

The build script takes advantage of the MSBuild tasks shipped with the the Windows Azure Tools for Visual Studio. It also uses a RegEx task that we ship with our [Windows Azure Guidance](http://wag.codeplex.com) project. The RegEx tasks are used to manipulate the Service Configuration file and replace the keys for data and diagnostic connection strings. You will see that there are property groups that you can replace with your information. The EscAccountKey is there because some of the service keys contain characters that you will need to escape (\\) so that the RegEx can replace it (like backslashes (/) and plus signs (+)). In the Deploy target we exec PowerShell to run the deploy.ps1 file with all the required parameters we gathered from the build.

**Gotchas**

The one thing that you will have to do is if you are running 64 bit version of Windows and PowerShell is make sure that you are running the 32 bit version of MSBuild and install the commandlets for 32 bit PowerShell. You will need to run the 32 bit version of MSBuild because the targets file for Azure is in the x86 Program Files folder. I included a set of build files that you can add to the Azure commandlets install directory in the setup\\dependency\_checker\\scripts\\tasks directory. Then run installPSSnapIn-x86.cmd from a command / PowerShell prompt.

To run the build to deploy you will need to replace all the elements for your own Azure account and run the deploy build:

**msbuild azuredeploy.msbuild /t:Deploy /p:BuildType=Debug**

If you want to undo the connection strings back to development storage run this command:

**msbuild azuredeploy.msbuild /t:SetDevConnectionStrings**

That is all there is to it. Have fun and look for more on [Windows Azure Guidance](http://wag.codeplex.com/).

**Update \[03/30/2010\]**

Made a few changes to the deploy script to make it easier to work with. Now all you need to do is update the information in the project solution property group and you don't need to search and replace the entire msbuild file.

[Download Azure Deploy Script](/assets/files/AzureDeploy.zip)

**Update \[02/25/2011\]**

Made some pretty significant changes and moved code to github.  [Check out latest post](http://scottdensmore.typepad.com/blog/2011/02/another-update-for-the-deployment-scripts-for-windows-azure.html).

Listened to: Trains from the album "In Absentia" by [Porcupine Tree](http://www.google.com/search?q=%22Porcupine%20Tree%22)
