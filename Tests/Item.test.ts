import { describe, it } from "node:test";
import * as assert from "node:assert/strict";
import { Articulo } from "../src/Articulo";
import { Categoria, EstadoItem, TipoDeEstacion } from "../src/Enums";

describe("Item", () => {
    it("debe crearse en estado PENDIENTE", () => {
        const articulo = new Articulo(
            "Hamburguesa",
            1,
            5000,
            Categoria.PLATOPRINCIPAL,
            TipoDeEstacion.CARNES
        );

        assert.equal(articulo.getEstado(), EstadoItem.PENDIENTE);
    });

    it("debe pasar de PENDIENTE a EN_PREPARACION", () => {
        const articulo = new Articulo(
            "Hamburguesa",
            1,
            5000,
            Categoria.PLATOPRINCIPAL,
            TipoDeEstacion.CARNES
        );

        articulo.iniciarPreparacion();

        assert.equal(articulo.getEstado(), EstadoItem.EN_PREPARACION);
    });

    it("debe pasar de EN_PREPARACION a LISTO", () => {
        const articulo = new Articulo(
            "Hamburguesa",
            1,
            5000,
            Categoria.PLATOPRINCIPAL,
            TipoDeEstacion.CARNES
        );

        articulo.iniciarPreparacion();
        articulo.finalizarPreparacion();

        assert.equal(articulo.getEstado(), EstadoItem.LISTO);
    });

    it("no debe permitir iniciar la preparación dos veces", () => {
        const articulo = new Articulo(
            "Hamburguesa",
            1,
            5000,
            Categoria.PLATOPRINCIPAL,
            TipoDeEstacion.CARNES
        );

        articulo.iniciarPreparacion();

        assert.throws(
            () => articulo.iniciarPreparacion(),
            /Solo se puede iniciar/
        );
    });

    it("no debe permitir finalizar sin iniciar la preparación", () => {
        const articulo = new Articulo(
            "Hamburguesa",
            1,
            5000,
            Categoria.PLATOPRINCIPAL,
            TipoDeEstacion.CARNES
        );

        assert.throws(
            () => articulo.finalizarPreparacion(),
            /Solo se puede finalizar/
        );
    });
});