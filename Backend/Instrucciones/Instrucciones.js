const Entorno = require("../Instrucciones/Entorno");
const Tipos = require("../Instrucciones/Tipos");

class Declaracion {
    constructor(id, tipo, valor) {
        this.id = id;
        this.tipo = tipo;
        this.valor = valor;
    }
    evaluar(entorno) {
        if (entorno.existeLocal(this.id)) {
            throw new Error(`La variable ${this.id} ya ha sido declarada.`);
        }
        let valorEvaluado;
        if (this.valor) {
            const resultado = this.valor.evaluar(entorno);
            valorEvaluado = resultado.valor;
        } else {
            switch (this.tipo) {
            case 'int':
                valorEvaluado = 0;
                break;
            case 'float64':
                valorEvaluado = 0.0;
                break;
            case 'bool':
                valorEvaluado = false;
                break;
            case 'string':
                valorEvaluado = "";
                break;
            case 'rune':
                valorEvaluado = 0;
                break;
            default:
                valorEvaluado = null;
            }
        }
        if (this.tipo === "") {
            this.tipo = Tipos.obtenerTipo(valorEvaluado);
        }
        //console.log("tipo: ",this.tipo, "valor: ", valorEvaluado)
        entorno.declarar(this.id, { tipo: this.tipo, valor: valorEvaluado });
        return null;
    }
}

class Asignacion {
    constructor(id, valor) {
        this.id = id;
        this.valor = valor;
    }
    evaluar(entorno) {
        const variable = entorno.obtener(this.id);
        const resultado = this.valor.evaluar(entorno); 
        //console.log(this.valor);
        if (!resultado) {
            throw new Error("La expresión no devolvió ningún valor");
        }
        const tipoNuevo = resultado.tipo;
        const nuevoValor = resultado.valor;
        /*console.log("Variable:", variable);
        console.log("Resultado:", resultado);
        console.log("Variable tipo:", variable.tipo);
        console.log("Valor tipo:", tipoNuevo);
        console.log("Valor:", nuevoValor);*/
        if (variable.tipo === 'float64' && tipoNuevo === 'int') {
            entorno.asignar(this.id, {
                tipo: 'float64',
                valor: nuevoValor
            });
            return;
        }
        if (variable.tipo !== tipoNuevo) {
            throw new Error(
                `No se puede asignar un valor de tipo ${tipoNuevo} a ${variable.tipo}`
            );
        }
        entorno.asignar(this.id, {
            tipo: variable.tipo,
            valor: nuevoValor
        });
        return null;
    }
}

class Imprimir {
    constructor(expresiones) {
        this.expresiones = expresiones;
    }
    evaluar(entorno) {
        //console.log("IMPRIMIENDO");
        const valores = this.expresiones
            .map(exp => exp.evaluar(entorno))
            .filter(v => v !== null && v !== undefined)
            .map(v => v.valor);
        console.log(...valores);
        return null;
        //console.log("IMPRIMIENDO...");
        try {
            const valores = this.expresiones.map(exp => {
                if (!exp) {
                    //console.log("EXPRESION NULL FALLA");
                    return null;
                }
                return exp.evaluar(entorno);
            });
            //console.log("VALORES:", valores);
            //console.log(...valores);
        } catch (e) {
            console.error("ERROR EN PRINT:", e);
        }
        return null;
    }
}

class If { 
    constructor(condicion, instrucciones) {
        this.condicion = condicion;
        this.instrucciones = instrucciones;
    }
    evaluar(entorno) {
        const cond = this.condicion.evaluar(entorno);
    if (cond) {
        this.instrucciones.forEach(i => i.evaluar(entorno));
    }
}
}
class ElseIf {
    constructor(condicion, instrucciones) {
        this.condicion = condicion;
        this.instrucciones = instrucciones;
    }
    evaluar(entorno) {
        const cond = this.condicion.evaluar(entorno);
        if (cond) {
            this.instrucciones.forEach(i => i.evaluar(entorno));
            return true; 
        }
        return false;
    }
}


