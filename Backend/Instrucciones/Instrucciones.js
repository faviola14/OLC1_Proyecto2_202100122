const Entorno = require("../Instrucciones/Entorno");
const Tipos = require("../Instrucciones/Tipos");

class Declaracion {
    constructor(id, tipo, valor) {
        this.id = id;
        this.tipo = tipo;
        this.valor = valor;
    }
    evaluar(entorno) {
        //console.log(this);
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
    if (cond.valor) {
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
        if (cond.valor) {
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
            if (cond.valor) {
                this.ifNode.instrucciones.forEach(i => i.evaluar(entorno));
                return;
            }
        }
        if (this.elseIfNode) {
            const cond2 = this.elseIfNode.condicion.evaluar(entorno);
            if (cond2.valor) {
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
            if (cond.valor) {
                
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
            if (cond.valor) {
                this.ifNode.instrucciones.forEach(i => i.evaluar(entorno));
                return;
            }
        }
        if (this.elseIfNode) {
            const cond = this.elseIfNode.condicion.evaluar(entorno);
            if (cond.valor) {
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
        const entornoLocal = new Entorno(entorno);
        if (this.init) {
            this.init.evaluar(entornoLocal);
        }
        while (this.condicion.evaluar(entornoLocal).valor) {
            for (let instr of this.instrucciones) {
                const res = instr.evaluar(entornoLocal);
                if (res?.tipo === 'Return') return res;
                if (res?.tipo === 'Break') return null;
                if (res?.tipo === 'Continue') break;
            }
            if (this.incremento) {
                this.incremento.evaluar(entornoLocal);
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
        //console.log("DEBUG ForRange:", this);
        const iterable = resolverValor(this.iterable, entorno);
        if (!Array.isArray(iterable)) {
            throw new Error("El iterable en for-range no es un arreglo");
        }
        const nombreIndice = this.indice.valor ?? this.indice.id;
        const nombreValor  = this.valor.valor  ?? this.valor.id;
        for (let i = 0; i < iterable.length; i++) {
            const nuevoEntorno = new Entorno(entorno);
            /*console.log("NuevoEntorno:", nuevoEntorno);
            console.log("Declarando:", nombreIndice, nombreValor);*/
            nuevoEntorno.declarar(nombreIndice, {
                tipo: 'int',
                valor: i
            });
            nuevoEntorno.declarar(nombreValor, {
                tipo: Tipos.obtenerTipo(iterable[i]),
                valor: iterable[i]
            });
            for (let instr of this.instrucciones) {
                const res = instr.evaluar(nuevoEntorno);
                if (res?.tipo === 'Break') return;
                if (res?.tipo === 'Continue') break;
                if (res?.tipo === 'Return') return res;
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
        const evalExp = this.expresion.evaluar(entorno);
        const valorEvaluado = evalExp?.valor ?? evalExp;
        let casoEncontrado = false;
        for (let caso of this.casos) {
            const evalCase = caso.valor.evaluar(entorno);
            const valorCaso = evalCase?.valor ?? evalCase;
            if (valorEvaluado === valorCaso) {
                casoEncontrado = true;
                for (let instr of caso.instrucciones) {
                    const res = instr.evaluar(entorno);
                    if (res?.tipo === 'Break') return null;
                    if (res?.tipo === 'Return') return res;
                    if (res?.tipo === 'Continue') return res;
                }
                return null;
            }
        }
        if (!casoEncontrado && this.defaultCase) {
            for (let instr of this.defaultCase.instrucciones) {
                const res = instr.evaluar(entorno);
                if (res?.tipo === 'Break') return null;
                if (res?.tipo === 'Return') return res;
                if (res?.tipo === 'Continue') return res;
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
    evaluar(entorno){
        const nombre = this.id.valor;
        if (entorno.existeLocal(nombre)) {
            throw new Error(`El struct ${nombre} ya existe.`);
        }
        //console.log("atributos: ",this.valor)
        entorno.declarar(nombre, {
            tipo: 'struct_def',
            atributos: this.valor
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
        const nombre = this.id.valor;
        if (entorno.existe(nombre)) {
            throw new Error(`La variable ${nombre} ya ha sido declarada.`);
        }
        const valorEvaluado = this.valor.map(fila =>
            fila.map(col => col.valor)
        );
        entorno.declarar(nombre, {
            tipo: this.tipo,
            valor: valorEvaluado
        });
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
        const val = this.valor ? this.valor.evaluar(entorno) : null;
        return {
            tipo: 'Return',
            valor: val
        };
    }
}
class Break{
    evaluar(entorno){
        return { tipo: 'Break' };
    }
}

class Continue{
    evaluar(entorno) {
        return { tipo: 'Continue' };
    }
}   

class Mento{
    constructor(id, operador,cantidad){
        this.id = id;
        this.operador = operador;
        this.cantidad = cantidad;
    }
    evaluar(entorno) {
        const id = this.id.valor ?? this.id;
        const variable = entorno.obtener(id);
        if (!variable) {
            throw new Error(`La variable ${id} no ha sido declarada.`);
        }
        let incremento = this.cantidad;
        if (incremento === undefined) {
            incremento = 1;
        } else if (typeof incremento.evaluar === "function") {
            incremento = incremento.evaluar(entorno).valor;
        } else if (incremento.valor !== undefined) {
            incremento = incremento.valor;
        }
        let nuevoValor;
        if (this.operador === '++') {
            nuevoValor = variable.valor + incremento;
        } else if (this.operador === '--') {
            nuevoValor = variable.valor - incremento;
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
        this.id = id;
        this.valor = valor;
    }
    evaluar(entorno) {
        const arr = resolverValor(this.id, entorno);
        const separador = resolverValor(this.valor, entorno);
        return {
            tipo: 'string',
            valor: arr.join(separador)
        };
    }
}

class Len{
    constructor(valor){
        this.valor = valor;
    }
    evaluar(entorno) {
        const arr = resolverValor(this.valor, entorno);

        if (!Array.isArray(arr)) {
            //console.log("DEBUG LEN:", arr);
            throw new Error("El valor no es un slice o matriz.");
        }

        return {
            tipo: 'int',
            valor: arr.length
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
        variable.valor.push(nuevoElemento);
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
        const base = resolverValor(this.id, entorno);
        const indice = resolverValor(this.posicion, entorno);
        if (!Array.isArray(base)) {
            throw new Error("No es un arreglo");
        }
        const valor = base[indice];
        return {
            tipo: typeof valor === 'number' ? 'int' : 'unknown',
            valor: valor
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
        console.log("ACCESO MATRIZ: ",this)
        const nombre = this.id.valor ?? this.id.id;
        console.log("BUSCANDO:", id, typeof id);
        const variable = entorno.obtener(nombre);
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
        return {
            tipo: variable.tipo,
            valor: variable.valor[filaEvaluada][columnaEvaluada]
        };
    }
}

class UsoStruct{
    constructor(tipoStruct, id, valor) {
        this.tipoStruct = tipoStruct; 
        this.id = id;                
        this.valor = valor;           
    }
    evaluar(entorno){
        const nombreStruct = this.tipoStruct.valor;
        const nombreVar = this.id.valor;
        const structDef = entorno.obtener(nombreStruct);
        if (!structDef || structDef.tipo !== 'struct_def') {
            throw new Error(`El struct ${nombreStruct} no existe`);
        }
        const atributosDef = structDef.atributos;
        //console.log(atributosDef);
        const nuevoStruct = {};
        for (let attrDef of atributosDef) {
            const nombreAttr = attrDef.id.valor;
            const tipoEsperado = attrDef.tipo;
            const attrAsignado = this.valor.find(a => a.id.valor === nombreAttr);
            if (!attrAsignado) {
                throw new Error(`Falta atributo ${nombreAttr}`);
            }
            const valorEval = resolver(attrAsignado.valor, entorno);
            if (tipoEsperado === "int" || tipoEsperado === "string" || tipoEsperado === "bool") {
                if (valorEval.tipo !== tipoEsperado) {
                    throw new Error(`Tipo incorrecto en ${nombreAttr}`);
                }
                nuevoStruct[nombreAttr] = valorEval.valor;
            } else {
                if (valorEval.nombreStruct !== tipoEsperado) {
                    throw new Error(
                        `Tipo incorrecto en atributo ${nombreAttr}: se esperaba ${tipoEsperado}`
                    );
                }
                nuevoStruct[nombreAttr] = valorEval.valor;
            }
        }
        entorno.declarar(nombreVar, {
            tipo: 'struct',
            nombreStruct: nombreStruct,
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
        return {
            tipo: 'int',
            valor: numero
        };
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
        return {
            tipo: 'float64',
            valor: numero
        };
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
        return {
            tipo: 'string',
            valor: typeof variable.valor
        };
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
            if (evalInstruccion?.tipo === 'Return') {
                return evalInstruccion.valor;
            }
        }
        return resultado;
    }
}



function resolver(exp, entorno) {
    if (exp == null) return null;
    if (typeof exp.evaluar === 'function') {
        exp = exp.evaluar(entorno);
    }
    if (exp?.tipo === 'Identificador') {
        const simbolo = entorno.obtener(exp.valor);
        return simbolo;
    }
    return exp;
}

function resolverValor(exp, entorno) {
    if (exp == null) return null;
    if (typeof exp.evaluar === "function") {
        const res = exp.evaluar(entorno);
        return res?.valor ?? res;
    }
    if (exp.tipo === 'Identificador') {
        return entorno.obtener(exp.valor).valor;
    }
    if (exp.id) {
        return entorno.obtener(exp.id).valor;
    }
    if (exp.valor !== undefined) {
        return exp.valor;
    }
    return exp;
}

module.exports = {
    Declaracion, Asignacion, Imprimir, If, ElseIf, Else, IfElse, IfElseIf, IfCompleto, For, ForRange, Switch,
    Slice, Struct, Matriz, Funcion, Programa, Return, Break, Continue, Mento, BloqueIndependiente,
    Cases, Default, Inicializacion, Index, Join, Len, Append, AccesoSlice, ModificacionSlice,
    AsignacionMatriz, AccesoMatriz, UsoStruct, AccesoStruct, ModificacionStruct, Atoi, ParseFloat, TypeOf,
    AccesoFuncion
};