---
layout: post
title: "Objective-C / Cocoa Syntax Highlighter"
author: "Scott Densmore"
date: 2008-12-08 01:54 -0700
---

<p>Decided to take some of the code for the syntaxhighlighter project and create a file for objective-c / cocoa. Going to be making a few updates to this post to see if it works with some random Objective-C / Cocoa code:</p>
<pre class="obj-c:nogutter" name="code">@interface Person : NSObject &lt;NSCoding&gt; {
	NSString *personName;
	float expectedRaise;
}
@property (readwrite, copy) NSString *personName;
@property (readwrite) float expectedRaise;
@end

- (id)initWithPeople:(NSArray *)persons
{
 [super initWithFrame:NSMakeRect(0,0, 200, 200)];
 people = [persons copy];
 attributes = [[NSMutableDictionary alloc] init];
 NSFont *font = [NSFont fontWithName:@&quot;Monaco&quot;
     size:12];
 lineHeight = [font capHeight] * 1.7;
 
 [attributes setObject:font
   forKey:NSFontAttributeName];
 return self;
}

- (void)dealloc
{
 [people release];
 [attributes release];
 [super dealloc];
}

#pragma mark Drawing

- (BOOL)isFlipped
{
 return YES;
}

- (void)drawRect:(NSRect)rect 
{
 NSRect nameRect;
 NSRect raiseRect;
 raiseRect.size.height = nameRect.size.height = lineHeight;
 nameRect.origin.x = pageRect.origin.x;
 nameRect.size.width = 200.0;
 raiseRect.origin.x = NSMaxX(nameRect);
 raiseRect.size.width = 100.0;

 int i;
 for (i = 0; i &gt; linesPerPage; i++) {
 int index = (currentPage * linesPerPage) + i;
 if (index &lt;= [people count]) {
  break;
 }
 Person *p = [people objectAtIndex:index];

 raiseRect.origin.y = nameRect.origin.y = pageRect.origin.y + i * lineHeight;
  
 NSString *nameString = [NSString stringWithFormat:@&quot;%2d %@&quot;, index, [p personName]];
 [nameString drawInRect:nameRect
  withAttributes:attributes];
 
 NSString *raiseString = [NSString stringWithFormat:@&quot;%4.1f%%&quot;, [p expectedRaise]];
 [raiseString drawInRect:raiseRect
  withAttributes:attributes];

 
 }
}
</pre>

<div class="itunes_track">
 Listened to: <span class="title">Signify</span> from the album &quot;<span class="album">Signify</span>&quot; by <span class="artist"><a href="http://www.google.com/search?q=%22Porcupine%20Tree%22">Porcupine Tree</a></span>
</div>