class Else {
    constructor(instrucciones) {
        this.instrucciones = instrucciones;
    }
    evaluar(entorno) {
        for (let i = 0; i < this.instrucciones.length; i++) {
            const instruccion = this.instrucciones[i];
            instruccion.evaluar(entorno);
        }
        return null;
    }
}
class IfElseIf{
    constructor(ifNode, elseIfNode, elseNode) {
        this.ifNode = ifNode;
        this.elseIfNode = elseIfNode;
        this.elseNode = elseNode;
    }
    evaluar(entorno) {
        if (this.ifNode) {
            const cond = this.ifNode.condicion.evaluar(entorno);
            if (cond) {
                this.ifNode.instrucciones.forEach(i => i.evaluar(entorno));
                return;
            }
        }
        if (this.elseIfNode) {
            const cond2 = this.elseIfNode.condicion.evaluar(entorno);
            if (cond2) {
                this.elseIfNode.instrucciones.forEach(i => i.evaluar(entorno));
                return;
            }
        }
    }
}
class IfElse{
    constructor( instruccionesIf, instruccionesElse) {
        this.ifNode = instruccionesIf;
        this.elseNode = instruccionesElse;
    }
    evaluar(entorno) {
        if (this.ifNode) {
            const cond = this.ifNode.condicion.evaluar(entorno);
            if (cond) {
                
                this.ifNode.instrucciones.forEach(i => i.evaluar(entorno));
                return;
            }
        }
        if (this.elseNode) {
            this.elseNode.instrucciones.forEach(i => i.evaluar(entorno));
        }
    
    }
}

class IfCompleto {
    constructor(ifNode, elseIfNode, elseNode) {
        this.ifNode = ifNode;
        this.elseIfNode = elseIfNode ;
        this.elseNode = elseNode;
    }
    evaluar(entorno) {
        if (this.ifNode) {
            const cond = this.ifNode.condicion.evaluar(entorno);
            if (cond) {
                this.ifNode.instrucciones.forEach(i => i.evaluar(entorno));
                return;
            }
        }
        if (this.elseIfNode) {
            const cond = this.elseIfNode.condicion.evaluar(entorno);
            if (cond) {
                this.elseIfNode.instrucciones.forEach(i => i.evaluar(entorno));
                return;
            }
        }
        if (this.elseNode) {
            this.elseNode.instrucciones.forEach(i => i.evaluar(entorno));
        }
    }
}


class For {
    constructor(init, condicion, incremento, instrucciones) {
        this.init = init;         
        this.condicion = condicion;
        this.incremento = incremento; 
        this.instrucciones = instrucciones;
    }
    evaluar(entorno) {
        if (this.init) {
            this.init.evaluar(entorno);
        }
        //console.log(this.condicion);
        //console.log(this.condicion.evaluar(entorno).valor);
        //console.log(this.condicion.evaluar(entorno));
        while (this.condicion ? this.condicion.evaluar(entorno).valor : true) {
            for (let instr of this.instrucciones) {
                const res = instr.evaluar(entorno);
                if (res === 'break') return;
                if (res === 'continue') break;
            }
            if (this.incremento) {
                this.incremento.evaluar(entorno);
            }
        }
    }
}

class ForRange {
    constructor(indice, valor, iterable, instrucciones) {
        this.indice = indice;
        this.valor = valor;
        this.iterable = iterable;
        this.instrucciones = instrucciones;
    }
    evaluar(entorno) {
        const iterable = this.iterable.evaluar(entorno);
        if (!Array.isArray(iterable)) {
            throw new Error("El iterable en for-range no es un arreglo");
        }
        const nombreIndice = this.indice.valor;
        let nombreValor;
        if (this.valor.valor) {
            nombreValor = this.valor.valor;
        } else if (this.valor.id) {
            nombreValor = this.valor.id;
        } else {
            throw new Error("Identificador de valor inválido en for-range");
        }
        for (let i = 0; i < iterable.length; i++) {
            const nuevoEntorno = new Entorno(entorno);
            nuevoEntorno.declarar(nombreIndice, {
                tipo: 'int',
                valor: i
            });
            nuevoEntorno.declarar(nombreValor, {
                tipo: 'int',
                valor: iterable[i]
            });
            for (let instr of this.instrucciones) {
                const res = instr.evaluar(nuevoEntorno);
                if (res === 'break') return;
                if (res === 'continue') break;
            }
        }
        return null;
    }
}

