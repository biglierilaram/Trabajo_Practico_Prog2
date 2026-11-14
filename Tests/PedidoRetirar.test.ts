import * as assert from "node:assert/strict";
import { test } from "node:test";

import { Articulo } from "../src/Articulo";
import { Categoria, DiaSemana, TipoDeEstacion } from "../src/Enums";
import { PedidoRetirar } from "../src/PedidoRetirar";

function crearArticulo(id: number): Articulo {
    return new Articulo(
        `Artículo ${id}`,
        id,
        5000,
        Categoria.PLATOPRINCIPAL,
        TipoDeEstacion.CARNES
    );
}

test("debe devolver el horario de retiro", () => {
    const pedido = new PedidoRetirar(
        1,
        DiaSemana.LUNES,
        "20:30"
    );

    assert.equal(pedido.getHorarioDeRetiro(), "20:30");
});

test("debe quitar el artículo indicado y todos los posteriores", () => {
    const pedido = new PedidoRetirar(
        2,
        DiaSemana.MARTES,
        "21:00"
    );

    const articulo1 = crearArticulo(1);
    const articulo2 = crearArticulo(2);
    const articulo3 = crearArticulo(3);

    pedido.agregarItems(articulo1);
    pedido.agregarItems(articulo2);
    pedido.agregarItems(articulo3);

    pedido.quitarItemsHasta(articulo2);

    assert.deepEqual(pedido.getItems(), [articulo1]);
});

test("no debe modificar el pedido si el artículo no existe", () => {
    const pedido = new PedidoRetirar(
        3,
        DiaSemana.MIERCOLES,
        "19:30"
    );

    const articulo1 = crearArticulo(1);
    const articulo2 = crearArticulo(2);

    pedido.agregarItems(articulo1);
    pedido.agregarItems(articulo2);

    pedido.quitarItemsHasta(crearArticulo(3));

    assert.deepEqual(pedido.getItems(), [articulo1, articulo2]);
});

test("no debe permitir corregir un pedido confirmado", () => {
    const pedido = new PedidoRetirar(
        4,
        DiaSemana.JUEVES,
        "20:00"
    );

    const articulo = crearArticulo(1);

    pedido.agregarItems(articulo);
    pedido.confirmar();

    assert.throws(
        () => pedido.quitarItemsHasta(articulo),
        /No se puede corregir un pedido que ya fue confirmado/
    );
});