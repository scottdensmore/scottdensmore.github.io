---
layout: post
title: 'Cocoa to Web Service: Sunstreaker Reservation'
date: 2008-09-26 01:30 -0700
author: Scott Densmore
tags:
- web
- conference
- agile
- ios
- career
- dotnet
---
In my [last post](http://scottdensmore.typepad.com/blog/2008/09/cocoa-to-wsdl-web-service-or-hi-pc-it-is-me-mac.html) I started putting together connecting my Mac to my WCF web service. I decided to make this into a series in the spirit of [MVC Storefront](http://blog.wekeroad.com/mvc-storefront/). I needed a good name. I talked with [jedi](http://blogs.msdn.com/agilemonkey/) about what I should name my series. He liked the Transformer names so picked one that I had as a kid, [Sunstreaker](http://en.wikipedia.org/wiki/Sunstreaker).

Now that we have the name out of the way, lets talk about how we get a simple Foundation Tool talking to our Echo Web Service. After doing some reading I decided to give WSMakeStubs a try. It was pretty easy: WSMakeStubs -x ObjC -name ReservationService -url http://172.16.41.128/Reservation/ReservationService.svc?wsdl . This generated 4 files: ReservationService.h, ReservationService.m, WSGeneratedObj.h and WSGeneratedObj.m. The first two files implement the code that you use to interact with the Web Service. The last two files are generic and will be regenerated each time you run WSMakeStubs. I included these files in my project and added the CoreService.framework to the External Frameworks of the project. I built and ran the following code:

```objectivec
NSAutoreleasePool * pool = \[\[NSAutoreleasePool alloc\] init\];
NSLog(@"Calling reservation service");
id result = \[ReservationService Echo:@"boo"\];
NSLog(@"Result: %@", result);
\[pool drain\];
return 0;
```

What did I get for result? Nothing, nadda, zip, (nil). Wonder why? Well if we go back and look at SOAP Client and take a look at the calls made in ReservationService.m we might get a clue. The first thing I noticed was this code:

```objectivec
\- (WSMethodInvocationRef) genCreateInvocationRef
{
  return \[self createInvocationRef
     /\*endpoint\*/: @"http://scottden-vm2/Reservation/ReservationService.svc"
         methodName: @"Echo"
           protocol: (NSString*) kWSSOAP2001Protocol
              // missing encoding style - defaulting to RPC
              style: (NSString*) kWSSOAPStyleRPC
         soapAction: @"EchoRequest"
    methodNamespace: NULL /* No Method Namespace specified */
 \];
}
```

One thing, we need to change is the endpoint to the IP address since there is no mapping to the host name. The next thing we need to change is the encoding style to document and set the namespace for the method. After those changes we have the following:

```objectivec
\- (WSMethodInvocationRef) genCreateInvocationRef
{
 return \[self createInvocationRef
        /\*endpoint\*/: @"http://172.16.41.128/Reservation/ReservationService.svc"
            methodName: @"Echo"
              protocol: (NSString*) kWSSOAP2001Protocol
                 style: (NSString*) kWSSOAPStyleDoc
            soapAction: @"EchoRequest"
       methodNamespace: @"http://scottdensmore.com/reservations/2008/09"
 \];
}
```

Now that we fixed the invocation request, I ran it again... still nothing. Looking at what WSMakeStubs generated as parameter names, I see the problem:

```objectivec
\- (void) setParameters:(CFTypeRef /* Complex type http://scottdensmore.com/reservations/2008/09|Echo */) in_parameters
{
  id _paramValues\[\] = {
    in_parameters,
  };
  NSString* _paramNames\[\] = {
    @"parameters",
  };
  \[super setParameters:1 values: \_paramValues names: \_paramNames\];
}

\- (id) resultValue
{
 return \[\[super getResultDictionary\] objectForKey: @"parameters"\];
}
```

The parameter names are wrong. Change them to this:

```objectivec
\- (void) setParameters:(CFTypeRef /* Complex type http://scottdensmore.com/reservations/2008/09|Echo */) in_parameters
{
  id _paramValues\[\] = {
    in_parameters,
  };
  NSString* _paramNames\[\] = {
    @"param",
  };
  \[super setParameters:1 values: \_paramValues names: \_paramNames\];
}

\- (id) resultValue
{
 return \[\[super getResultDictionary\] objectForKey: @"EchoResult"\];
}
```

Ok, run it again. It has to run... nope. One more walk through of the code turns up this suspect method:

```objectivec
// Utility function called by the generated code to create the invocation
\- (WSMethodInvocationRef) createInvocationRef:(NSString*) endpoint
  methodName:(NSString*) methodName
  protocol:(NSString*) protocol
  style:(NSString*) style
  soapAction:(NSString*) soapAction
 methodNamespace:(NSString*) methodNamespace

{
  WSMethodInvocationRef ref = NULL;
  NSURL* url = \[NSURL URLWithString: endpoint\];
  if (url == NULL) {
    \[self handleError: @"NSURL URLWithString failed in createInvocationRef" errorString:NULL errorDomain:kCFStreamErrorDomainMacOSStatus errorNumber: paramErr\];
  } else {
    ref = WSMethodInvocationCreate((CFURLRef) url, (CFStringRef) methodName, (CFStringRef) protocol);

    if (ref == NULL)
    \[self handleError: @"WSMethodInvocationCreate failed in createInvocationRef" errorString:NULL errorDomain:kCFStreamErrorDomainMacOSStatus errorNumber: paramErr\];
    else {
      WSMethodInvocationSetProperty(ref, kWSSOAPBodyEncodingStyle, style);

      NSString* soapAction = @"SOAPAction";
      NSDictionary* headers = \[self copyHeaderDictionary:1 extraVals:&soapAction extraKeys:&soapAction\];
      WSMethodInvocationSetProperty(ref, kWSHTTPExtraHeaders, headers);
      \[headers release\];
      WSMethodInvocationSetProperty(ref, kWSSOAPMethodNamespaceURI, methodNamespace);
      WSClientContext context = { 0,
        (void*) self,
        (WSClientContextRetainCallBackProcPtr) CFRetain,
        (WSClientContextReleaseCallBackProcPtr) CFRelease,
        (WSClientContextCopyDescriptionCallBackProcPtr) CFCopyDescription
      };
     WSMethodInvocationSetCallBack(ref, \_\_async\_callback, &context);
    }
 }
 return ref;
}
```

If we look closely we will see that we have a message parameter called soapAction and in the method that sets up the SOAP Action we have another variable named soapAction that hides the scope. Lets change this method to this:

```objectivec
// Utility function called by the generated code to create the invocation
\- (WSMethodInvocationRef) createInvocationRef:(NSString*) endpoint
  methodName:(NSString*) methodName
  protocol:(NSString*) protocol
  style:(NSString*) style
  soapAction:(NSString*) soapAction
 methodNamespace:(NSString*) methodNamespace
{
 WSMethodInvocationRef ref = NULL;
 NSURL* url = \[NSURL URLWithString: endpoint\];
 if (url == NULL) {
 \[self handleError: @"NSURL URLWithString failed in createInvocationRef" errorString:NULL errorDomain:kCFStreamErrorDomainMacOSStatus errorNumber: paramErr\];
 } else {
 ref = WSMethodInvocationCreate((CFURLRef) url, (CFStringRef) methodName, (CFStringRef) protocol);

 if (ref == NULL)
 \[self handleError: @"WSMethodInvocationCreate failed in createInvocationRef" errorString:NULL errorDomain:kCFStreamErrorDomainMacOSStatus errorNumber: paramErr\];
 else {
 WSMethodInvocationSetProperty(ref, kWSSOAPBodyEncodingStyle, style);

 NSString* soapActionName = @"SOAPAction";
 NSDictionary* headers = \[self copyHeaderDictionary:1 extraVals:&soapAction extraKeys:&soapActionName\];
 WSMethodInvocationSetProperty(ref, kWSHTTPExtraHeaders, headers);
 \[headers release\];

 WSMethodInvocationSetProperty(ref, kWSSOAPMethodNamespaceURI, methodNamespace);

 WSClientContext context = { 0, 
  (void*) self, 
  (WSClientContextRetainCallBackProcPtr) CFRetain,
  (WSClientContextReleaseCallBackProcPtr) CFRelease, 
  (WSClientContextCopyDescriptionCallBackProcPtr) CFCopyDescription
 };
 WSMethodInvocationSetCallBack(ref, \_\_async\_callback, &context);
 }
 }

 return ref;
}
```

Now run it and viola: success! WOOT!

That seemed like a lot to get our little Echo Service running, yet we got there :). I have to say that I contribute most of what I learned here to a [post on connecting Web Objects to a Cocoa app](http://en.wikibooks.org/wiki/Programming:WebObjects/Web_Services/Web_Service_Provider).

Next time I will dig more into fixing up this code to handle faults. I was getting them, the code was just not surfacing them. Also we will look at connecting complex objects (not simple types).

[Download Reservation.zip (1622.9K)](/assets/files/Reservation.zip)

Listened to: Lost from the album "Avenged Sevenfold" by [Avenged Sevenfold](http://www.google.com/search?q=%22Avenged%20Sevenfold%22)