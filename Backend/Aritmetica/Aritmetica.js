/* La clase `Aritmetica` en JavaScript representa una operación aritmética que se puede evaluar 
en un entorno dado. La clase tiene un constructor que recibe los operandos izquierdo y derecho, 
así como el operador a aplicar. El método `evaluar` se encarga de evaluar la operación utilizando 
los valores de los operandos en el entorno proporcionado, mientras que el método `resolverOperacion` 
realiza la operación aritmética correspondiente según el tipo de datos de los operandos y el operador 
especificado. */

class Aritmetica {
    constructor(izquierda, operador, derecha) {
        this.izquierda = izquierda;
        this.operador = operador;
        this.derecha = derecha;
    }

    /* El método `evaluar` de la clase `Aritmetica` se encarga de evaluar una operación aritmética utilizando
los operandos izquierdo y derecho en un entorno dado. Primero, evalúa ambos operandos utilizando el
método `evaluar` de cada uno, y luego llama al método `resolverOperacion` para realizar la operación
correspondiente según el operador especificado. El resultado de la operación se devuelve como un
objeto que contiene el valor resultante y su tipo. */
    evaluar(entorno) {
        const izq = this.izquierda.evaluar(entorno);
        const der = this.derecha.evaluar(entorno);
        if (!izq || !der) return null;
        return this.resolverOperacion(izq, der, this.operador);
    }

    /* El método `resolverOperacion` de la clase `Aritmetica` se encarga de realizar una operación aritmética
entre dos operandos, `izq` y `der`, utilizando un operador especificado por `op`. El método maneja
diferentes tipos de datos (como `int`, `float64`, `bool`, `string`, y `rune`) y realiza las operaciones
correspondientes según el tipo de los operandos y el operador. Por ejemplo, para la suma (`+`), si alguno 
de los operandos es una cadena (`string`), se realiza una concatenación. Para la multiplicación (`*`), 
si uno de los operandos es una cadena y el otro es un entero, se repite la cadena el número de veces 
indicado por el entero. El método también maneja conversiones entre tipos cuando sea necesario, y lanza 
errores para operaciones no válidas o tipos no soportados. El resultado de la operación se devuelve como 
un objeto que contiene el valor resultante y su tipo. */
    resolverOperacion(izq, der, op) {
        const t1 = izq.tipo;
        const t2 = der.tipo;
        /* CONVERSIONES */
        const toNumber = (val, tipo) => {
            switch (tipo) {
                case "int": return val;
                case "float64": return val;
                case "bool": return val ? 1 : 0;
                case "rune": return val.charCodeAt(0);
            }
        };
        /* SUMA */
        if (op === "+") {
            if (t1 === "string" || t2 === "string") {
                return {
                    valor: String(izq.valor) + String(der.valor),
                    tipo: "string"
                };
            }
            if (t1 === "float64" || t2 === "float64") {
                return {
                    valor: toNumber(izq.valor, t1) + toNumber(der.valor, t2),
                    tipo: "float64"
                };
            }
            if (t1 === "bool" && t2 === "bool") {
                return {
                    valor: izq.valor || der.valor,
                    tipo: "bool"
                };
            }
            return {
                valor: toNumber(izq.valor, t1) + toNumber(der.valor, t2),
                tipo: "int"
            };
        }
        /* RESTA */
        if (op === "-") {
            if (t1 === "string" || t2 === "string") {
                throw new Error(`Operación inválida: ${t1} - ${t2}`);
            }
            if (t1 === "bool" && t2 === "bool") {
                return {
                    valor: izq.valor || !der.valor,
                    tipo: "bool"
                };
            }
            if (t1 === "float64" || t2 === "float64") {
                return {
                    valor: toNumber(izq.valor, t1) - toNumber(der.valor, t2),
                    tipo: "float64"
                };
            }
            return {
                valor: toNumber(izq.valor, t1) - toNumber(der.valor, t2),
                tipo: "int"
            };
        }
        /*  MULTIPLICACIÓN */
        if (op === "*") {
            if (t1 === "int" && t2 === "string") {
                return {
                    valor: der.valor.repeat(izq.valor),
                    tipo: "string"
                };
            }
            if (t1 === "string" && t2 === "int") {
                return {
                    valor: izq.valor.repeat(der.valor),
                    tipo: "string"
                };
            }
            if (t1 === "string" || t2 === "string") {
                throw new Error(`Operación inválida: ${t1} * ${t2}`);
            }
            if (t1 === "bool" && t2 === "bool") {
                return {
                    valor: izq.valor && der.valor,
                    tipo: "bool"
                };
            }
            if (t1 === "float64" || t2 === "float64") {
                return {
                    valor: toNumber(izq.valor, t1) * toNumber(der.valor, t2),
                    tipo: "float64"
                };
            }
            return {
                valor: toNumber(izq.valor, t1) * toNumber(der.valor, t2),
                tipo: "int"
            };
        }
        /* DIVISIÓN */
        if (op === "/") {
            if (t1 === "string" || t2 === "string") {
                throw new Error(`Operación inválida: ${t1} / ${t2}`);
            }
            if (t1 === "int" && t2 === "int") {
                return {
                    valor: Math.floor(izq.valor / der.valor),
                    tipo: "int"
                };
            }
            return {
                valor: toNumber(izq.valor, t1) / toNumber(der.valor, t2),
                tipo: "float64"
            };
        }
        /* MOD */
        if (op === "%") {
            if (t1 === "int" && t2 === "int") {
                return {
                    valor: izq.valor % der.valor,
                    tipo: "int"
                };
            }
            throw new Error(`Operación inválida: ${t1} % ${t2}`);
        }
        throw new Error(`Operador no soportado: ${op}`);
    }
    
}


module.exports = Aritmetica;