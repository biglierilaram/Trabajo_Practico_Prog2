import * as assert from "node:assert/strict";
import { test } from "node:test";

import { Articulo } from "../src/Articulo";
import { Categoria, DiaSemana, EstadoItem, TipoDeEstacion } from "../src/Enums";
import { Estacion } from "../src/Estacion";
import { PedidoSalon } from "../src/PedidoSalon";
import { Restaurante } from "../src/Restaurante";

test("debe confirmar el pedido y distribuir los artículos en sus estaciones", () => {
    const carnes = new Estacion(TipoDeEstacion.CARNES);
    const ensaladas = new Estacion(TipoDeEstacion.ENSALADAS);

    const restaurante = new Restaurante([carnes, ensaladas]);

    const pedido = new PedidoSalon(1, DiaSemana.LUNES, 5);

    const hamburguesa = new Articulo(
        "Hamburguesa", 1, 5000, Categoria.PLATOPRINCIPAL,
        TipoDeEstacion.CARNES
    );

    const ensalada = new Articulo(
        "Ensalada", 2, 3000, Categoria.ENTRADA,
        TipoDeEstacion.ENSALADAS
    );

    pedido.agregarItems(hamburguesa);
    pedido.agregarItems(ensalada);

    restaurante.confirmarYDistribuirPedido(pedido);

    assert.equal(pedido.estaConfirmado(), true);
    assert.equal(carnes.getCantidadItemsEnEspera(), 1);
    assert.equal(ensaladas.getCantidadItemsEnEspera(), 1);
});

test("no debe distribuir un pedido si un artículo ya comenzó su preparación", () => {
    const carnes = new Estacion(TipoDeEstacion.CARNES);
    const restaurante = new Restaurante([carnes]);

    const pedido = new PedidoSalon(2, DiaSemana.MARTES, 3);

    const hamburguesa = new Articulo(
        "Hamburguesa", 1, 5000, Categoria.PLATOPRINCIPAL,
        TipoDeEstacion.CARNES
    );

    pedido.agregarItems(hamburguesa);
    hamburguesa.iniciarPreparacion();

    assert.throws(
        () => restaurante.confirmarYDistribuirPedido(pedido),
        /Todos los artículos deben estar pendientes/
    );

    assert.equal(pedido.estaConfirmado(), false);
    assert.equal(carnes.getCantidadItemsEnEspera(), 0);
});

test("no debe confirmar el pedido si falta una estación", () => {
    const carnes = new Estacion(TipoDeEstacion.CARNES);
    const restaurante = new Restaurante([carnes]);

    const pedido = new PedidoSalon(3, DiaSemana.MIERCOLES, 2);

    const postre = new Articulo(
        "Helado", 1, 2000, Categoria.POSTRE,
        TipoDeEstacion.POSTRES
    );

    pedido.agregarItems(postre);

    assert.throws(
        () => restaurante.confirmarYDistribuirPedido(pedido),
        /No existe una estación/
    );

    assert.equal(pedido.estaConfirmado(), false);
});

test("no debe confirmar un pedido vacío", () => {
    const restaurante = new Restaurante([]);

    const pedido = new PedidoSalon(4, DiaSemana.JUEVES, 1);

    assert.throws(
        () => restaurante.confirmarYDistribuirPedido(pedido),
        /No se puede confirmar un pedido sin ítems/
    );

    assert.equal(pedido.estaConfirmado(), false);
});

test("getEstacion debe devolver la estación solicitada", () => {
    const carnes = new Estacion(TipoDeEstacion.CARNES);
    const barra = new Estacion(TipoDeEstacion.BARRA);

    const restaurante = new Restaurante([carnes, barra]);

    assert.equal(
        restaurante.getEstacion(TipoDeEstacion.BARRA),
        barra
    );
});

test("getEstacion debe devolver undefined si no existe la estación", () => {
    const restaurante = new Restaurante([]);

    assert.equal(
        restaurante.getEstacion(TipoDeEstacion.POSTRES),
        undefined
    );
});