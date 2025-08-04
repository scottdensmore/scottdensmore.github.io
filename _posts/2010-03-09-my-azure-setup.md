---
layout: post
title: My azure setup
author: Scott Densmore
date: 2010-03-09 02:39 -0700
tags:
- windows
- personal
- azure
- visual-studio
- career
---

The first thing I did to get started on our new [Azure Guidance project](http://www.codeplex.com/wag) is setup the environment. Since I always seem to forget or people keep asking me what my setup is I thought I would write it down so I don't have to keep reminding myself over and over.

**The Tools**

* Windows 7
* PowerShell
* IIS
* Visual Studio 2008 SP 1
* SQL Express 2008 SP 1
* [Windows Azure SDK](http://www.microsoft.com/downloads/details.aspx?familyid=DBA6A576-468D-4EF6-877E-B14E3C865D3A&displaylang=en)
* [Windows Azure Tools for Visual Studio 1.1](http://www.microsoft.com/downloads/details.aspx?FamilyID=5664019e-6860-4c33-9843-4eb40b297ab6&displaylang=en)
* [Azure PowerShell Commandlets](http://code.msdn.microsoft.com/azurecmdlets)

Not all of the tools are required to work with Azure, yet they sure help. Another one that I will mention just because it makes it easier to work with SQL Azure is [SQL Express 2008 R2](http://www.microsoft.com/downloads/details.aspx?FamilyID=c772467d-e45b-43e1-9208-2c7b663d7ad1&displaylang=en).

I already have WIndows 7 which ships with PowerShell. The only thing you really need to install is Visual Studio 2008 SP1 and the PowerShell Commandlets. You can install all the tools by hand and configure IIS so that it will run Azure projects or you can get the [Web Platform Installer](http://www.microsoft.com/web/Downloads/platform.aspx) (WPI). I am assuming most will want the easy way.

Once you have the WPI setup and open, there are options to show other tabs. Go into the options and choose the Developer Tools tab. Once you have the Developer Tools tab opened, you will see an option for Visual Studio Tools. The Azure Tools for Visual Studio is here and you can check it. It will pick all the dependencies for you and setup everything for you. This makes life much easier.

After everything is setup I make a few adjustments to my PowerShell scripts. I do everything from the command line so this makes my life easier. I add the following to the my startup script (feel free to change the path to where Azure is located):

```powershell
\# setup Azure Environment
if (test-path "C:\\Program Files\\Windows Azure SDK\\v1.1\\") {
    append-path "C:\\Program Files\\Windows Azure SDK\\v1.1\\"
    append-path "C:\\Program Files\\Windows Azure SDK\\v1.1\\bin\\"
    set-content env:\\\_CSRUN\_STATE\_DIRECTORY "C:\\Azure"
}

The append-path statement is a file named append-path.ps1 in my profile directory and looks like this:

$local:command\_usage ="usage: append-path path-to-be-added"

if ($args.length -lt 1) { return ($command\_usage) }

$local:oldPath = get-content Env:\\Path
$local:newPath = $local:oldPath + ";" + $args
set-content Env:\\Path $local:newPath
```

All this does is add the azure sdk to my path and update the path where Azure stores the output for the local dev fabric. I change the directory because I hit the "path to long" error quite a bit. You can read more about the issue at [Jim Nakashima's blog.](http://blogs.msdn.com/jnak/archive/2010/01/14/windows-azure-path-too-long.aspx) Once I have this setup I can start and stop the local dev fabric, build, and deploy (more on this in a later post) my Azure projects.

\[One note is I run my Azure PowerShell prompt as an Admin since this is required to interact with the local Dev Fabric.\]

Hope this helps!

Listened to: Warm Sound from the album "When It Falls" by [Zero 7](http://www.google.com/search?q=%22Zero%207%22)