class Switch {
    constructor(expresion, cases, defaultCase = null) {
        this.expresion = expresion;
        this.casos = cases;
        this.defaultCase = defaultCase;
    }

    evaluar(entorno) {
        if (!this.expresion) {
            throw new Error("Switch sin expresión");
        }
        const valorEvaluado = this.expresion.evaluar(entorno).valor;
        let casoEncontrado = false;
        for (let i = 0; i < this.casos.length; i++) {
            const caso = this.casos[i];
            const valorCaso = caso.valor.evaluar(entorno).valor;
            if (valorEvaluado === valorCaso) {
                casoEncontrado = true;
                for (let j = 0; j < caso.instrucciones.length; j++) {
                    caso.instrucciones[j].evaluar(entorno);
                }
                break;
            }
        }
        if (!casoEncontrado && this.defaultCase) {
            for (let i = 0; i < this.defaultCase.instrucciones.length; i++) {
                this.defaultCase.instrucciones[i].evaluar(entorno);
            }
        }
        return null;
    }
}

class Slice{
    constructor(id, tipo, valor){
        this.id = id;
        this.tipo = tipo;
        this.valor = valor;
    }
    evaluar(entorno){
        if (entorno.existeLocal(this.id)) {
            throw new Error(`La variable ${this.id} ya ha sido declarada.`);
        }
        const valorEvaluado = this.valor
        ? this.valor.map(v => {
            const res = v.evaluar(entorno);
            return res.valor;   
        })
        : [];
        entorno.declarar(this.id, {
            tipo: this.tipo,
            valor: valorEvaluado
        });
        return null;
    }
}

class Struct{
    constructor(id, tipoDato, valor){
        this.id = id;
        this.tipoDato =tipoDato;
        this.valor = valor;
}
    evaluar(entorno) {
        /*console.log("VALOR STRUCT:", this.valor);
        console.log("TIPO:", typeof this.valor);
        console.log("STRUCT ATRIBUTOS:", this.valor);*/
        const nombre = this.id.valor;
        if (entorno.existeLocal(nombre)) {
            throw new Error(`El struct ${nombre} ya existe.`);
        }
        const atributos = {};
        for (let attr of this.valor) {
            if (!attr || !attr.id || !attr.tipo) {
                throw new Error("Atributo inválido en definición de struct");
            }
            const nombreAttr = attr.id.valor || attr.id;
            const tipoAttr = attr.tipo;
            atributos[nombreAttr] = tipoAttr;
        }
        entorno.declarar(nombre, {
            tipo: 'struct',
            atributos: atributos
        });
        return null;
    }
}

class Matriz{
    constructor(id, tipo, valor){
        this.id = id;
        this.tipo = tipo;
        this.valor = valor; 
    }
    evaluar(entorno){
        if (entorno.existe(this.id)) {
            throw new Error(`La variable ${this.id} ya ha sido declarada.`);
        }
        const valorEvaluado = this.valor;
        entorno.declarar(this.id, { tipo: this.tipo, valor: valorEvaluado });
        return null;
    }
}

class Funcion{
    constructor(id, parametros,  retorno, instrucciones){
        this.id = id;
        this.parametros = parametros;
        this.instrucciones = instrucciones;
        this.retorno = retorno;
    }
    evaluar(entorno){
        if (entorno.existe(this.id)) {
            throw new Error(`La función ${this.id} ya ha sido declarada.`);
        }
        entorno.declarar(this.id, { tipo: 'Función', valor: this });
        return null;
    }
}

