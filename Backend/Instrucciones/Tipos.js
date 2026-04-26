/* Este código define una función llamada `obtenerTipo` que toma un valor como argumento y devuelve 
una cadena que representa el tipo de dato del valor. La función verifica si el valor es un booleano,
una cadena o un número, y devuelve 'bool', 'string', 'int' o 'float64' según corresponda. Si el tipo 
de dato no coincide con ninguno de los casos anteriores, la función devuelve 'unknown'. */
function obtenerTipo(valor) {
    if (typeof valor === 'boolean') return 'bool';
    if (typeof valor === 'string') return 'string';
    if (typeof valor === 'number') {
        return Number.isInteger(valor) ? 'int' : 'float64';
    }
    return 'unknown';
}

module.exports = { obtenerTipo };