


## When _requiring_ data (eg. request bodies, function parameters)

**You can always:** 🟢

### Add new optional properties
```diff 
type Foo = {
    name: string; 
    value: string; 
+   nickName? : string; 
}
```

Reasoning: Existing code can continue not passing this extra property in. 

### Widen existing properties
```diff 
type Foo = {
    name: string;
-   value: string;  
+   value: string | number; 
}
```

Reasoning: Existing code can continue passing just strings in. 


### Make existing mandatory properties optional.   

```diff
type Foo = {
    name: string;
-   value: string;  
+   value?: string; 
}
```

Reasoning: Existing code can continue always passing this property in. 

### Remove mandatory or optional properties

```diff
type Foo = {
    name: string;
-   value: string;  
}
```

Reasoning: Existing code can continue passing this property in. The presence of the extra property should not break things in the function. 

☝️ In TypesScript there's a bit of nuance with this answer. You may need to use the `suppressExcessPropertyErrors` flag. 

See: [Example 1 - no flag](https://www.typescriptlang.org/play?suppressExcessPropertyErrors=false&ssl=22&ssc=3&pln=12&pc=1#code/C4TwDgpgBAYg9nKBeKBvAUFKBDAXFAZ2ACcBLAOwHMBuKddAX3voDMBXcgY2FLnKjYEIBeHAAULBPlEBKNPSbpOfIjhQYseKACJs2gDR0sAI3y7sexrXqDhosdjkB6J1AAqAC1IEo3qAHkAaQA6OnRbEQQxVCgXKAAhNmAoYC8fP3I4YEwcMz1DHNMdC21GGSA)

[Example 2 - `suppressExcessPropertyErrors` flag](https://www.typescriptlang.org/play?suppressExcessPropertyErrors=true&ssl=23&ssc=3&pln=17&pc=1#code/C4TwDgpgBAYg9nKBeKBvAUFKBDAXFAZ2ACcBLAOwHMBuKddAX3oDMBXcgY2FLnKlYIQC8OAApmCfCICUaek3QdeRHCgxY8UAETYtAGjpYARvh3ZdjWvXQB6G1ABycYNGAALaMwA22SgSgc2HxG0ILA-GBQFFAAKgDKUADCvMyklDhGcABuEAB0dOgCQiKi2LJ2sW6k-tVQAPIA0vn0RcIIoqhQFTFVNf7YXgSIjc0aproGmFAm2uZajNJAA)



**You can not:** 🛑 

### Add new mandatory properties
```diff
type Foo = {
    name: string;
    value: string;
+   color: string;  
}
```

Code that would break with this change: 

```typescript
doSomethingWithFoo({name: "foo", value: "bar"}); // Code did not pass a color property in 
```

### Make optional properties mandatory

```diff
type Foo = {
    name: string;
    value: string;
-   nickName?: string;
+   nickName: string;  

}
```

Code that would break with this change: 

```typescript
doSomethingWithFoo({name: "foo", value: "bar"}); // Code did not pass a now mandatory nickName in
```

### Narrow existing properties 


```diff
type Foo = {
    name: string;
-   value: string | number;
+   value: string; 
}
```

Code that would break with this change: 

```typescript
doSomethingWithFoo({name: "foo", value: 1}); // Code passed a now disallowed number value in 
```


## When _returning_ data (eg. reponse bodies, function return values) 

**You can always:** 🟢

### Add additional optional or mandatory properties 

```diff
type Foo = {
    name: string;
    value: string;
+   color: string;
+   age?: number;   
}
```

Reasoning: The presence of extra properties should not break the code that receives this data. (See caveat below). 


### Make optional properties now mandatory 

```diff
type Foo = {
    name: string;
    value: string;
-   nickName?: string; 
+   nickName: string; 
}
```

Reasoning: If the calling code was handling the precense of this property, it will continue to do so. If it was not handling the precense of this property, it's precense shouldn't break anything. 



### Narrow existing properties 

```diff
type Foo = {
    name: string;
-   value: string | number; 
+   value: string; 
}
```

Reasoning: The calling code will already be handling values of both type. 

### Remove optional properties 

```diff
type Foo = {
    name: string;
-   nickName?: string; 

}
```

Reasoning: The calling code will already be handling the scenario where this property does not exist.  


**You can not:** 🛑

### Remove mandatory properties
```diff
type Foo = {
    name: string;
-   value: string;
}
```

Code that would break with this change: 

```typescript

const myFoo : Foo  = getFoo(); 
foo.value.split(''); // Value not longer exists to do .split on 

```

### Widen existing properties 
```diff
type Foo = {
    name: string;
-   value: string;
+   value: string | number;
}
```

```typescript

const myFoo : Foo  = getFoo(); 
foo.value.split(''); // .split doesn't exist on a number type 

```

### Make mandatory properties optional 
```diff
type Foo = {
    name: string;
-   value: string;
+   value?: string;
}
```

Code that would break with this change: 

```typescript

const myFoo : Foo  = getFoo(); 
foo.value.split(''); // value may not exist to .split on 

```


## A caveat 

This model of extensibility assumes that consumers of your API understand this model of extensibility, and specifically the 'returned data can contain additional properties at anytime' part.  

An example of some code that would be broken by this model of extensibility: 

``` typescript 
// The API code
type UserEnrichmentData  = {
     favouriteColor: string;  
     favouriteAnimal: string; 
}

function getSomeData() : UserEnrichmentData {
    // returns some data
}


// The consumer code 

const user = {
   name: "foo", 
   type: "student"
}, 

const userEnrichmentData = getSomeData(); 

const enrichedUser = {
    ...user, 
    ...userEnrichmentData 
}

```

The potential problem here is what if we change UserEnrichementData like: 

```diff 
type UserEnrichmentData  = {
     favouriteColor: string;  
     favouriteAnimal: string; 
+    user: string; 
}
```

Now the `user` property that comes from `getSomeData()` will clobber the existing `user` property, which is likely not intended behaviour. 

To resolve, consumers of the API should either selectively pick values off the return value, or always do the spread first. 

```diff
-const userEnrichmentData = getSomeData(); 
+const {favouriteColor, favouriteAnimal} = getSomeData(); 
const enrichedUser = {
    ...user, 
-   ...userEnrichmentData 
+   favouriteColor, 
+   favouriteAnimal
}

```

or: 

```diff
const userEnrichmentData = getSomeData(); 

const enrichedUser = {
- ...user, 
- ...userEnrichmentData 
+ ...userEnrichmentData 
+ ...user, 
}
```