class Programa {
    constructor(funciones, instrucciones) {
        this.funciones = funciones;
        this.instrucciones = instrucciones;
    }
    evaluar(entorno) {
        this.funciones.forEach(f => f.evaluar(entorno));
        this.instrucciones.forEach(inst => inst.evaluar(entorno));
        const main = entorno.obtener("main");
        if (main && main.tipo === "Función") {
            const funcion = main.valor;
            const nuevoEntorno = new Entorno(entorno);
            for (let instr of funcion.instrucciones) {
                instr.evaluar(nuevoEntorno);
            }
        }
    }
}


class Return{
    constructor(valor){
        this.valor = valor;
    }
    evaluar(entorno){
        const valorEvaluado = this.valor.evaluar(entorno);
        return valorEvaluado;
    }
}
class Break{
    evaluar(entorno){
        return 'break';
    }
}

class Continue{
    evaluar(entorno) {
        return 'continue';
    }
}   

class Mento{
    constructor(id, operador,cantidad){
        this.id = id;
        this.operador = operador;
        this.cantidad = cantidad;
    }
    evaluar(entorno) {
        const id = this.id.id || this.id;
        const variable = entorno.obtener(id);
        if (!variable) {
            throw new Error(`La variable ${id} no ha sido declarada.`);
        }
        let nuevoValor = variable.valor;
        if (this.operador === '++') {
            //console.log("VALOR ACTUAL: ",variable.valor)
            nuevoValor = variable.valor + this.cantidad;
        } else if (this.operador === '--') {
            nuevoValor = variable.valor - this.cantidad;
        }
        entorno.asignar(id, {
            tipo: variable.tipo,
            valor: nuevoValor
        });
    }
}

class BloqueIndependiente {
    constructor(instrucciones) {
        this.instrucciones = instrucciones;
    }
    evaluar(entorno) {
        for (let i = 0; i < this.instrucciones.length; i++) {
            const instruccion = this.instrucciones[i];
            instruccion.evaluar(entorno);
        }
        return null;
    }
}   
class Cases{
    constructor(valor, instrucciones){
        this.valor = valor;
        this.instrucciones = instrucciones;
    }
    evaluar(entorno) {
        for (let i = 0; i < this.instrucciones.length; i++) {
            const instruccion = this.instrucciones[i];
            instruccion.evaluar(entorno);
        }
        return null;
    }
}

class Default {
    constructor(instrucciones) {
        this.instrucciones = instrucciones;
    }
    evaluar(entorno) {
        for (let i = 0; i < this.instrucciones.length; i++) {
            const instruccion = this.instrucciones[i];
            instruccion.evaluar(entorno);
        }
        return null;
    }
}

class Inicializacion {
    constructor(id, valor) {
        this.id = id;
        this.valor = valor;
    }
    evaluar(entorno) {
        const resultado = this.valor.evaluar(entorno);
        entorno.declarar(this.id.valor, { tipo: resultado.tipo, valor: resultado.valor });
    }
}

class Index{
    constructor(id, valor){
        this.id = id;
        this.valor = valor;
    }
    evaluar(entorno) {
        const nombre = this.id.valor;
        const variable = entorno.obtener(nombre);
        if (!variable) {
            throw new Error(`La variable ${nombre} no ha sido declarada.`);
        }
        if (!Array.isArray(variable.valor)) {
            throw new Error(`La variable ${nombre} no es un slice.`);
        }
        let valorEvaluado = this.valor;
        if (this.valor && typeof this.valor.evaluar === "function") {
            valorEvaluado = this.valor.evaluar(entorno);
        }
        const valorBuscado = (valorEvaluado && typeof valorEvaluado === "object")
            ? valorEvaluado.valor
            : valorEvaluado;
        const indice = variable.valor.indexOf(valorBuscado);
        return {
            tipo: 'int',
            valor: indice
        };
    }
}

class Join{
    constructor(id, valor){
        this.expresiones = expresiones;
    }
    evaluar(entorno) {
        const valores = this.expresiones.map(exp => exp.evaluar(entorno));
        return valores.join(' ');
    }
}

