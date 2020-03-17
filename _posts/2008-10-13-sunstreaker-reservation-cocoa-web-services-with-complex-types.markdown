---
layout: post
title: "Sunstreaker Reservation: Cocoa Web Services With Complex Types"
date: 2008-10-13 01:30 -0700
---
So far we have been doing what I do in most projects when I start, spiking some concepts. I can't say I have really time boxed myself on these because the wife and kids would probably not like the schedule. This spike mainly consisted of trying to figure out how to take make calls to a web service that has request and response objects that are Complex Types. This proved to be a little more complicated than I had anticipated.

The first part was to setup a call in the service contract of our IReservationService that had complex types:

{% highlight objectivec %}
[OperationContract(Name = "SearchAvailability",
            Action = "SearchAvailabilityRequest",
            ReplyAction = "SearchAvailabilityResponse")]
ResortCollection SearchAvailability(SearchAvailabilityRequest searchAvailabilityRequest);
{% endhighlight %}

The first thing we need to do is setup the code for the call to the operation. I will forgo the header declaration and the following is the implementation:

<!-- markdownlint-disable MD034 -->
<!-- markdownlint-disable MD032 -->
<!-- markdownlint-disable MD004 -->
{% highlight objectivec %}
@implementation SearchAvailability
- (void) setParameters:(CFTypeRef) in_parameters
{
    id _paramValues[] = {
        (id)in_parameters,
    };
    NSString* _paramNames[] = {
        @"searchAvailabilityRequest",
    };
    [super setParameters:1 values: _paramValues names: _paramNames];
}

- (id) resultValue
{
        return [[super getResultDictionary] objectForKey: @"SearchAvailabilityResult"];
}

- (WSMethodInvocationRef) genCreateInvocationRef
{
        WSMethodInvocationRef ref = [self createInvocationRef
                        /*endpoint*/: @"http://172.16.41.128/Reservation/ReservationService.svc"
                        methodName: @"SearchAvailability"
                        protocol: (NSString*) kWSSOAP2001Protocol
                        style: (NSString*) kWSSOAPStyleDoc
                        soapAction: @"SearchAvailabilityRequest"
            methodNamespace: @"http://scottdensmore.com/reservations/2008/09"
                        ];
        return ref;
}

@end;
+ (id) SearchAvailability:(CFTypeRef) in_parameters
{
    id result = NULL;
    SearchAvailability* _invocation = [[SearchAvailability alloc] init];
    [_invocation setParameters: in_parameters];
    result = [[_invocation resultValue] retain];
    [_invocation release];
    return result;
}
{% endhighlight %}
<!-- markdownlint-enabled MD004 -->

I did another call to WSMakeStubs to make sure I wasn't missing anything, yet by this time I have figured out that it is going to get it wrong no matter what I do for my service. (I see a refactoring in our future since all this code is starting to look the same.) In this code, we see that in the result we are getting the value for the SearchAvailabilityResult instead of SearchAvailabilityResponse. The reason for this is that the actual schema type defined in the WSDL is SearchAvailabilityResult for the type ResortCollection.

