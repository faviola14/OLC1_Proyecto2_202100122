class Aritmetica {
    constructor(izquierda, operador, derecha) {
        this.izquierda = izquierda;
        this.operador = operador;
        this.derecha = derecha;
    }

    evaluar(entorno) {
        const izq = this.izquierda.evaluar(entorno);
        const der = this.derecha.evaluar(entorno);
        if (!izq || !der) return null;
        return this.resolverOperacion(izq, der, this.operador);
    }

    resolverOperacion(izq, der, op) {
        const t1 = izq.tipo;
        const t2 = der.tipo;
        //console.log("IZQ:", izq);
        //console.log("DER:", der);
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