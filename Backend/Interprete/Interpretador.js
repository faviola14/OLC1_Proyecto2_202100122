const Entorno = require("../Instrucciones/Entorno");
const { Numero, Cadena, Identificador, Booleano, Bloque } = require("../Instrucciones/Valores");
const { Declaracion, Asignacion, Imprimir, If, Switch, For, } = require("../Instrucciones/Instrucciones");
const Aritmetica = require("../Aritmetica/Aritmetica");
const Logica = require("../Logica/Logica");
const Not = require("../Logica/Not");
const Comparacion = require("../Logica/Comparacion");
const Negativo = require("../Aritmetica/Negativo");

function aNodo(nodo){
    if (!nodo || typeof nodo !== 'object') return null;

    switch (nodo.tipo) {
        case 'Numero':
            return new Numero(nodo.valor);
        case 'Cadena':
            return new Cadena(nodo.valor);
        case 'Identificador':
            return new Identificador(nodo.valor);
        case 'Booleano':
            return new Booleano(nodo.valor);
        case 'Bloque':
            const instrucciones = nodo.instrucciones.map(instr => aNodo(instr));
            return new Bloque(instrucciones);
        case 'Declaracion':
            const valorDecl = aNodo(nodo.valor);
            return new Declaracion(nodo.id, nodo.tipoDato, valorDecl);
        case 'Asignacion':
            const valorAsig = aNodo(nodo.valor);
            return new Asignacion(nodo.id, valorAsig);
        case 'Imprimir':
            const exprImp = aNodo(nodo.expresion);
            return new Imprimir(exprImp);
        case 'If':
            const condicionIf = aNodo(nodo.condicion);
            const instruccionesIf = nodo.instrucciones.map(instr => aNodo(instr));
            return new If(condicionIf, instruccionesIf);
        case 'For':
            const idFor = nodo.id;
            const condicionFor = aNodo(nodo.condicion);
            const incrementoFor = aNodo(nodo.incremento);
            const instruccionesFor = nodo.instrucciones.map(instr => aNodo(instr));
            return new For(idFor, condicionFor, incrementoFor, instruccionesFor);
        case 'Switch':
            const exprSwitch = aNodo(nodo.expresion);
            const casosSwitch = nodo.cases.map(caso => ({
                valor: aNodo(caso.valor),
                instrucciones: caso.instrucciones.map(instr => aNodo(instr))
            }));
            return new Switch(exprSwitch, casosSwitch);
        case 'Aritmetica':
            const izquierdaArit = aNodo(nodo.izquierda);
            const derechaArit = aNodo(nodo.derecha);
            return new Aritmetica(izquierdaArit, nodo.operador, derechaArit);
        case 'Logica':
            const izquierdaLog = aNodo(nodo.izquierda);
            const derechaLog = aNodo(nodo.derecha);
            return new Logica(izquierdaLog, nodo.operador, derechaLog); 
        case 'Not':
            const valorNot = aNodo(nodo.valor);
            return new Not(valorNot);
        case 'Comparacion':
            const izquierdaComp = aNodo(nodo.izquierda);
            const derechaComp = aNodo(nodo.derecha);
            return new Comparacion(izquierdaComp, nodo.operador, derechaComp);
        case 'Negativo':
            const valorNeg = aNodo(nodo.valor);
            return new Negativo(valorNeg);
        case 'Función':
            const parametrosFunc = nodo.parametros.map(param => ({ id: param.id, tipoDato: param.tipoDato }));
            const instruccionesFunc = nodo.instrucciones.map(instr => aNodo(instr));
            return new Función(nodo.id, parametrosFunc, nodo.tipoRetorno, instruccionesFunc);
        case 'Slice':
            const valorSlice = aNodo(nodo.valor);
            return new Slice(nodo.id, nodo.tipoDato, valorSlice);
        case 'Struct':
            return new Struct(nodo.id, nodo.tipoDato, null);
        case 'Matriz':
            const valorMatriz = aNodo(nodo.valor);
            return new Matriz(nodo.id, nodo.tipoDato, valorMatriz);
        
        default:
            throw new Error(`Tipo de nodo desconocido: ${nodo.tipo}`);
    }
}

function interpretar(nodo) {
        const entorno = new Entorno();
        const raiz = aNodo(nodo);
        if (Array.isArray(raiz)) {
            raiz.forEach(n => n.evaluar(entorno));
        } else {
            raiz.evaluar(entorno);
        }

        return entorno;

    }

module.exports = interpretar ;