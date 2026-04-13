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

    switch (nodo.type) {
        case 'Numero':
            return new Numero(nodo.value);
        case 'Cadena':
            return new Cadena(nodo.value);
        case 'Identificador':
            return new Identificador(nodo.value);
        case 'Booleano':
            return new Booleano(nodo.value);
        case 'Bloque':
            const instrucciones = nodo.instrucciones.map(instr => aNodo(instr));
            return new Bloque(instrucciones);
        case 'Declaracion':
            const valorDecl = aNodo(nodo.valor);
            return new Declaracion(nodo.id, valorDecl);
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
            const casosSwitch = nodo.casos.map(caso => ({
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
            return new Logica(izquierdaLog, derechaLog, nodo.operador); 
        case 'Not':
            const valorNot = aNodo(nodo.valor);
            return new Not(valorNot);
        case 'Comparacion':
            const izquierdaComp = aNodo(nodo.izquierda);
            const derechaComp = aNodo(nodo.derecha);
            return new Comparacion(izquierdaComp, derechaComp, nodo.operador);
        case 'Negativo':
            const valorNeg = aNodo(nodo.valor);
            return new Negativo(valorNeg);
        default:
            throw new Error(`Tipo de nodo desconocido: ${nodo.type}`);
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