---
layout: post
title: "Windows Azure AppFabric Caching Tip - Use the applicationName attribute"
author: "Scott Densmore"
date: 2011-06-17 02:50 -0700
---

We are working on updates to our [Developing Applications for the Cloud](http://msdn.microsoft.com/en-us/library/ff966499.aspx) content. In the first version we used a feature from [MVC Futures](http://mvc.codeplex.com/) to simulate View State in our code so we didn't have to deal with Session in the application. Now with the release of AppFabric Caching as a Session provider, we are switching our code to use this. At first we found the following:

"The Session State providers use the IIS Site Name to identify individual web applications to avoid sharing session state between different apps. And this is where you have a distinct difference between your local compute emulator and a live deployment.

In the production environment, all of your web roles will host your application under the same Site Name on the different instances. In your emulator, on the other hand, all needs to be handled by one IIS Server, so you end up with different Site Names for each instance.

So, in essence, you won't be able to test session state management with multiple web role instances on your compute emulator."

This wasn't a very good answer.

What we found is that adding in the optional applicationName element overrides the use of the IIS Site Name, so it works correctly both in the Compute Emulator and in the cloud.

```xml
<sessionState mode="Custom" customProvider="AppFabricCacheSessionStoreProvider">  
<providers>  
<add name="AppFabricCacheSessionStoreProvider"  
type="Microsoft.Web.DistributedCache.DistributedCacheSessionStateStoreProvider, Microsoft.Web.DistributedCache"  
cacheName="default"
applicationName="MyAppName"
useBlobMode="true"  
dataCacheClientName="default" />  
</providers>  
</sessionState>
```

Keep your head in the clouds!