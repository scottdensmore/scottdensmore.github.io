---
layout: post
title: "What is in a Parameter Name"
author: "Scott Densmore"
date: 2008-08-01 00:00 -0700
---

I have been working on an extension to Unity for a while to do interception. It is basically a port that [Brad Wilson](http://bradwilson.typepad.com) and I did for [ObjectBuilder](http://www.codeplex.com/objectbuilder) and the SimpleContainer we built. I first did this before I left patterns & practices and pushed it on to the UnityContrib site. All went well until I wanted to go back and update the code for Unity 1.1\. When I ran the unit tests, I got 14 errors and a very odd stack trace:

```csharp
Parameter name: str   
(Strategy type Microsoft.Practices.ObjectBuilder2.DynamicMethodConstructorStrategy, index 0) --->   
System.ArgumentNullException: Value cannot be null. Parameter name: str  
...
```

Ok... what the heck is null? Well after digging a little into what that method is doing, it is using the parameter name to emit the dynamic code for the build plans:

```csharp
// Resolve parameters
ParameterInfo[] parameters = selectedCtor.Constructor.GetParameters();

buildContext.IL.BeginExceptionBlock();

int i = 0;
foreach (string parameterKey in selectedCtor.GetParameterKeys())
{
    buildContext.IL.Emit(OpCodes.Ldstr, parameters[i].Name);
    buildContext.IL.Emit(OpCodes.Stloc, currentParameterName);
    buildContext.EmitResolveDependency(parameters[i].ParameterType, parameterKey);
    ++i;
}
...
```

I am confused... I open up ILDASM and look at my dynamic type for interception and see that there is a name for the parameter called A_1\. This is where I went wrong in retrospect. What ILDASM was doing was adding a name for my parameter even though I did not have one. How I figured this out was to add some tests to see where my emit code was going wrong. I found that when you add parameters for constructors / methods, they don't get names and the compiler is perfectly happy to let you do this. So I did a little more reading and found out that I need to change my code from this:

```csharp
ConstructorBuilder wrappedConstructor = typeBuilder.DefineConstructor(
                MethodAttributes.Public | MethodAttributes.HideBySig |   
                MethodAttributes.SpecialName | MethodAttributes.RTSpecialName,                  
                CallingConventions.HasThis,  
                parameterTypes.ToArray());
```

to this:

```csharp
ConstructorBuilder wrappedConstructor = typeBuilder.DefineConstructor(
                MethodAttributes.Public | MethodAttributes.HideBySig |   
                MethodAttributes.SpecialName | MethodAttributes.RTSpecialName,
                CallingConventions.HasThis,
                parameterTypes.ToArray());

// Define the name of the parameters for the constructor
wrappedConstructor.DefineParameter(1, ParameterAttributes.None, "ilEmitProxy");
for (int idx = 0; idx < parameters.Length; idx++)
{
    wrappedConstructor.DefineParameter(idx + 2, ParameterAttributes.None, parameters[idx].Name);
}
```

So DefineParameter was the key for me. Although I didn't really think that was it because I assumed (wrong of course) that it was to define the parameter that I had already defined in the call to DefineConstructor. Well, that shows you what I know.

Guess names really do matter.... although I can never remember them Bob.