/* Reporte de AST (Árbol de Sintaxis Abstracta) */
/* Este módulo genera un reporte visual del AST utilizando Graphviz. */
let contador = 0;

function generarAST(nodo) {
    let dot = "digraph AST {\n";
    dot += "node [shape=box];\n";

    function recorrer(nodo) {
        if (!nodo) return null;

        const id = "n" + contador++;
        let label = nodo.tipo || "valor";

        if (nodo.valor !== undefined && typeof nodo.valor !== "object") {
            label += "\\n" + nodo.valor;
        }

        dot += `${id} [label="${label}"];\n`;

        for (let clave in nodo) {
            const hijo = nodo[clave];

            if (typeof hijo === "object" && hijo !== null) {
                if (Array.isArray(hijo)) {
                    hijo.forEach(h => {
                        const idHijo = recorrer(h);
                        if (idHijo) dot += `${id} -> ${idHijo};\n`;
                    });
                } else {
                    const idHijo = recorrer(hijo);
                    if (idHijo) dot += `${id} -> ${idHijo};\n`;
                }
            }
        }

        return id;
    }

    recorrer(nodo);
    dot += "}";
    return dot;
}

module.exports = { generarAST };