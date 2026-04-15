class Declaracion {
    constructor(id, tipo, valor) {
        this.id = id;
        this.tipo = tipo;
        this.valor = valor;
    }
    evaluar(entorno) {
        console.log("entorno:", entorno);
        console.log("existe:", typeof entorno.existe);
        if (entorno.existe(this.id)) {
            throw new Error(`La variable ${this.id} ya ha sido declarada.`);
        }
        const valorEvaluado = this.valor ? this.valor.evaluar(entorno) : null;
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
        if (!entorno.obtener(this.id)) {
            throw new Error(`La variable ${this.id} no ha sido declarada.`);
        }
        const valorEvaluado = this.valor.evaluar(entorno);
        entorno.asignar(this.id, { tipo: entorno.obtener(this.id).tipo, valor: valorEvaluado });
        return null;
    }
}

class Imprimir {
    constructor(expresiones) {
        this.expresiones = expresiones;
    }
    evaluar(entorno) {
        const valores = this.expresiones.map(exp => exp.evaluar(entorno)).filter(instr => instr !== null && instr !== undefined);
        console.log(...valores);
        return null;
    }
}

class If { 
    constructor(condicion, instrucciones) {
        this.condicion = condicion;
        this.instrucciones = instrucciones;
    }
    evaluar(entorno) {
        const condicionEvaluada = this.condicion.evaluar(entorno);
        if (condicionEvaluada) {
            const nuevoEntorno = { ...entorno };
            for (let i = 0; i < this.instrucciones.length; i++) {
                const instruccion = this.instrucciones[i];
                instruccion.evaluar(nuevoEntorno);
            }
        }
        return null;
    }
}
class ElseIf {
    constructor(condicion, instrucciones) {
        this.condicion = condicion;
        this.instrucciones = instrucciones;
    }
    evaluar(entorno) {
        const condicionEvaluada = this.condicion.evaluar(entorno);
        if (condicionEvaluada) {
            const nuevoEntorno = { ...entorno };
            for (let i = 0; i < this.instrucciones.length; i++) {
                const instruccion = this.instrucciones[i];
                instruccion.evaluar(nuevoEntorno);
            }   
        }
        return null;
    }
}

class IfElse{
    constructor(condicion, instruccionesIf, instruccionesElse) {
        this.condicion = condicion;
        this.instruccionesIf = instruccionesIf;
        this.instruccionesElse = instruccionesElse;
    }
    evaluar(entorno) {
        const condicionEvaluada = this.condicion.evaluar(entorno);
        if (condicionEvaluada) {
            const nuevoEntorno = { ...entorno };
            for (let i = 0; i < this.instruccionesIf.length; i++) {
                const instruccion = this.instruccionesIf[i];
                instruccion.evaluar(nuevoEntorno);
            }
        } else {
            const nuevoEntorno = { ...entorno };
            for (let i = 0; i < this.instruccionesElse.length; i++) {
                const instruccion = this.instruccionesElse[i];
                instruccion.evaluar(nuevoEntorno);
            }
        }
        return null;
    }
}
class Else {
    constructor(instrucciones) {
        this.instrucciones = instrucciones;
    }
    evaluar(entorno) {
        const nuevoEntorno = { ...entorno };
        for (let i = 0; i < this.instrucciones.length; i++) {
            const instruccion = this.instrucciones[i];
            instruccion.evaluar(nuevoEntorno);
        }
        return null;
    }
}

class IfCompleto { //{ tipo: 'IfCompleto', if: $1, elseif: $2, else: $3 };
    constructor(instruccionesIf, instruccionesElseIf, instruccionesElse) {
        this.instruccionesIf = instruccionesIf;
        this.instruccionesElseIf = instruccionesElseIf;
        this.instruccionesElse = instruccionesElse; 
    }
    evaluar(entorno) {
        const nuevoEntorno = { ...entorno };
        for (let i = 0; i < this.instruccionesIf.length; i++) {
            const instruccion = this.instruccionesIf[i];
            instruccion.evaluar(nuevoEntorno);
        }
        for (let i = 0; i < this.instruccionesElseIf.length; i++) {
            const instruccion = this.instruccionesElseIf[i];
            instruccion.evaluar(nuevoEntorno);
        }
        for (let i = 0; i < this.instruccionesElse.length; i++) {
            const instruccion = this.instruccionesElse[i];
            instruccion.evaluar(nuevoEntorno);
        }
        return null;
    }
}

class For {
    constructor(id, condicion, incremento, instrucciones) {
        this.id = id;
        this.condicion = condicion;
        this.incremento = incremento;
        this.instrucciones = instrucciones;
    }
    evaluar(entorno) {
        const nuevoEntorno = { ...entorno };
        for (let i = 0; i < this.instrucciones.length; i++) {
            const instruccion = this.instrucciones[i];
            instruccion.evaluar(nuevoEntorno);
        }
        return null;
    }
}

class ForRange {
    constructor( indice, valor,slice, instrucciones) {
        this.indice = indice;
        this.valor = valor;
        this.slice = slice;
        this.instrucciones = instrucciones;
    }
    evaluar(entorno) {
        const nuevoEntorno = { ...entorno };
        for (let i = 0; i < this.instrucciones.length; i++) {
            const instruccion = this.instrucciones[i];
            instruccion.evaluar(nuevoEntorno);
        }
        return null;
    }
}