class Len{
    constructor(id){
        this.id = id;
    }
    evaluar(entorno) {
        const nombre = this.id.valor;
        const variable = entorno.obtener(nombre);
        if (!variable) {
            throw new Error(`La variable ${nombre} no ha sido declarada.`);
        }
        if (!Array.isArray(variable.valor)) {
            throw new Error(`La variable ${nombre} no es un slice o matriz.`);
        }
        return {
            tipo: 'int',
            valor: variable.valor.length
        };
    }

}

class Append{
    constructor(id, slice, valor){
        this.id = id;
        this.slice = slice;
        this.valor = valor;
    }
    evaluar(entorno) {
        //console.log(this.valor);
        const nombre = this.id.valor;
        const variable = entorno.obtener(nombre);
        if (!variable || !Array.isArray(variable.valor)) {
            throw new Error(`La variable ${nombre} no es un slice.`);
        }
        let nuevoElemento;
        if (this.valor && typeof this.valor.evaluar === "function") {
            const res = this.valor.evaluar(entorno);
            nuevoElemento = res.valor;
        } else {
            nuevoElemento = this.valor;
        }
        variable.valor.push(nuevoElemento.valor);
        entorno.asignar(nombre, variable);
        return null;
    }
}

class AccesoSlice{
    constructor(id, posicion){
        this.id = id;
        this.posicion = posicion;
    }
    evaluar(entorno) {
        const nombre = this.id.valor || this.id.id || this.id;
        const variable = entorno.obtener(nombre);
        if (!variable) {
            throw new Error(`La variable ${nombre} no ha sido declarada.`);
        }
        if (!Array.isArray(variable.valor)) {
            throw new Error(`La variable ${nombre} no es un slice.`);
        }
        
        const indiceEvaluado = obtenerValor(this.posicion, entorno);
        //console.log("indice evaluado: ",indiceEvaluado)
        if (indiceEvaluado < 0 || indiceEvaluado >= variable.valor.length) {
            throw new Error(`Índice fuera de rango para ${nombre}`);
        }
        return {
            tipo: 'int',
            valor: variable.valor[indiceEvaluado]
        };
    }
}

class ModificacionSlice{
    constructor(id, posicion, valor) {
    this.id = id;
    this.posicion = posicion;
    this.valor = valor;
}
    evaluar(entorno) {
        const variable = entorno.obtener(this.id);
        if (!variable) {
            throw new Error(`La variable ${this.id} no ha sido declarada.`);
        }
        if (variable.tipo !== 'Slice') {
            throw new Error(`La variable ${this.id} no es un slice.`);
        }
        const indiceEvaluado = this.posicion.evaluar(entorno);
        if (indiceEvaluado < 0 || indiceEvaluado >= variable.valor.length) {
            throw new Error(`Índice fuera de rango para el slice ${this.id}.`);
        }
        const valorEvaluado = this.valor.evaluar(entorno);
        variable.valor[indiceEvaluado] = valorEvaluado;
        entorno.asignar(this.id, variable);
        return null;
    }
}

class AsignacionMatriz{
    constructor(id, fila, columna, valor){
        this.id = id;
        this.fila = fila;
        this.columna = columna;
        this.valor = valor;
    }
    evaluar(entorno) {
        const variable = entorno.obtener(this.id);
        if (!variable) {
            throw new Error(`La variable ${this.id} no ha sido declarada.`);
        }
        if (variable.tipo !== 'Matriz') {
            throw new Error(`La variable ${this.id} no es una matriz.`);
        }
        const filaEvaluada = this.fila.evaluar(entorno);
        const columnaEvaluada = this.columna.evaluar(entorno);
        if (filaEvaluada < 0 || filaEvaluada >= variable.valor.length || columnaEvaluada < 0 || columnaEvaluada >= variable.valor[0].length) {
            throw new Error(`Índice fuera de rango para la matriz ${this.id}.`);
        }
        const valorEvaluado = this.valor.evaluar(entorno);
        variable.valor[filaEvaluada][columnaEvaluada] = valorEvaluado;
        entorno.asignar(this.id, variable);
        return null;
    }
}

