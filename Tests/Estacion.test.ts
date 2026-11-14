import { describe, it } from "node:test";
import * as assert from "node:assert/strict";
import { Articulo } from "../src/Articulo";
import { Estacion } from "../src/Estacion";
import {
    Categoria,
    EstadoItem,
    TipoDeEstacion
} from "../src/Enums";

function crearArticulo(): Articulo {
    return new Articulo(
        "Hamburguesa",
        1,
        5000,
        Categoria.PLATOPRINCIPAL,
        TipoDeEstacion.CARNES
    );
}

describe("Estacion", () => {
    it("debe recibir un ítem pendiente", () => {
        const estacion = new Estacion(TipoDeEstacion.CARNES);
        const articulo = crearArticulo();

        estacion.recibirItem(articulo);

        assert.equal(estacion.getCantidadItemsEnEspera(), 1);
    });

    it("no debe recibir un ítem que ya comenzó su preparación", () => {
        const estacion = new Estacion(TipoDeEstacion.CARNES);
        const articulo = crearArticulo();

        articulo.iniciarPreparacion();

        assert.throws(
            () => estacion.recibirItem(articulo),
            /La estación solo puede recibir ítems pendientes/
        );
    });

    it("debe iniciar la preparación del siguiente ítem", () => {
        const estacion = new Estacion(TipoDeEstacion.CARNES);
        const articulo = crearArticulo();

        estacion.recibirItem(articulo);

        const iniciado = estacion.iniciarSiguienteItem();

        assert.equal(iniciado, articulo);
        assert.equal(articulo.getEstado(), EstadoItem.EN_PREPARACION);
        assert.equal(estacion.getItemEnPreparacion(), articulo);
        assert.equal(estacion.getCantidadItemsEnEspera(), 0);
    });

    it("no debe iniciar otro ítem si ya hay uno en preparación", () => {
        const estacion = new Estacion(TipoDeEstacion.CARNES);

        estacion.recibirItem(crearArticulo());
        estacion.recibirItem(
            new Articulo(
                "Papas",
                2,
                2000,
                Categoria.ENTRADA,
                TipoDeEstacion.CARNES
            )
        );

        estacion.iniciarSiguienteItem();

        assert.throws(
            () => estacion.iniciarSiguienteItem(),
            /La estación ya tiene un ítem en preparación/
        );
    });

    it("no debe iniciar un ítem si la cola está vacía", () => {
        const estacion = new Estacion(TipoDeEstacion.CARNES);

        assert.throws(
            () => estacion.iniciarSiguienteItem(),
            /No hay ítems pendientes/
        );
    });

    it("debe finalizar el ítem que está en preparación", () => {
        const estacion = new Estacion(TipoDeEstacion.CARNES);
        const articulo = crearArticulo();

        estacion.recibirItem(articulo);
        estacion.iniciarSiguienteItem();

        const finalizado = estacion.finalizarItemActual();

        assert.equal(finalizado, articulo);
        assert.equal(articulo.getEstado(), EstadoItem.LISTO);
        assert.equal(estacion.getItemEnPreparacion(), null);
    });

    it("no debe finalizar si no hay ningún ítem en preparación", () => {
        const estacion = new Estacion(TipoDeEstacion.CARNES);

        assert.throws(
            () => estacion.finalizarItemActual(),
            /No hay ningún ítem en preparación/
        );
    });

    it("debe devolver el tipo de estación", () => {
        const estacion = new Estacion(TipoDeEstacion.CARNES);

        assert.equal(
            estacion.getTipoDeEstacion(),
            TipoDeEstacion.CARNES
        );
    });
});