class Switch{
    constructor(expresion, cases){
        this.expresion = expresion;
        this.casos = cases;
    }
    evaluar(entorno) {
        const valorEvaluado = this.expresion.evaluar(entorno);
        let casoEncontrado = false;
        for (let i = 0; i < this.cases.length; i++) {
            const caso = this.cases[i];
            const valorCaso = caso.valor.evaluar(entorno);
            if (valorEvaluado === valorCaso) {
                casoEncontrado = true;
                const nuevoEntorno = { ...entorno };
                for (let j = 0; j < caso.instrucciones.length; j++) {
                    const instruccion = caso.instrucciones[j];
                    instruccion.evaluar(nuevoEntorno);
                }
                break;
            }
        }
        if (!casoEncontrado) {
            console.log(`No se encontró un caso coincidente para el valor: ${valorEvaluado}`);
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
        if (entorno.obtener(this.id)) {
            throw new Error(`La variable ${this.id} ya ha sido declarada.`);
        }
        const valorEvaluado = this.valor ? this.valor.evaluar(entorno) : null;
        entorno.declarar(this.id, { tipo: this.tipo, valor: valorEvaluado });
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
        this.instrucciones.forEach(i => i.evaluar(entorno));
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
    evaluar(entorno){
        return 'continue';
    }
}   

class Mento{
    constructor(id, operador){
        this.id = id;
        this.operador = operador;
    }
    evaluar(entorno) {
        const variable = entorno.obtener(this.id);
        if (!variable) {
            throw new Error(`La variable ${this.id} no ha sido declarada.`);
        }
        if (variable.tipo !== 'int' && variable.tipo !== 'float') {
            throw new Error(`La variable ${this.id} no es de tipo numérico.`);
        }
        if (this.operador === '++') {
            variable.valor += 1;
        } else if (this.operador === '--') {
            variable.valor -= 1;
        }
        entorno.asignar(this.id, variable);
        return null;
    }
}

class BloqueIndependiente {
    constructor(instrucciones) {
        this.instrucciones = instrucciones;
    }
    evaluar(entorno) {
        const nuevoEntorno = { ...entorno };
        for (let i = 0; i < this.instrucciones.length; i++) {
            const instruccion = this.instrucciones[i];
            instruccion.evaluar(nuevoEntorno);
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
        const nuevoEntorno = { ...entorno };
        for (let i = 0; i < this.instrucciones.length; i++) {
            const instruccion = this.instrucciones[i];
            instruccion.evaluar(nuevoEntorno);
        }
        return null;
    }
}

class Default {
    constructor(instrucciones) {
        this.instrucciones = instrucciones;
    }
    evaluar(entorno) {
        const nuevoEntorno = { ...entorno };
        for (let i = 0; i < this.instrucciones.length; i++) {
            const instruccion = this.instrucciones[i];
            instruccion.evaluar(nuevoEntorno);
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
    constructor(expresiones){
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
        this.indice = indice;
    }
    evaluar(entorno) {
        const variable = entorno.obtener(this.id);
        if (!variable) {
            throw new Error(`La variable ${this.id} no ha sido declarada.`);
        }
        if (variable.tipo !== 'Slice') {
            throw new Error(`La variable ${this.id} no es un slice.`);
        }
        const indiceEvaluado = this.indice.evaluar(entorno);
        if (indiceEvaluado < 0 || indiceEvaluado >= variable.valor.length) {
            throw new Error(`Índice fuera de rango para el slice ${this.id}.`);
        }
        return variable.valor[indiceEvaluado];
    }
}

class ModificacionSlice{
    constructor(id, indice, valor){
        this.id = id;
        this.indice = indice;
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
        const indiceEvaluado = this.indice.evaluar(entorno);
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
        const nuevoEntorno = { ...entorno };
        for (let i = 0; i < this.argumentos.length; i++) {
            const argValor = this.argumentos[i].evaluar(entorno);
            nuevoEntorno.declarar(funcion.parametros[i].id, { tipo: funcion.parametros[i].tipoDato, valor: argValor });
        }
        let resultado = null;
        for (let i = 0; i < funcion.instrucciones.length; i++) {
            const instruccion = funcion.instrucciones[i];
            const evalInstruccion = instruccion.evaluar(nuevoEntorno);
            if (evalInstruccion !== null) {
                resultado = evalInstruccion;
                break;
            }
        }
        return resultado;
    }
}

module.exports = {
    Declaracion, Asignacion, Imprimir, If, ElseIf, Else,IfElse, IfCompleto, For, Switch, Slice,
    Struct, Matriz, Funcion, Programa, Return, Break, Continue, Mento, BloqueIndependiente,
    Cases, Default, Inicializacion, Index, Join, Len, Append, AccesoSlice, ModificacionSlice,
    AsignacionMatriz, AccesoMatriz, UsoStruct, AccesoStruct, ModificacionStruct, Atoi, ParseFloat, TypeOf,
    AccesoFuncion
};