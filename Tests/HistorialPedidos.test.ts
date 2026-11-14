import * as assert from "node:assert/strict";
import { test } from "node:test";

import { Articulo } from "../src/Articulo";
import { Caja } from "../src/Caja";
import { Efectivo } from "../src/Efectivo";
import { HistorialPedidos } from "../src/HistorialPedidos";
import {
    Categoria,
    DiaSemana,
    TipoDeEstacion,
    TipoDeMetodoDePago
} from "../src/Enums";
import { PedidoSalon } from "../src/PedidoSalon";

function crearCajaCobrado(idPedido: number): Caja {
    const pedido = new PedidoSalon(
        idPedido,
        DiaSemana.LUNES,
        5
    );

    const articulo = new Articulo(
        "Hamburguesa",
        idPedido,
        10000,
        Categoria.PLATOPRINCIPAL,
        TipoDeEstacion.CARNES
    );

    articulo.iniciarPreparacion();
    articulo.finalizarPreparacion();
    pedido.agregarItems(articulo);

    const efectivo = new Efectivo(
        "Efectivo",
        TipoDeMetodoDePago.EFECTIVO
    );

    const caja = new Caja(pedido, efectivo);
    caja.cobrarPrecioFinalConDescuento([]);

    return caja;
}

test("no debe registrar un pedido que todavía no fue cobrado", () => {
    const pedido = new PedidoSalon(1, DiaSemana.LUNES, 5);

    const caja = new Caja(
        pedido,
        new Efectivo("Efectivo", TipoDeMetodoDePago.EFECTIVO)
    );

    const historial = new HistorialPedidos();

    assert.throws(
        () => historial.registrarPedido(caja),
        /todavía no fue cobrado/
    );

    assert.equal(historial.getCantidadPedidos(), 0);
});

test("debe registrar un pedido cobrado", () => {
    const historial = new HistorialPedidos();
    const caja = crearCajaCobrado(1);

    historial.registrarPedido(caja);

    assert.equal(historial.getCantidadPedidos(), 1);
    assert.equal(historial.buscarPedido(1)?.importeCobrado, 10000);
});

test("debe devolver undefined cuando no encuentra un pedido", () => {
    const historial = new HistorialPedidos();

    assert.equal(historial.buscarPedido(99), undefined);
});

test("debe consultar todos los pedidos registrados", () => {
    const historial = new HistorialPedidos();

    historial.registrarPedido(crearCajaCobrado(1));
    historial.registrarPedido(crearCajaCobrado(2));

    const registros = historial.consultarHistorial();

    assert.equal(registros.length, 2);
    assert.equal(registros[0].pedido.getIdPedido(), 1);
    assert.equal(registros[1].pedido.getIdPedido(), 2);
    assert.equal(registros[0].importeCobrado, 10000);
});

test("debe devolver una copia de la lista del historial", () => {
    const historial = new HistorialPedidos();

    historial.registrarPedido(crearCajaCobrado(1));

    const registros = historial.consultarHistorial();
    registros.pop();

    assert.equal(historial.getCantidadPedidos(), 1);
});

test("debe buscar un pedido por su identificador", () => {
    const historial = new HistorialPedidos();

    historial.registrarPedido(crearCajaCobrado(10));

    const registro = historial.buscarPedido(10);

    assert.notEqual(registro, undefined);
    assert.equal(registro?.pedido.getIdPedido(), 10);
});