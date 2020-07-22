
// Import
const validame = require("../index");



validame.o.messages.en.upperAndLower = {
	upperAndLower: "It must have at least _%1 uppercase and _%2 lowercase characters",
};
validame.o.messages.es.upperAndLower = {
	upperAndLower: "Tiene que tener al menos _%1 mayúsculas y _%2 minúsculas",
};

validame.o.ruleToFnc.upperAndLower = (errorMessagesObj, stringToValidate, valueGiven) => {
	/*
		0: errorMessagesObj (object)
			- It's the same as validame.o.messages.<es/en>
			- With errorMessagesObj.wl.over18 you can get the specific errors of this symbol.
		1: stringToValidate (string) - The string you want to validate.
		2: valueGiven (any) - In this case we have an array of 2 numbers.
	*/
	
	let upper = new RegExp(`[A-Z]{${valueGiven[0]}}`).test(stringToValidate);
	let lower = new RegExp(`[a-z]{${valueGiven[1]}}`).test(stringToValidate);
	
	
	// With multilanguage
	if (!upper || !lower) return validame.u.multiReplace(errorMessagesObj.upperAndLower, {
		"_%1": valueGiven[0],
		"_%2": valueGiven[1],
	});
	
	
	// Without multilanguage
	// if (!upper || !lower) return `It must have at least ${valueGiven[0]} uppercase and ${valueGiven[1]} lowercase characters`;
	
	
	// All OK
	return "";
	
};



// And you can use it now:
let error1 = validame.v("mike", {
	upperAndLower: [1, 2],
});
console.log( "error1", error1 );

let error2 = validame.v("Mike", {
	upperAndLower: [1, 2],
});
console.log( "error2", error2 );
