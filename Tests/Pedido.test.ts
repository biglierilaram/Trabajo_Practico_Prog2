import { describe, it } from "node:test";
import * as assert from "node:assert/strict";
import { Articulo } from "../src/Articulo";
import { PedidoSalon } from "../src/PedidoSalon";
import {
    Categoria,
    DiaSemana,
    EstadoItem,
    TipoDeEstacion
} from "../src/Enums";

function crearArticulo(nombre: string, id: number, precio: number): Articulo {
    return new Articulo(
        nombre,
        id,
        precio,
        Categoria.PLATOPRINCIPAL,
        TipoDeEstacion.CARNES
    );
}

function crearPedido(): PedidoSalon {
    return new PedidoSalon(1, DiaSemana.LUNES, 5);
}

describe("Pedido", () => {
    it("debe crearse sin ítems y sin confirmar", () => {
        const pedido = crearPedido();

        assert.equal(pedido.getItems().length, 0);
        assert.equal(pedido.estaConfirmado(), false);
    });

    it("debe permitir agregar ítems y calcular el total", () => {
        const pedido = crearPedido();
        const articulo1 = crearArticulo("Hamburguesa", 1, 5000);
        const articulo2 = crearArticulo("Papas", 2, 2000);

        pedido.agregarItems(articulo1);
        pedido.agregarItems(articulo2);

        assert.equal(pedido.getItems().length, 2);
        assert.equal(pedido.calcularPrecioTotalPedidoSinDescuentos(), 7000);
    });

    it("debe permitir quitar un ítem pendiente", () => {
        const pedido = crearPedido();
        const articulo = crearArticulo("Hamburguesa", 1, 5000);

        pedido.agregarItems(articulo);
        pedido.quitarItem(articulo);

        assert.equal(pedido.getItems().length, 0);
    });

    it("no debe permitir quitar un ítem que comenzó su preparación", () => {
        const pedido = crearPedido();
        const articulo = crearArticulo("Hamburguesa", 1, 5000);

        pedido.agregarItems(articulo);
        articulo.iniciarPreparacion();

        assert.throws(
            () => pedido.quitarItem(articulo),
            /No se puede quitar un ítem/
        );
    });

    it("no debe permitir confirmar un pedido vacío", () => {
        const pedido = crearPedido();

        assert.throws(
            () => pedido.confirmar(),
            /No se puede confirmar un pedido sin ítems/
        );
    });

    it("debe permitir confirmar un pedido con ítems", () => {
        const pedido = crearPedido();
        pedido.agregarItems(crearArticulo("Hamburguesa", 1, 5000));

        pedido.confirmar();

        assert.equal(pedido.estaConfirmado(), true);
    });

    it("no debe permitir agregar ítems después de confirmar", () => {
        const pedido = crearPedido();
        pedido.agregarItems(crearArticulo("Hamburguesa", 1, 5000));
        pedido.confirmar();

        assert.throws(
            () => pedido.agregarItems(crearArticulo("Papas", 2, 2000)),
            /No se puede modificar un pedido/
        );
    });

    it("debe indicar si todos los ítems están listos", () => {
        const pedido = crearPedido();
        const articulo1 = crearArticulo("Hamburguesa", 1, 5000);
        const articulo2 = crearArticulo("Papas", 2, 2000);

        pedido.agregarItems(articulo1);
        pedido.agregarItems(articulo2);

        assert.equal(pedido.estanTodosLosItemsListos(), false);

        articulo1.iniciarPreparacion();
        articulo1.finalizarPreparacion();
        articulo2.iniciarPreparacion();
        articulo2.finalizarPreparacion();

        assert.equal(pedido.estanTodosLosItemsListos(), true);
    });

    it("debe devolver la fecha del pedido", () => {
        const pedido = crearPedido();

        assert.equal(pedido.getFechaPedido(), DiaSemana.LUNES);
    });

    it("debe devolver el número de pedido", () => {
        const pedido = crearPedido();

        assert.equal(pedido.getIdPedido(), 1);
    });

    it("debe devolver una copia de la lista de ítems", () => {
        const pedido = crearPedido();
        const articulo = crearArticulo("Hamburguesa", 1, 5000);

        pedido.agregarItems(articulo);

        const items = pedido.getItems();
        items.pop();

        assert.equal(pedido.getItems().length, 1);
    });
});

describe("PedidoSalon", () => {
    it("debe quitar el ítem indicado y todos los posteriores", () => {
        const pedido = crearPedido();
        const articulo1 = crearArticulo("Hamburguesa", 1, 5000);
        const articulo2 = crearArticulo("Papas", 2, 2000);
        const articulo3 = crearArticulo("Gaseosa", 3, 1500);

        pedido.agregarItems(articulo1);
        pedido.agregarItems(articulo2);
        pedido.agregarItems(articulo3);

        pedido.quitarItemsHasta(articulo2);

        assert.deepEqual(pedido.getItems(), [articulo1]);
    });

    it("no debe modificar el pedido si el ítem no existe", () => {
        const pedido = crearPedido();
        const articulo1 = crearArticulo("Hamburguesa", 1, 5000);
        const articulo2 = crearArticulo("Papas", 2, 2000);

        pedido.agregarItems(articulo1);

        pedido.quitarItemsHasta(articulo2);

        assert.deepEqual(pedido.getItems(), [articulo1]);
    });

    it("no debe permitir corregir un pedido confirmado", () => {
        const pedido = crearPedido();
        const articulo = crearArticulo("Hamburguesa", 1, 5000);

        pedido.agregarItems(articulo);
        pedido.confirmar();

        assert.throws(
            () => pedido.quitarItemsHasta(articulo),
            /No se puede corregir un pedido/
        );
    });
});