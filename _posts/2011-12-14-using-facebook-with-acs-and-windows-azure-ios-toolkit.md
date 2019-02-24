---
layout: post
title: "Using Facebook with ACS and Windows Azure iOS Toolkit"
microblog: false
audo:
date: 2011-12-14 02:56 -0700
guid: http://scottdensmore.micro.blog/2011/12/14/using-facebook-with-acs-and-windows-azure-ios-toolkit.html
---

Simon Guest posted a way to [extract your Facebook information from the ACS token](http://simonguest.com/2011/11/11/extracting-and-using-facebook-oauth-token-from-acs).  Now there is nothing wrong with how Simon did this, I am just updating the toolkit to add all the claims to the claim set from ACS that will make this easier.

If you look in the [master branch in file WACloudAccessToken.m line 81](https://github.com/microsoft-dpe/wa-toolkit-ios/blob/master/library/Library/ACS/WACloudAccessToken.m), you can see that when the claims are created yet filtered based on a claims prefix. We are now going to remove this requirement and allow all the claims to come through which will now make extracting the information for Facebook much easier. The following is the [code](https://gist.github.com/1478309) to do exactly what Simon did in the new code:

```objective-c
NSString \* const ACSNamespace = @"your ACS namespace";
NSString \* const ACSRealm = @"your relying party realm";

NSString \* const NameIdentifierClaim = @"http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier";
NSString \* const AccessTokenClaim = @"http://www.facebook.com/claims/AccessToken";

- (IBAction)login:(id)sender
{
    self.loginButton.hidden = YES;
    WACloudAccessControlClient \*acsClient = \[WACloudAccessControlClient accessControlClientForNamespace:ACSNamespace realm:ACSRealm\];
    \[acsClient showInViewController:self allowsClose:NO withCompletionHandler:^(BOOL authenticated) {
        if (!authenticated) {
            NSLog(@"Error authenticating");
            self.loginButton.hidden = NO;
        } else {
            \_token = \[WACloudAccessControlClient sharedToken\];
            self.friendsButton.hidden = NO;
        }
    }\];
}

- (IBAction)friends:(id)sender
{
    // Get claims
    NSString \*fbuserId = \[\[\_token claims\] objectForKey:NameIdentifierClaim\];
    NSString \*oauthToken = \[\[\_token claims\] objectForKey:AccessTokenClaim\];

    // Get my friends
    NSError \*error = NULL;
    NSString \*graphURL = \[NSString stringWithFormat:@"https://graph.facebook.com/%@/friends?access\_token=%@",fbuserId,oauthToken\];
    NSURLRequest \*request = \[NSURLRequest requestWithURL:\[NSURL URLWithString:graphURL\]\];
    NSURLResponse \*response = NULL;
    NSData \*data = \[NSURLConnection sendSynchronousRequest:request returningResponse:&response error:&error\];
    NSString \*friendsList = \[\[NSString alloc\] initWithData:data encoding:NSUTF8StringEncoding\];
    NSRegularExpression \*regex = \[NSRegularExpression regularExpressionWithPattern:@"id" options:0 error:&error\];
    NSUInteger friendCount = \[regex numberOfMatchesInString:friendsList options:0 range:NSMakeRange(0, \[friendsList length\])\];
    \[friendsList release\];

    self.friendLabel.text = \[NSString stringWithFormat:@"%d friends", friendCount\];
    self.friendLabel.hidden = NO;
}
```

This code is checked into the [develop branch](https://github.com/microsoft-dpe/wa-toolkit-ios/tree/develop). I even create a sample based on this in that branch.

Enjoy!