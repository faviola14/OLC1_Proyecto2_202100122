const Entorno = require("../Instrucciones/Entorno");
const { Numero, Cadena, Identificador, Booleano, Bloque } = require("../Instrucciones/Valores");
const { Declaracion, Asignacion, Imprimir, If, IfElseIf,ElseIf, IfElse, Else, IfCompleto, For, ForRange, Switch, Slice,
    Struct, Matriz, Funcion, Programa, Return, Break, Continue, Mento, BloqueIndependiente,
    Cases, Default, Inicializacion, Index, Join, Len, Append, AccesoSlice, ModificacionSlice,
    AsignacionMatriz, AccesoMatriz, UsoStruct, AccesoStruct, ModificacionStruct, Atoi, ParseFloat, TypeOf,
    AccesoFuncion } = require("../Instrucciones/Instrucciones");
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
            const instrucciones = nodo.instrucciones.map(instr => aNodo(instr)).filter(instr => instr !== null && instr !== undefined);
            return new Bloque(instrucciones);
        case 'Declaracion':
            const valorDecl = aNodo(nodo.valor);
            return new Declaracion(nodo.id, nodo.tipoDato, valorDecl);
        case 'Asignacion':
            const valorAsig = aNodo(nodo.valor);
            return new Asignacion(nodo.id, valorAsig);
        case 'Imprimir':
            const expresiones = nodo.expresiones.map(e => aNodo(e)).filter(e => e !== null && e !== undefined);
            return new Imprimir(expresiones);
        case 'If':
            const condicionIf = aNodo(nodo.condicion);
            const instruccionesIf = nodo.instrucciones.map(instr => aNodo(instr)).filter(instr => instr !== null && instr !== undefined);
            return new If(condicionIf, instruccionesIf);
        case 'ElseIf':
            const condicionElseIf = aNodo(nodo.condicion);
            const instruccionesElseIf = nodo.instrucciones.map(instr => aNodo(instr)).filter(instr => instr !== null && instr !== undefined);
            return new ElseIf(condicionElseIf, instruccionesElseIf);
        case 'IfElse':
            return new IfElse(
                aNodo(nodo.if),
                nodo.else ? aNodo(nodo.else) : null
            );
        case 'IfElseIf':
            return new IfElseIf(
                aNodo(nodo.if),
                nodo.elseif ? aNodo(nodo.elseif) : null
            );
        case 'Else':
            const instruccionesElse = nodo.instrucciones.map(instr => aNodo(instr)).filter(instr => instr !== null && instr !== undefined);
            return new Else(instruccionesElse);
        case 'IfCompleto':
            return new IfCompleto(
                aNodo(nodo.if),
                nodo.elseif ? aNodo(nodo.elseif) : null,
                nodo.else ? aNodo(nodo.else) : null
            );
        case 'For':
            const init = aNodo(nodo.init);
            const condicion = aNodo(nodo.condicion);
            const incremento = aNodo(nodo.incremento);
            const instruccionesFor = nodo.instrucciones.map(instr => aNodo(instr)).filter(instr => instr !== null && instr !== undefined);
            return new For(init, condicion, incremento, instruccionesFor);
        case 'ForRange':
            const indice = nodo.indice;
            const valor = aNodo(nodo.valor);
            const iterable = aNodo(nodo.iterable);
            const instruccionesForRange = nodo.instrucciones.map(instr => aNodo(instr)).filter(instr => instr !== null && instr !== undefined);
            return new ForRange( indice, valor, iterable, instruccionesForRange);
        case 'Switch':
            const defaultCase = nodo.default ? aNodo(nodo.default) : null;
            const exprSwitch = aNodo(nodo.condicion);
            const casosSwitch = nodo.cases.map(caso => ({
                valor: aNodo(caso.valor),
                instrucciones: caso.instrucciones
                    .map(instr => aNodo(instr))
                    .filter(instr => instr !== null && instr !== undefined)
            }));
            return new Switch(exprSwitch, casosSwitch, defaultCase);
        case 'Case':
            const valorCase = aNodo(nodo.valor);
            const instruccionesCase = nodo.instrucciones.map(instr => aNodo(instr)).filter(instr => instr !== null && instr !== undefined);
            return new Case(valorCase, instruccionesCase);
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
        case 'Funcion':
            const parametrosFunc = nodo.parametros.map(param => ({ id: param.id, tipoDato: param.tipoDato })).filter(param => param !== null && param !== undefined);
            const instruccionesFunc = nodo.instrucciones.map(instr => aNodo(instr)).filter(instr => instr !== null && instr !== undefined);
            return new Funcion(nodo.id, parametrosFunc, nodo.tipoRetorno, instruccionesFunc);
        case 'Slice':
            const valorSlice = nodo.valor ? nodo.valor.map(v => aNodo(v)) : [];
            return new Slice(nodo.id, nodo.tipoDato, valorSlice);
        case 'Struct':
            return new Struct(nodo.id, nodo.tipoDato, null);
        case 'Matriz':
            const valorMatriz = nodo.valor.map(fila =>
                fila.map(elem => aNodo(elem))
            ).filter(instr => instr !== null && instr !== undefined);
            return new Matriz(nodo.id, nodo.tipoDato, valorMatriz);
        case 'Programa':
    return new Programa(
        nodo.funciones
            .map(f => aNodo(f))
            .filter(f => f !== null && f !== undefined),
        nodo.instrucciones
            .map(i => aNodo(i))
            .filter(i => i !== null && i !== undefined)
    );
        case 'Return':
            const valorReturn = aNodo(nodo.valor);
            return new Return(valorReturn);
        case 'Break':
            return new Break();
        case 'Continue':
            return new Continue();
        case 'Mento':
            console.log("NODO MENTO:", nodo.cantidad);

            return new Mento(nodo.id.valor, nodo.operador, nodo.cantidad.valor);
        
        case 'BloqueIndependiente':
            const instruccionesBloque = nodo.instrucciones.map(instr => aNodo(instr)).filter(instr => instr !== null && instr !== undefined);
            return new BloqueIndependiente(instruccionesBloque);
        case 'Default':
            const instruccionesDefault = nodo.instrucciones.map(instr => aNodo(instr)).filter(instr => instr !== null && instr !== undefined);
            return new Default(instruccionesDefault);
        case 'AccesoFuncion':
            const argumentos = nodo.argumentos.map(arg => aNodo(arg)).filter(arg => arg !== null && arg !== undefined);
            return new AccesoFuncion(nodo.id, argumentos);
        default:
            throw new Error(`Tipo de nodo desconocido: ${JSON.stringify(nodo)}`);
            //break
    }
}

function interpretar(nodo) {
    const entorno = new Entorno();

    if (Array.isArray(nodo)) {
        nodo.forEach(n => {
            const raiz = aNodo(n);
            if (raiz) raiz.evaluar(entorno);
        });
    } else {
        const raiz = aNodo(nodo);
        if (raiz) raiz.evaluar(entorno);
    }
    //console.log(entorno instanceof Entorno);
    return entorno;
}

module.exports = interpretar ;