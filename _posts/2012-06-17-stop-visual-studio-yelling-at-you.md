---
layout: post
title: "Stop Visual Studio Yelling at You"
author: "Scott Densmore"
date: 2012-06-17 02:36 -0700
---

I am getting old.  I really like Visual Studio, but I am not a fan of the new all caps mode in the menu bar. If you want to stop yelling at you:

Open your registry editor and create the following registry key and value

`HKEY\_CURRENT\_USER\\Software\\Microsoft\\VisualStudio\\11.0\\General\\SuppressUppercaseConversion  
REG\_DWORD value: 1`

Use at your own risk :).

Enjoy!