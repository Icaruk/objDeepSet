
// Import
const validame = require("../index");


// Adding my custom symbol
validame.o.symbolToFnc.startWithVowel = /^[aeiou]+.*/i;
validame.o.messages.en.wl.startWithVowel = "initial vowel";
validame.o.messages.es.wl.startWithVowel = "vocal inicial";

validame.o.symbolToFnc.over18 = (errorMessagesObj, stringToValidate) => {
	/*
		0: errorMessagesObj (object)
			- It's the same as validame.o.messages.<es/en>
			- With errorMessagesObj.wl.over18 you can get the specific errors of this symbol.
		1: stringToValidate (string) - The string you want to validate.
	*/
	
	// Check if it's a number
	let age = parseInt(stringToValidate);
	if (isNaN(age)) return "It must be a number";
	// if (isNaN(age)) return errorMessagesObj.wl.over18.mustBeANumber; // for multilanguage
	
	
	// Check if it's over 18
	if (age < 18) return "It must be over 18";
	// if (age < 18) return errorMessagesObj.wl.over18.over18; // for multilanguage
	
	
	// All OK
	return "";
	
};



let error1 = validame.v("19", {
	wl: "over18",
});
console.log( "error1: ", error1 );

let error2 = validame.v("17", {
	wl: "over18",
});
console.log( "error2: ", error2 );