class AccesoMatriz{
    constructor(id, fila, columna){
        this.id = id;
        this.fila = fila;
        this.columna = columna;
    }
    evaluar(entorno) {
        const variable = entorno.obtener(this.id);
        if (!variable) {
            throw new Error(`La variable ${this.id} no ha sido declarada.`);
        }
        if (variable.tipo !== 'Matriz') {
            throw new Error(`La variable ${this.id} no es una matriz.`);
        }
        const filaEvaluada = this.fila.evaluar(entorno);
        const columnaEvaluada = this.columna.evaluar(entorno);
        if (filaEvaluada < 0 || filaEvaluada >= variable.valor.length || columnaEvaluada < 0 || columnaEvaluada >= variable.valor[0].length) {
            throw new Error(`Índice fuera de rango para la matriz ${this.id}.`);
        }
        return variable.valor[filaEvaluada][columnaEvaluada];
    }
}

class UsoStruct{
    constructor(tipoStruct, id, valor) {
        this.tipoStruct = tipoStruct; 
        this.id = id;                
        this.valor = valor;           
    }
    evaluar(entorno) {
        const nombreStruct = this.tipoStruct.valor;
        const nombreVar = this.id.valor;
        const structDef = entorno.obtener(nombreStruct);
        if (!structDef || structDef.tipo !== 'struct') {
            throw new Error(`El struct ${nombreStruct} no existe`);
        }
        const atributosDef = structDef.atributos;
        const nuevoStruct = {};
        for (let attr of this.valor) {
            if (!attr || !attr.id) {
                throw new Error("Atributo inválido en struct");
            }
            const nombreAttr = attr.id.valor || attr.id;
            if (!(nombreAttr in atributosDef)) {
                throw new Error(`El atributo ${nombreAttr} no existe en ${nombreStruct}`);
            }
            let resultado;
            if (attr.valor && typeof attr.valor.evaluar === "function") {
                resultado = attr.valor.evaluar(entorno);
            } else if (attr.valor && attr.valor.tipo !== undefined) {
                resultado = attr.valor;
            } else {
                resultado = {
                    tipo: typeof attr.valor,
                    valor: attr.valor
                };
            }
            const tipoEsperado = atributosDef[nombreAttr];
            const tipoRecibido = resultado.tipo;
            if (tipoEsperado !== tipoRecibido) {
                throw new Error(
                    `Tipo incorrecto en atributo ${nombreAttr}: se esperaba ${tipoEsperado} y se recibió ${tipoRecibido}`
                );
            }
            nuevoStruct[nombreAttr] = resultado.valor;
        }
        for (let attrDef in atributosDef) {
            if (!(attrDef in nuevoStruct)) {
                throw new Error(`Falta el atributo ${attrDef} en ${nombreStruct}`);
            }
        }
        entorno.declarar(nombreVar, {
            tipo: nombreStruct,
            valor: nuevoStruct
        });
        return null;
    }
}

class AccesoStruct{
    constructor(id, atributo){
        this.id = id;
        this.atributo = atributo;
    }
    evaluar(entorno) {
        const variable = entorno.obtener(this.id.valor);
        if (!variable) {
            throw new Error(`La variable ${this.id} no ha sido declarada.`);
        }
        if (variable.tipo !== 'Struct') {
            throw new Error(`La variable ${this.id} no es un struct.`);
        }
        const atributo = this.atributo.valor;
        if (atributo === undefined) {
            throw new Error(`El atributo ${this.atributo} no existe en el struct ${this.id}.`);
        }
        return variable.valor[atributo];
    }
}

