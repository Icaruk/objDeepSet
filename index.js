
const _set = (options, ref, value) => {
	
	if (options.merge && value !== null && typeof value === "object") { 
		ref = {...ref, ...value};

	// Si es array hago spread para mergear ambos arrays
	} else if (options.merge && Array.isArray(value)) {  // TODO sin testear
		ref = [...ref, ...value];

	// Establezco valor normalmente
	} else {
		ref = value;
		
	};
	
	
	return ref;
	
};



/**
 * Returns a modified object with or without mutating the original one.
 * ___
 * 
 * @param {object} obj - Original object.
 * @param {string | array} key Key that will be modified. Examples: 
 * 
 * - "user"
 * - "user.name"
 * - ["user", "name"]
 * - "" (this will point to the root of the object)
 * 
 * @param {*} value - Value that will be assigned to the specified key.
 * @param {object} [options] - Options
 * @param {boolean} [options.merge=false] - Default false. Merge (true) or replace (false) the object with the value.
 * @param {boolean} [options.mutate=false] - Default false. Mutate (true) or clone (false) of the original object.
 * 
 * ___
 * 
 * @returns {object} New object.
 * 
*/

const objSet = (obj, key, value, options = {
	merge: false,
	mutate: false,
}) => {
	
	// Proceso keys
	let arrKeys;
	
	if (typeof key === "string") arrKeys = key.split("."); // si me viene "user.name" → ["user", "name"]
	if (Array.isArray(key)) arrKeys = [...key]; // si me viene array, lo clono
	
	
	
	// Compruebo errores
	if (!arrKeys) return new Error("'Key' must be string or array.");
	
	const bl = ["constructor", "__proto__"];
	if (arrKeys.some( _x => bl.includes(_x) )) return new Error("Error: 'constructor' and '__proto__' are not valid keys.");	
	
	
	
	// Saco la última key y la guardo
	let lastKey = arrKeys.pop();
	
	
	// Itero por las keys
	let newObj = options.mutate ? obj : { ...obj }; // clono (o no) el objeto original
	let ref = newObj;
	
	
	
	// Muevo la referencia del objeto hacia la profundidad indicada
	arrKeys.forEach(_x => {
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
		// console.error(`[objSet] ¡CUIDADO! el valor original y el nuevo son de tipos diferentes. \nKey → ${key} \nValor antiguo → ${JSON.stringify(oldValue)} \nValor nuevo → ${JSON.stringify(value, null, 4)}`);
	};
	
	
	// let finalRef = (lastKey === "") ? ref = newObj : ref[lastKey];
	
	if (lastKey === "") {
		return _set(options, newObj, value);
	};
	
	
	
	// Si es obj hago spread para mergear ambos objetos
	if (options.merge && value !== null && typeof value === "object") { 
		ref[lastKey] = {...ref[lastKey], ...value};
	
	// Si es array hago spread para mergear ambos arrays
	} else if (options.merge && Array.isArray(value)) {  // TODO sin testear
		ref[lastKey] = [...ref[lastKey], ...value];
	
	// Establezco valor normalmente
	} else {
		ref[lastKey] = value;
		
	};
	
	
	return newObj;
	
};

module.exports = objSet;

