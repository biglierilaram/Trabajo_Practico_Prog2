"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Articulo = void 0;
const Item_1 = require("./Item");
class Articulo extends Item_1.Item {
    precioArticulo;
    categoria;
    estacion;
    constructor(nombre, idItem, precioArticulo, categoria, estacion) {
        super(nombre, idItem);
        this.precioArticulo = precioArticulo;
        this.categoria = categoria;
        this.estacion = estacion;
    }
    precioFinal() {
        return this.precioArticulo;
    }
    getEstacion() {
        return this.estacion;
    }
}
exports.Articulo = Articulo;
//# sourceMappingURL=Articulo.js.map