Now we need to figure out how to send the request. Since the WebServicesCore.framework works with NSDictionary (CFDictionary to be exact) instances, I decided to follow some of the advice from this [entry](http://en.wikibooks.org/wiki/Programming:WebObjects/Web_Services/Web_Service_Provider#Passing_a_Complex_Type_to_WO)and build a wrapper object to represent my request. The following is the declaration and implementation of the object

{% highlight objectivec %}
@interface WSSearchAvailabilityRequest : NSObject {
        NSMutableDictionary *resultDictionary;
}

-(id)initWithDictionary:(NSDictionary *)dictionary;
-(NSDictionary *)dictionary;
-(NSDate *)arrival;
-(void)setArrival:(NSDate *)date;
-(NSDate *)departure;
-(void)setDeparture:(NSDate *)date;
-(int)numberOfChildren;
-(void)setNumberOfChildren:(int)count;
-(int)numberOfAdults;
-(void)setNumberOfAdults:(int)count;
@end

@implementation WSSearchAvailabilityRequest
-(id)init
{
        return [self initWithDictionary:[NSDictionary dictionaryWithObjectsAndKeys:
                         @"", @"Arrival",
                         @"", @"Departure",
                         @"", @"NumberOfAdults",
                         @"", @"NumberOfChildren",
                         nil]];
}

-(id)initWithDictionary:(NSDictionary *)dictionary
{
        self = [super init];
        resultDictionary = [[dictionary mutableCopy] retain];
        [resultDictionary setObject:@"http://scottdensmore.com/reservations/2008/09" forKey:(NSString *)kWSRecordNamespaceURI];
        [resultDictionary setObject:@"SearchAvailabilityRequest" forKey:(NSString *)kWSRecordType];

        return self;
}

-(void)dealloc
{
        [resultDictionary release];
        [super dealloc];
}

-(NSDictionary *)dictionary
{
        return resultDictionary;
}

-(NSDate *)arrival
{
        NSDate *value = [NSDate dateWithString: [resultDictionary objectForKey:@"Arrival"]];

        return value;
}

-(void)setArrival:(NSDate *)date
{
        [resultDictionary setObject:date forKey:@"Arrival"];
}

-(NSDate *)departure
{
        return [resultDictionary objectForKey:@"Departure"];
}

-(void)setDeparture:(NSDate *)date
{
        [resultDictionary setObject:date forKey:@"Departure"];
}

-(int)numberOfChildren
{
        NSNumber *val = [resultDictionary objectForKey:@"NumberOfChildren"];
        return [val intValue];
}

-(void)setNumberOfChildren:(int)count
{
        [resultDictionary setObject:[NSNumber numberWithInt:count] forKey:@"NumberOfChildren"];
}

-(int)numberOfAdults
{
        NSNumber *val = [resultDictionary objectForKey:@"NumberOfAdults"];
        return [val intValue];
}

-(void)setNumberOfAdults:(int)count;
{
        [resultDictionary setObject:[NSNumber numberWithInt:count] forKey:@"NumberOfAdults"];
}
@end
{% endhighlight %}

Each of the calls wraps a call to the dictionary that holds the value for the key in the schema. For example, the call to numberOfChildren / setNumberOfChildren wraps the value for the NumberOfChildren element in the schema. Now that we have this object we can write the following code in our client to get a result:

{% highlight objectivec %}
NSLog(@"Calling reservation service: SearchAvailability");
WSSearchAvailabilityRequest *SearchAvailabilityRequest = [[WSSearchAvailabilityRequest alloc] init];
[SearchAvailabilityRequest setArrival:[NSDate date]];
[SearchAvailabilityRequest setDeparture:[NSDate date]];
[SearchAvailabilityRequest setNumberOfAdults:2];
[SearchAvailabilityRequest setNumberOfChildren:2];
result = [ReservationService SearchAvailability:[SearchAvailabilityRequest dictionary]];
NSLog(@"Result from SearchAvailability: %@", result);
{% endhighlight %}

Of course, nothing, nadda, zip. The problem is we don't know what is going on. It would be nice to be able to see what is going in and out of the calls to our service. Fortunately we can see this with some properties set in our call to the service. We will update the genCreateInvocationRef call in the SearchAvailability class with the debugging options available. These options are not well documented, yet I found them [here](http://developer.apple.com/internet/webservices/webservicescoreandcfnetwork.html) .

- kWSDebugIncomingBody - add the incoming SOAP body to the result
- kWSDebugIncomingHeaders - add the incoming SOAP headers to the result
- kWSDebugOutgoingBody - add the outgoing SOAP headers to the result
- kWSDebugOutgoingHeaders - add the outgoing SOAP headers to the result

{% highlight objectivec %}
- (WSMethodInvocationRef) genCreateInvocationRef
{
   WSMethodInvocationRef ref = [self createInvocationRef
                        /*endpoint*/: @"http://172.16.41.128/Reservation/ReservationService.svc"
                        methodName: @"SearchAvailability"
                        protocol: (NSString*) kWSSOAP2001Protocol
                        style: (NSString*) kWSSOAPStyleDoc
                        soapAction: @"SearchAvailabilityRequest"
            methodNamespace: @"http://scottdensmore.com/reservations/2008/09"
                        ];

    WSMethodInvocationSetProperty(ref, kWSDebugIncomingBody, kCFBooleanTrue);
    WSMethodInvocationSetProperty(ref, kWSDebugIncomingHeaders, kCFBooleanTrue);
    WSMethodInvocationSetProperty(ref, kWSDebugOutgoingBody, kCFBooleanTrue);
    WSMethodInvocationSetProperty(ref, kWSDebugOutgoingHeaders, kCFBooleanTrue);
    return ref;
}
{% endhighlight %}

Now that we have the debug information we also need to print out the results from the return. We can do this by looping through the result like this (some truncated):

{% highlight objectivec %}
NSDictionary *dictionary = (NSDictionary*)result;
NSString *key;
for (key in dictionary) {
        NSLog(@"Key: %@, Value: %@", key, [dictionary valueForKey:key]);
}
{% endhighlight %}

We get the following results:

{% highlight plaintext %}
2008-10-13 21:27:34.404 EchoClient[6848:813] Key: /FaultCode, Value: -1
2008-10-13 21:27:34.404 EchoClient[6848:813] Key: /WSDebugInHeaders, Value: {
    "Cache-Control" = private;
    Connection = close;
    "Content-Length" = 5574;
    "Content-Type" = "text/xml; charset=utf-8";
    Date = "Tue, 14 Oct 2008 01:27:27 GMT";
    Server = "Microsoft-IIS/6.0";
    "X-Aspnet-Version" = "2.0.50727";
    "X-Powered-By" = "ASP.NET";
}
2008-10-13 21:27:34.405 EchoClient[6848:813] Key: /WSDebugOutHeaders, Value: {
    "Content-Type" = "text/xml";
    Host = "172.16.41.128";
    Soapaction = SearchAvailabilityRequest;
    "User-Agent" = "Mac OS X; WebServicesCore.framework (1.0.0)";
}
2008-10-13 21:27:34.407 EchoClient[6848:813] Key: /kWSHTTPResponseMessage, Value:
2008-10-13 21:27:34.408 EchoClient[6848:813] Key: /kWSResultIsFault, Value: 1
2008-10-13 21:27:34.409 EchoClient[6848:813] Key: /FaultString, Value: The formatter threw an exception while trying to deserialize the message: There was an error while trying to deserialize parameter http://scottdensmore.com/reservations/2008/09:SearchAvailabilityRequest. The InnerException message was 'Error in line 11 position 48. 'Element' 'NumberOfAdults' from namespace 'http://scottdensmore.com/reservations/2008/09' is not expected. Expecting element 'Arrival'.'.  Please see InnerException for more details.
{% endhighlight %}

With this debug information in the debug window, we can see that our order is not right. Here is where I spent most of my time. This is a gotcha that I only found by trial and error.

I started to look through the documentation and found [this entry about extra soap parameters](http://developer.apple.com/documentation/Networking/Conceptual/UsingWebservices/3_ref_folder/chapter_3.3_section_6.html#//apple_ref/doc/uid/TP30000985-CH2g-ExtraPropertiesforSOAPMessages). I decided that kWSRecordParameterOrder sounded like what I wanted. I decided to add it to my wrapper object and see what would happen. It looked like it wanted an array of strings so I put the following code in:

{% highlight objectivec %}
-(id)initWithDictionary:(NSDictionary *)dictionary
{
        self = [super init];
        resultDictionary = [[dictionary mutableCopy] retain];
        [resultDictionary setObject:@"http://scottdensmore.com/reservations/2008/09" forKey:(NSString *)kWSRecordNamespaceURI];
        [resultDictionary setObject:@"SearchAvailabilityRequest" forKey:(NSString *)kWSRecordType];
        [resultDictionary setObject:[[NSArray alloc] initWithObjects:@"Arrival", @"Departure", @"NumberOfAdults", @"NumberOfChildren", nil]
                                                 forKey:(NSString *)kWSRecordParameterOrder];
        return self;
}
{% endhighlight %}
<!-- markdownlint-enabled MD034 -->
<!-- markdownlint-enabled MD032 -->

Success! Now we can just do the same thing for the request and we are in business.
I will forgo posting all the code for the response object (you can download it to take a look). The one thing that is important to note is that the result contains a dictionary of an array of dictionary objects. Like I said, all you get is dictionary objects :).
This was a bit of a long winded post. Download the client and server to go through everything. This can seem a bit complicated, although not as complicated as when I started and knew nothing.  
