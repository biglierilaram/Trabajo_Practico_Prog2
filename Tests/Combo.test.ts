import { describe, it, expect } from "@jest/globals";
import { Articulo } from "../src/Articulo";
import { Combo } from "../src/Combo";
import { DescuentoFijoCombo } from "../src/DescuentoFijoCombo";
import { DescuentoPorcentualCombo } from "../src/DescuentoPorcentualCombo";
import {
    Categoria,
    EstadoItem,
    TipoDeEstacion
} from "../src/Enums";

function crearArticulo(nombre: string, precio: number): Articulo {
    return new Articulo(
        nombre,
        1,
        precio,
        Categoria.PLATOPRINCIPAL,
        TipoDeEstacion.CARNES
    );
}

describe("Combo", () => {
    it("debe calcular el precio aplicando un descuento fijo", () => {
        const combo = new Combo(
            "Combo clásico",
            1,
            [
                crearArticulo("Hamburguesa", 5000),
                crearArticulo("Papas", 2000)
            ],
            new DescuentoFijoCombo(1000)
        );

        expect(combo.precioFinal()).toBe(6000);
    });

    it("debe calcular el precio aplicando un descuento porcentual", () => {
        const combo = new Combo(
            "Combo clásico",
            1,
            [
                crearArticulo("Hamburguesa", 5000),
                crearArticulo("Papas", 2000)
            ],
            new DescuentoPorcentualCombo(10)
        );

        expect(combo.precioFinal()).toBe(6300);
    });

    it("no debe permitir crear un combo vacío", () => {
        expect(
            () => new Combo(
                "Combo vacío",
                1,
                [],
                new DescuentoFijoCombo(500)
            )
        ).toThrow(/Un combo debe contener al menos un artículo/);
    });

    it("debe devolver una copia de sus artículos", () => {
        const articulo = crearArticulo("Hamburguesa", 5000);
        const combo = new Combo(
            "Combo clásico",
            1,
            [articulo],
            new DescuentoFijoCombo(0)
        );

        const articulos = combo.getArticulos();
        articulos.pop();

        expect(combo.getArticulos().length).toBe(1);
    });

    it("debe estar pendiente si todos sus artículos están pendientes", () => {
        const combo = new Combo(
            "Combo clásico",
            1,
            [crearArticulo("Hamburguesa", 5000)],
            new DescuentoFijoCombo(0)
        );

        expect(combo.getEstado()).toBe(EstadoItem.PENDIENTE);
    });

    it("debe estar en preparación si algún artículo comenzó", () => {
        const articulo = crearArticulo("Hamburguesa", 5000);
        const combo = new Combo(
            "Combo clásico",
            1,
            [articulo, crearArticulo("Papas", 2000)],
            new DescuentoFijoCombo(0)
        );

        articulo.iniciarPreparacion();

        expect(combo.getEstado()).toBe(EstadoItem.EN_PREPARACION);
    });

    it("debe estar listo cuando todos sus artículos están listos", () => {
        const articulo = crearArticulo("Hamburguesa", 5000);
        const combo = new Combo(
            "Combo clásico",
            1,
            [articulo],
            new DescuentoFijoCombo(0)
        );

        articulo.iniciarPreparacion();
        articulo.finalizarPreparacion();

        expect(combo.getEstado()).toBe(EstadoItem.LISTO);
    });

    it("no debe permitir iniciar la preparación directamente", () => {
        const combo = new Combo(
            "Combo clásico",
            1,
            [crearArticulo("Hamburguesa", 5000)],
            new DescuentoFijoCombo(0)
        );

        expect(() => combo.iniciarPreparacion())
            .toThrow(/Los componentes de un combo se preparan individualmente/);
    });

    it("no debe permitir finalizar la preparación directamente", () => {
        const combo = new Combo(
            "Combo clásico",
            1,
            [crearArticulo("Hamburguesa", 5000)],
            new DescuentoFijoCombo(0)
        );

        expect(() => combo.finalizarPreparacion())
            .toThrow(/Los componentes de un combo se finalizan individualmente/);
    });
});