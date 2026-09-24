"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DescuentoFijoCombo = void 0;
const PrecioCombo_1 = require("./PrecioCombo");
class DescuentoFijoCombo extends PrecioCombo_1.PrecioCombo {
    montoDescontadoCombo;
    constructor(montoDescontadoCombo) {
        super();
        this.montoDescontadoCombo = montoDescontadoCombo;
    }
    calcularPrecio(articulos) {
        let contador = 0;
        const descuentoAplicado = this.montoDescontadoCombo;
        for (const articulo of articulos) {
            contador += articulo.precioFinal();
        }
        return contador - descuentoAplicado;
    }
}
exports.DescuentoFijoCombo = DescuentoFijoCombo;
//# sourceMappingURL=DescuentoFijoCombo.js.map