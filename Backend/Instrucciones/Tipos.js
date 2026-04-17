function obtenerTipo(valor) {
    if (typeof valor === 'boolean') return 'bool';
    if (typeof valor === 'string') return 'string';
    if (typeof valor === 'number') {
        return Number.isInteger(valor) ? 'int' : 'float64';
    }
    return 'unknown';
}

module.exports = { obtenerTipo };