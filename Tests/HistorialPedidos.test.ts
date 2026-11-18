import { describe, it, expect } from "@jest/globals";
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

describe("HistorialPedidos", () => {
    it("no debe registrar un pedido que todavía no fue cobrado", () => {
        const pedido = new PedidoSalon(1, DiaSemana.LUNES, 5);

        const caja = new Caja(
            pedido,
            new Efectivo("Efectivo", TipoDeMetodoDePago.EFECTIVO)
        );

        const historial = new HistorialPedidos();

        expect(() => historial.registrarPedido(caja))
            .toThrow(/todavía no fue cobrado/);

        expect(historial.getCantidadPedidos()).toBe(0);
    });

    it("debe registrar un pedido cobrado", () => {
        const historial = new HistorialPedidos();
        const caja = crearCajaCobrado(1);

        historial.registrarPedido(caja);

        expect(historial.getCantidadPedidos()).toBe(1);
        expect(historial.buscarPedido(1)?.importeCobrado).toBe(10000);
    });

    it("debe devolver undefined cuando no encuentra un pedido", () => {
        const historial = new HistorialPedidos();

        expect(historial.buscarPedido(99)).toBeUndefined();
    });

    it("debe consultar todos los pedidos registrados", () => {
        const historial = new HistorialPedidos();

        historial.registrarPedido(crearCajaCobrado(1));
        historial.registrarPedido(crearCajaCobrado(2));

        const registros = historial.consultarHistorial();

        expect(registros.length).toBe(2);
        expect(registros[0].pedido.getIdPedido()).toBe(1);
        expect(registros[1].pedido.getIdPedido()).toBe(2);
        expect(registros[0].importeCobrado).toBe(10000);
    });

    it("debe devolver una copia de la lista del historial", () => {
        const historial = new HistorialPedidos();

        historial.registrarPedido(crearCajaCobrado(1));

        const registros = historial.consultarHistorial();
        registros.pop();

        expect(historial.getCantidadPedidos()).toBe(1);
    });

    it("debe buscar un pedido por su identificador", () => {
        const historial = new HistorialPedidos();

        historial.registrarPedido(crearCajaCobrado(10));

        const registro = historial.buscarPedido(10);

        expect(registro).toBeDefined();
        expect(registro?.pedido.getIdPedido()).toBe(10);
    });
});