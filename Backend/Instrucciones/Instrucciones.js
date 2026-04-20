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
            valorEvaluado = this.valor.evaluar(entorno);
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
        const nuevoValor = this.valor.evaluar(entorno);
        const tipoNuevo = Tipos.obtenerTipo(nuevoValor);
        //console.log("variable: ", variable, "nuevoValor: ",nuevoValor ,"tipoNuevo: ", tipoNuevo)
        if (variable.tipo === 'float64' && tipoNuevo === 'int') {
            entorno.asignar(this.id, {
                tipo: 'float64',
                valor: nuevoValor
            });
            return;
        }

        if (variable.tipo !== tipoNuevo) {
            throw new Error(`No se puede asignar un valor de tipo diferente a ${variable.tipo}`);
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
        const valores = this.expresiones.map(exp => exp.evaluar(entorno)).filter(instr => instr !== null && instr !== undefined);
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
        while (this.condicion ? Boolean(this.condicion.evaluar(entorno)) : true) {
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
        console.log("ANTES DEL FOR:", entorno);
        console.log("indice:", this.indice);
        console.log("valor:", this.valor);
        for (let i = 0; i < iterable.length; i++) {
            //const nuevoEntorno = new Entorno(entorno);
            entorno.declarar(this.indice.valor, { tipo: 'int', valor: i });
            console.log("DECLARANDO:", this.indice.valor, this.valor.valor);
            entorno.declarar(this.valor.valor, { tipo: 'int', valor: iterable[i] });
            for (let instr of this.instrucciones) {
                const res = instr.evaluar(entorno);
                if (res === 'break') return;
                if (res === 'continue') break;
            }
        }
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
        const valorEvaluado = this.expresion.evaluar(entorno);
        let casoEncontrado = false;
        for (let i = 0; i < this.casos.length; i++) {
            const caso = this.casos[i];
            const valorCaso = caso.valor.evaluar(entorno);
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
            ? this.valor.map(v => v.evaluar(entorno))
            : [];
        entorno.declarar(this.id, {
            tipo: this.tipo,
            valor: valorEvaluado
        });
        return null;
    }
}

class Struct{
    constructor(id, tipo, valor){
        this.id = id;
        this.tipo = tipo;
        this.valor = valor;
}
    evaluar(entorno){
        if (entorno.obtener(this.id)) {
            throw new Error(`La variable ${this.id} ya ha sido declarada.`);
        }
        const valorEvaluado = this.valor ? this.valor.evaluar(entorno) : null;
        entorno.declarar(this.id, { tipo: this.tipo, valor: valorEvaluado });
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
        this.instrucciones.forEach((inst, i) => {
            //console.log("EJECUTANDO:", i, inst.constructor.name);
            inst.evaluar(entorno);
            });
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
        const valorEvaluado = this.valor.evaluar(entorno);
        entorno.declarar(this.id.valor, { tipo: 'int', valor: valorEvaluado });
        return null;
    }
}

class Index{
    constructor(id, indice){
        this.id = id;
        this.indice = indice;
    }
    evaluar(entorno) {
        const variable = entorno.obtener(this.id);  
        if (!variable) {
            throw new Error(`La variable ${this.id} no ha sido declarada.`);
        }
        if (variable.tipo !== 'Slice' && variable.tipo !== 'Matriz') {
            throw new Error(`La variable ${this.id} no es un slice o matriz.`);
        }
        const indiceEvaluado = this.indice.evaluar(entorno);
        if (variable.tipo === 'Slice') {
            if (indiceEvaluado < 0 || indiceEvaluado >= variable.valor.length) {
                throw new Error(`Índice fuera de rango para el slice ${this.id}.`);
            }
            return variable.valor[indiceEvaluado];
        }
        if (variable.tipo === 'Matriz') {
            const fila = Math.floor(indiceEvaluado / variable.valor[0].length);
            const columna = indiceEvaluado % variable.valor[0].length;
            if (fila < 0 || fila >= variable.valor.length || columna < 0 || columna >= variable.valor[0].length) {
                throw new Error(`Índice fuera de rango para la matriz ${this.id}.`);
            }
            return variable.valor[fila][columna];
        }   
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
        const variable = entorno.obtener(this.id);
        if (!variable) {
            throw new Error(`La variable ${this.id} no ha sido declarada.`);
        }
        if (variable.tipo !== 'Slice' && variable.tipo !== 'Matriz') {
            throw new Error(`La variable ${this.id} no es un slice o matriz.`);
        }
        if (variable.tipo === 'Slice') {
            return variable.valor.length;
        }
        if (variable.tipo === 'Matriz') {
            return variable.valor.length;
        }
    }
}

class Append{
    constructor(id, valor){
        this.id = id;
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
        const valorEvaluado = this.valor.evaluar(entorno);
        variable.valor.push(valorEvaluado);
        entorno.asignar(this.id, variable);
        return null;
    }
}

class AccesoSlice{
    constructor(id, indice){
        this.id = id;
        this.posicion = posicion;
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
        return variable.valor[indiceEvaluado];
    }
}

class ModificacionSlice{
    constructor(id, indice, valor){
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
    constructor(id, atributo){
        this.id = id;
        this.atributo = atributo;
    }
    evaluar(entorno) {
        const variable = entorno.obtener(this.id);
        if (!variable) {
            throw new Error(`La variable ${this.id} no ha sido declarada.`);
        }
        if (variable.tipo !== 'Struct') {
            throw new Error(`La variable ${this.id} no es un struct.`);
        }
        const valorAtributo = variable.valor[this.atributo];
        if (valorAtributo === undefined) {
            throw new Error(`El atributo ${this.atributo} no existe en el struct ${this.id}.`);
        }
        return valorAtributo;
    }
}

class AccesoStruct{
    constructor(id, atributo){
        this.id = id;
        this.atributo = atributo;
    }
    evaluar(entorno) {
        const variable = entorno.obtener(this.id);
        if (!variable) {
            throw new Error(`La variable ${this.id} no ha sido declarada.`);
        }
        if (variable.tipo !== 'Struct') {
            throw new Error(`La variable ${this.id} no es un struct.`);
        }
        const valorAtributo = variable.valor[this.atributo];
        if (valorAtributo === undefined) {
            throw new Error(`El atributo ${this.atributo} no existe en el struct ${this.id}.`);
        }
        return valorAtributo;
    }
}

class ModificacionStruct{
    constructor(id, atributo, valor){
        this.id = id;
        this.atributo = atributo;
        this.valor = valor;
    }
    evaluar(entorno) {
        const variable = entorno.obtener(this.id);
        if (!variable) {
            throw new Error(`La variable ${this.id} no ha sido declarada.`);
        }
        if (variable.tipo !== 'Struct') {
            throw new Error(`La variable ${this.id} no es un struct.`);
        }
        const valorEvaluado = this.valor.evaluar(entorno);
        variable.valor[this.atributo] = valorEvaluado;
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
        const variable = entorno.obtener(this.id);
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
            nuevoEntorno.declarar(funcion.parametros[i].id, { tipo: funcion.parametros[i].tipoDato, valor: argValor });
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



module.exports = {
    Declaracion, Asignacion, Imprimir, If, ElseIf, Else, IfElse, IfElseIf, IfCompleto, For, ForRange, Switch,
    Slice, Struct, Matriz, Funcion, Programa, Return, Break, Continue, Mento, BloqueIndependiente,
    Cases, Default, Inicializacion, Index, Join, Len, Append, AccesoSlice, ModificacionSlice,
    AsignacionMatriz, AccesoMatriz, UsoStruct, AccesoStruct, ModificacionStruct, Atoi, ParseFloat, TypeOf,
    AccesoFuncion
};