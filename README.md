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
const objSet = require("objDeepSet");
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

let newObj = objSet.v("wheels.3.damage.priority", 9);


```


<br>



# 🧭 Usage:

**Returns** ...


