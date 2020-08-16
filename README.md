<div style="text-align:center">
	<h1> objDeepSet </h1>
	<!-- <img src="https://i.gyazo.com/b4283bdaf6138e1f0b1e41755cb49a8a.png" /> -->
</div>



**objDeepSet** is a javascript **immutable object deep setter**.

- 🚀 Lightweight.
- ⚪️ Zero dependencies.
- 💫 Works great with Redux.



<br>



# ⬇️ Import

```js
const objDeepSet = require("objDeepSet");
```



<br>



# 🔮Basic examples:

```js

let car: {
	id: "V-1234-AB",
	color: "Black",
	wheels: {
		"1": {
			status: "ok"
		},
		"2". {
			status: "ok"
		}
		"3". {
			status: "damaged",
			damage: {
				priority: 10,
				description: "puncture",
				needsReparation: true
			}
		}
		"4". {
			status: "ok"
		}
	}
}

let newObj = objDeepSet("wheels.3.damage.priority", 9);


```


<br>



# 🧭 Usage:

```js

objDeepSet(object, key, value, options);

```

- **object** (object)
	The original object you want to modify. It will be cloned internally unless you set "mutate: true" on options.
- **key** (string | array)
	Key that will be modified. Examples:
	- "user"
	- "user.name"
	- ["user", "name"]
	- "" (this will point to the root of the object)
- **options** (object)
	- merge (boolean)
		Default false. Merge (true) or replace (false) the object with the value.
	- mutate (boolean)
		Default false. Mutate (true) or clone (false) the original object.


**Returns** The new or modified object.



<br>



# 🧭 Advanced examples:

```js


let dog = {
	name: "Woof",
	color: "brown",
	age: 5,
	legs: {
		"topLeft": "ok",
		"topRight": "ok",
		"bottomLeft": "ok",
		"bottomRight": "ok",
	}
};



let newDog = objDeepSet(dog, "legs.bottomLeft", "injury");
/*
OUTPUT: 

	{
		name: 'Woof',
		color: 'brown',
		age: 5,
		legs: {
			topLeft: 'ok',
			topRight: 'ok',
			bottomLeft: 'injury',
			bottomRight: 'ok'
		}
	}
*/



let newDog2 = objDeepSet(dog, "", {
	name: "Mike",
	color: "red",
});
/*
OUTPUT: 

	{
		name: 'Mike',
		color: 'red',
	}
*/



let newDog3 = objDeepSet(dog, "legs.bottomLeft", {
	feathers: 1564,
	wings: {
		left: 'ok',
		right: 'ok',
	}
});
console.log( newDog3 );
/*
OUTPUT: 

	{
		name: 'Woof',
		color: 'brown',
		age: 5,
		legs: {
			topLeft: 'ok',
			topRight: 'ok',
			bottomLeft: { feathers: 1564, wings: [Object] },
			bottomRight: 'ok'
		}
	}

*/


```



<br>



# 🌌 Redux implementation:

your_reducer.js
```js


const userReducer = (
	state = {},
	action
) => {
	
	switch (action.type) {
		
		case "USER_SET": {
			
			const {merge = true} = action.options ?? {};
			
			let newstate = objSet(state, action.key, action.value, {
				merge,
			});
			
			return newstate;
		};
		
		default: return state;
		
	};
		

```


How you dispatch that action
```js

// Login example
dispatch({type: "USER_SET", key: "username", value: "Mike"});

// Logout example
dispatch({type: "USER_SET", key: "", value: {}, options: {merge: false} });

```
