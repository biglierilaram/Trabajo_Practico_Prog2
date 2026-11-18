import { describe, it, expect } from "@jest/globals";
import { Articulo } from "../src/Articulo";
import { Categoria, DiaSemana, TipoDeEstacion } from "../src/Enums";
import { Estacion } from "../src/Estacion";
import { PedidoSalon } from "../src/PedidoSalon";
import { Restaurante } from "../src/Restaurante";

describe("Restaurante", () => {
    it("debe confirmar el pedido y distribuir los artículos en sus estaciones", () => {
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

        expect(pedido.estaConfirmado()).toBe(true);
        expect(carnes.getCantidadItemsEnEspera()).toBe(1);
        expect(ensaladas.getCantidadItemsEnEspera()).toBe(1);
    });

    it("no debe distribuir un pedido si un artículo ya comenzó su preparación", () => {
        const carnes = new Estacion(TipoDeEstacion.CARNES);
        const restaurante = new Restaurante([carnes]);

        const pedido = new PedidoSalon(2, DiaSemana.MARTES, 3);

        const hamburguesa = new Articulo(
            "Hamburguesa", 1, 5000, Categoria.PLATOPRINCIPAL,
            TipoDeEstacion.CARNES
        );

        pedido.agregarItems(hamburguesa);
        hamburguesa.iniciarPreparacion();

        expect(() => restaurante.confirmarYDistribuirPedido(pedido))
            .toThrow(/Todos los artículos deben estar pendientes/);

        expect(pedido.estaConfirmado()).toBe(false);
        expect(carnes.getCantidadItemsEnEspera()).toBe(0);
    });

    it("no debe confirmar el pedido si falta una estación", () => {
        const carnes = new Estacion(TipoDeEstacion.CARNES);
        const restaurante = new Restaurante([carnes]);

        const pedido = new PedidoSalon(3, DiaSemana.MIERCOLES, 2);

        const postre = new Articulo(
            "Helado", 1, 2000, Categoria.POSTRE,
            TipoDeEstacion.POSTRES
        );

        pedido.agregarItems(postre);

        expect(() => restaurante.confirmarYDistribuirPedido(pedido))
            .toThrow(/No existe una estación/);

        expect(pedido.estaConfirmado()).toBe(false);
    });

    it("no debe confirmar un pedido vacío", () => {
        const restaurante = new Restaurante([]);

        const pedido = new PedidoSalon(4, DiaSemana.JUEVES, 1);

        expect(() => restaurante.confirmarYDistribuirPedido(pedido))
            .toThrow(/No se puede confirmar un pedido sin ítems/);

        expect(pedido.estaConfirmado()).toBe(false);
    });

    it("getEstacion debe devolver la estación solicitada", () => {
        const carnes = new Estacion(TipoDeEstacion.CARNES);
        const barra = new Estacion(TipoDeEstacion.BARRA);

        const restaurante = new Restaurante([carnes, barra]);

        expect(restaurante.getEstacion(TipoDeEstacion.BARRA)).toBe(barra);
    });

    it("getEstacion debe devolver undefined si no existe la estación", () => {
        const restaurante = new Restaurante([]);

        expect(restaurante.getEstacion(TipoDeEstacion.POSTRES)).toBeUndefined();
    });
});