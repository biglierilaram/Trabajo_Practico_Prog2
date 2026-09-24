"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Combo = void 0;
const Item_1 = require("./Item");
class Combo extends Item_1.Item {
    precioCombo;
    articulos;
    constructor(nombre, idItem, precioCombo) {
        super(nombre, idItem);
        this.precioCombo = precioCombo;
        this.articulos = [];
    }
    agregarArticulos(articulo) {
        this.articulos.push(articulo);
    }
    precioFinal() {
        return this.precioCombo.calcularPrecio(this.articulos);
    }
    getArticulos() {
        return this.articulos;
    }
}
exports.Combo = Combo;
//# sourceMappingURL=Combo.js.map