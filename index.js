
/**
 * Returns a modified object without mutating the original one.
 * ___
 * 
 * @param {Object} obj - Original object. It will not be mutated.
 * @param {String | Array} key Key to be modified. Ejemplos: 
 * 
 * - "user"
 * - "user.name"
 * - ["user", "name"]
 * 
 * @param {*} value - Value to be assigned to the specified key.
 * @param {Object} options Options:  
 * 
 * - merge (bool): Specifies if the new value gets merged with the old one, otherwise it will overwrite it. Default false.
 * - mutate (bool): Specifies if the original object is mutated. Default true.
 * 
 * ___
 * @returns {Object} New modified object.
 * 
*/

module.exports = (obj, key, value, options = {
	merge: false,
	mutate: true,
}) => {
	
	let arrKeys;
	
	if (typeof key === "string") arrKeys = key.split("."); // si me viene "user.name" → ["user", "name"]
	if (Array.isArray(key)) arrKeys = [...key]; // si me viene array, lo clono
	
	
	if (!arrKeys) return new Error("Key debe ser del tipo string o array.");
	
	
	
	// Saco la última key y la guardo
	let lastKey = arrKeys.pop();
	
	
	// Itero por las keys
	let newObj = options.mutate ? obj : {...obj }; // clono (o no) el objeto original
	let ref = newObj;
	
	arrKeys.map(_x => {
		
		if (!ref[_x]) ref[_x] = {}; // si la referencia no contiene esa key, la creo como vacia
		ref = ref[_x]; // cambio la refencia, a una más profunda
		
	});
	
	
	
	// Aviso de corrupción de datos
	let oldValue = ref[lastKey];
	
	if (
		typeof value !== typeof oldValue &&
		(
			typeof oldValue !== "undefined" ||
			oldValue === null
		)
	) {
		console.error(`
			[objSet] ¡CUIDADO! el valor original y el nuevo son de tipos diferentes.
			Key → ${key}
			Valor antiguo → ${JSON.stringify(oldValue)}
			Valor nuevo → ${JSON.stringify(value, null, 4)}
		`);
	};
	
	
	// Si es obj hago spread para mergear ambos objetos
	if (options.merge && typeof value === "object") { 
		ref[lastKey] = {...ref[lastKey], ...value};
	
	// Si es array hago spread para mergear ambos arrays
	} else if (options.merge && typeof value === "array") {  // TODO sin testear
		ref[lastKey] = [...ref[lastKey], ...value];
	
	// Establezco valor normalmente
	} else { 
		ref[lastKey] = value;
	};
	
	
	return newObj;

};



/*
	// Ejemplo 1:

	let obj = {
		a: "soy a",
		b: {
			"c1": "soy c1",
			"c2": {
				"d1": "soy d1"
			}
		}
		
	};
	
	let newObj = objSet(obj, "b.c1", "BIEEEEN");
	
	
	// valor newObj:
	{
		a: 'soy a',
		b: {
			c1: 'BIEEEEN',
			c2: {
				d1: 'soy d1'
			}
		}
	}
	
*/

/*
	// Ejemplo 2:

	let fGas = {};
	
	
	let newObj = objSet(fGas, "direccionSuministro.tipo", "cups");
	
	newObj = objSet(newObj, "direccionSuministro", {
		nombre: "Pepe", 
		apellido: "Gomez"
	}, {
		merge: false
	});
	
	newObj = objSet(newObj, "direccionSuministro.apellido", "Martínez");
	
	
	// valor newObj:
	{
		direccionSuministro: {
			tipo: 'cups',
			nombre: 'Pepe',
			apellido: 'Martínez'
		}
	}
*/	

/*
	// Ejemplo 3:
	//! ¡Cuidado!
	// Si una propiedad inicialmente NO es un objeto, y se le asigna un objeto como nuevo valor
	// se hará spread de ambos ocurriendo lo siguiente:
	
	let fGas = {
		datos: "hola",
	};
	
	
	let newObj = objSet(fGas, "datos", {
		nombre: "Pepe", 
		apellido: "Gomez"
	});
	
	
	// valor newObj:
	{
		datos: {
			'0': 'h',
			'1': 'o',
			'2': 'l',
			'3': 'a',
			nombre: 'Pepe',
			apellido: 'Gomez'
		}
	}
*/