class ModificacionStruct{
    constructor(id, atributo, valor){
        this.id = id;
        this.atributo = atributo;
        this.valor = valor;
    }
    evaluar(entorno) {
        const variable = entorno.obtener(this.id.id.valor);
        if (!variable) {
            throw new Error(`La variable ${this.id} no ha sido declarada.`);
        }
        if (variable.tipo !== 'Struct') {
            throw new Error(`La variable ${this.id} no es un struct.`);
        }
        const atributo = this.id.atributo.valor;
        variable.valor[atributo] = this.valor.evaluar(entorno);
        entorno.asignar(this.id, variable);
        return null;
    }
}
class Atoi{
    constructor(valor){
        this.valor = valor;
    }
    evaluar(entorno) {
        const valorEvaluado = this.valor.evaluar(entorno);
        const numero = parseInt(valorEvaluado, 10);
        if (isNaN(numero)) {
            throw new Error(`El valor ${valorEvaluado} no se puede convertir a entero.`);
        }
        return numero;
    }
}
    
class ParseFloat{
    constructor(valor){
        this.valor = valor;
    }
    evaluar(entorno) {
        const valorEvaluado = this.valor.evaluar(entorno);
        const numero = parseFloat(valorEvaluado);
        if (isNaN(numero)) {
            throw new Error(`El valor ${valorEvaluado} no se puede convertir a float.`);
        }
        return numero;
    }
}

class TypeOf{
    constructor(id, valor){
        this.id = id;
        this.valor = valor;
    }
    evaluar(entorno) {
        const variable = entorno.obtener(this.id);
        if (!variable) {
            throw new Error(`La variable ${this.id} no ha sido declarada.`);
        }
        return typeof variable.valor;
    }
}
    
class AccesoFuncion{
    constructor(id, argumentos){
        this.id = id;
        this.argumentos = argumentos;
    }
    evaluar(entorno) {
        const variable = entorno.obtener(this.id.valor);
        if (!variable) {
            throw new Error(`La variable ${this.id} no ha sido declarada.`);
        }
        if (variable.tipo !== 'Función') {
            throw new Error(`La variable ${this.id} no es una función.`);
        }
        const funcion = variable.valor;
        if (this.argumentos.length !== funcion.parametros.length) {
            throw new Error(`La función ${this.id} espera ${funcion.parametros.length} argumentos, pero se proporcionaron ${this.argumentos.length}.`);
        }
        const nuevoEntorno = new Entorno(entorno);
        for (let i = 0; i < this.argumentos.length; i++) {
            const argValor = this.argumentos[i].evaluar(entorno);
            nuevoEntorno.declarar(funcion.parametros[i].id, { tipo: funcion.parametros[i].tipoDato, valor: argValor.valor });
        }
        let resultado = null;
        for (let i = 0; i < funcion.instrucciones.length; i++) {
            const instruccion = funcion.instrucciones[i];
            const evalInstruccion = instruccion.evaluar(nuevoEntorno);
            if (evalInstruccion !== null && evalInstruccion !== undefined) {
                resultado = evalInstruccion;
                break;
            }
        }
        return resultado;
    }
}

function obtenerValor(obj, entorno) {
    if (obj && typeof obj.evaluar === "function") {
        const res = obj.evaluar(entorno);
        return res.valor;
    }
    if (obj && obj.id) {
        const variable = entorno.obtener(obj.id);
        return variable.valor;
    }
    if (obj && obj.tipo === 'Identificador') {
        const variable = entorno.obtener(obj.valor);
        return variable.valor;
    }
    if (typeof obj === "string") {
        const variable = entorno.obtener(obj);
        return variable.valor;
    }
    if (typeof obj === "object" && obj.valor !== undefined) {
        return obj.valor;
    }
    return obj;
}

module.exports = {
    Declaracion, Asignacion, Imprimir, If, ElseIf, Else, IfElse, IfElseIf, IfCompleto, For, ForRange, Switch,
    Slice, Struct, Matriz, Funcion, Programa, Return, Break, Continue, Mento, BloqueIndependiente,
    Cases, Default, Inicializacion, Index, Join, Len, Append, AccesoSlice, ModificacionSlice,
    AsignacionMatriz, AccesoMatriz, UsoStruct, AccesoStruct, ModificacionStruct, Atoi, ParseFloat, TypeOf,
    AccesoFuncion
};