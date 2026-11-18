import { describe, it, expect } from "@jest/globals";
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

        expect(estacion.getCantidadItemsEnEspera()).toBe(1);
    });

    it("no debe recibir un ítem que ya comenzó su preparación", () => {
        const estacion = new Estacion(TipoDeEstacion.CARNES);
        const articulo = crearArticulo();

        articulo.iniciarPreparacion();

        expect(() => estacion.recibirItem(articulo))
            .toThrow(/La estación solo puede recibir ítems pendientes/);
    });

    it("debe iniciar la preparación del siguiente ítem", () => {
        const estacion = new Estacion(TipoDeEstacion.CARNES);
        const articulo = crearArticulo();

        estacion.recibirItem(articulo);

        const iniciado = estacion.iniciarSiguienteItem();

        expect(iniciado).toBe(articulo);
        expect(articulo.getEstado()).toBe(EstadoItem.EN_PREPARACION);
        expect(estacion.getItemEnPreparacion()).toBe(articulo);
        expect(estacion.getCantidadItemsEnEspera()).toBe(0);
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

        expect(() => estacion.iniciarSiguienteItem())
            .toThrow(/La estación ya tiene un ítem en preparación/);
    });

    it("no debe iniciar un ítem si la cola está vacía", () => {
        const estacion = new Estacion(TipoDeEstacion.CARNES);

        expect(() => estacion.iniciarSiguienteItem())
            .toThrow(/No hay ítems pendientes/);
    });

    it("debe finalizar el ítem que está en preparación", () => {
        const estacion = new Estacion(TipoDeEstacion.CARNES);
        const articulo = crearArticulo();

        estacion.recibirItem(articulo);
        estacion.iniciarSiguienteItem();

        const finalizado = estacion.finalizarItemActual();

        expect(finalizado).toBe(articulo);
        expect(articulo.getEstado()).toBe(EstadoItem.LISTO);
        expect(estacion.getItemEnPreparacion()).toBeNull();
    });

    it("no debe finalizar si no hay ningún ítem en preparación", () => {
        const estacion = new Estacion(TipoDeEstacion.CARNES);

        expect(() => estacion.finalizarItemActual())
            .toThrow(/No hay ningún ítem en preparación/);
    });

    it("debe devolver el tipo de estación", () => {
        const estacion = new Estacion(TipoDeEstacion.CARNES);

        expect(estacion.getTipoDeEstacion()).toBe(TipoDeEstacion.CARNES);
    });
});