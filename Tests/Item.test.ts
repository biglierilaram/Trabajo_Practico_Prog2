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

        expect(articulo.getEstado()).toBe(EstadoItem.PENDIENTE);
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

        expect(articulo.getEstado()).toBe(EstadoItem.EN_PREPARACION);
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

        expect(articulo.getEstado()).toBe(EstadoItem.LISTO);
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

        expect(() => articulo.iniciarPreparacion()).toThrow(
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

        expect(() => articulo.finalizarPreparacion()).toThrow(
            /Solo se puede finalizar/
        );
    });
});