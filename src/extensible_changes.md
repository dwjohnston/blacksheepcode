


## When _requiring_ data (eg. request bodies, function parameters)

You can always: 

- Add new optional properties
- Widen existing properties
- Make existing mandatory properties optional.   
- Remove mandatory or optional properties

You can not: 

- Add new mandatory properties
- Narrow existing properties 


## When _returning_ data (eg. reponse bodies, function return values) 

You can always: 

- Add additional optional or mandatory properties 
- Make optional properties now mandatory 
- Narrow existing properties 

You can not: 

- Remove optional or mandatory properties 
- Widen existing properties 
- Make mandatory properties optional 