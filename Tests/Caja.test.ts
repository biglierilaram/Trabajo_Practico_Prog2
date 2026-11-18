import { Articulo } from "../src/Articulo";
import { BilleteraVirtual } from "../src/BilleteraVirtual";
import { Caja } from "../src/Caja";
import { DescuentoPorDia } from "../src/DescuentoPorDia";
import { DescuentoPorMetodoDePago } from "../src/DescuentoPorMetodoDePago";
import { Efectivo } from "../src/Efectivo";
import { PedidoEnvio } from "../src/PedidoEnvio";
import { PedidoSalon } from "../src/PedidoSalon";
import { Tarjetas } from "../src/Tarjetas";
import {
    Categoria,
    DiaSemana,
    TipoDeEstacion,
    TipoDeMetodoDePago
} from "../src/Enums";

function crearArticuloListo(): Articulo {
    const articulo = new Articulo(
        "Hamburguesa",
        1,
        10000,
        Categoria.PLATOPRINCIPAL,
        TipoDeEstacion.CARNES
    );

    articulo.iniciarPreparacion();
    articulo.finalizarPreparacion();

    return articulo;
}

function crearPedidoSalonListo(
    dia: DiaSemana = DiaSemana.LUNES
): PedidoSalon {
    const pedido = new PedidoSalon(1, dia, 5);
    pedido.agregarItems(crearArticuloListo());
    return pedido;
}

test("debe aplicar el descuento correspondiente al día", () => {
    const pedido = crearPedidoSalonListo(DiaSemana.MARTES);
    const efectivo = new Efectivo(
        "Efectivo",
        TipoDeMetodoDePago.EFECTIVO
    );

    const caja = new Caja(pedido, efectivo);
    const descuento = new DescuentoPorDia(15, DiaSemana.MARTES);

    expect(caja.competenciaDeDescuentos([descuento], 10000)).toBe(8500);
});

test("debe aplicar el descuento correspondiente al medio de pago", () => {
    const pedido = crearPedidoSalonListo();
    const efectivo = new Efectivo(
        "Efectivo",
        TipoDeMetodoDePago.EFECTIVO
    );

    const caja = new Caja(pedido, efectivo);
    const descuento = new DescuentoPorMetodoDePago(
        10,
        TipoDeMetodoDePago.EFECTIVO
    );

    expect(caja.competenciaDeDescuentos([descuento], 10000)).toBe(9000);
});

test("debe elegir el descuento que deja el menor precio", () => {
    const pedido = crearPedidoSalonListo(DiaSemana.MARTES);
    const efectivo = new Efectivo(
        "Efectivo",
        TipoDeMetodoDePago.EFECTIVO
    );

    const caja = new Caja(pedido, efectivo);

    const descuentos = [
        new DescuentoPorDia(15, DiaSemana.MARTES),
        new DescuentoPorMetodoDePago(
            10,
            TipoDeMetodoDePago.EFECTIVO
        )
    ];

    expect(caja.competenciaDeDescuentos(descuentos, 10000)).toBe(8500);
});

test("no debe aplicar descuentos que no correspondan", () => {
    const pedido = crearPedidoSalonListo(DiaSemana.LUNES);
    const efectivo = new Efectivo(
        "Efectivo",
        TipoDeMetodoDePago.EFECTIVO
    );

    const caja = new Caja(pedido, efectivo);

    const descuentos = [
        new DescuentoPorDia(15, DiaSemana.MARTES),
        new DescuentoPorMetodoDePago(
            10,
            TipoDeMetodoDePago.TARJETA
        )
    ];

    expect(caja.competenciaDeDescuentos(descuentos, 10000)).toBe(10000);
});

test("no debe cobrar un pedido cuyos artículos no están listos", () => {
    const pedido = new PedidoSalon(2, DiaSemana.LUNES, 3);

    const articulo = new Articulo(
        "Hamburguesa",
        2,
        10000,
        Categoria.PLATOPRINCIPAL,
        TipoDeEstacion.CARNES
    );

    pedido.agregarItems(articulo);

    const efectivo = new Efectivo(
        "Efectivo",
        TipoDeMetodoDePago.EFECTIVO
    );

    const caja = new Caja(pedido, efectivo);

    expect(() => caja.cobrarPrecioFinalConDescuento([]))
        .toThrow(/todos sus ítems estén listos/);

    expect(caja.getImporteCobrado()).toBeNull();
});

test("debe cobrar el pedido y guardar el importe cobrado", () => {
    const pedido = crearPedidoSalonListo();
    const efectivo = new Efectivo(
        "Efectivo",
        TipoDeMetodoDePago.EFECTIVO
    );

    const caja = new Caja(pedido, efectivo);

    const descuento = new DescuentoPorMetodoDePago(
        10,
        TipoDeMetodoDePago.EFECTIVO
    );

    expect(caja.cobrarPrecioFinalConDescuento([descuento])).toBe(9000);
    expect(caja.getImporteCobrado()).toBe(9000);
});

test("no debe permitir cobrar dos veces el mismo pedido", () => {
    const pedido = crearPedidoSalonListo();
    const efectivo = new Efectivo(
        "Efectivo",
        TipoDeMetodoDePago.EFECTIVO
    );

    const caja = new Caja(pedido, efectivo);

    caja.cobrarPrecioFinalConDescuento([]);

    expect(() => caja.cobrarPrecioFinalConDescuento([]))
        .toThrow(/Este pedido ya fue cobrado/);
});

test("debe sumar el costo de envío después de aplicar descuentos", () => {
    const pedido = new PedidoEnvio(
        3,
        DiaSemana.LUNES,
        "Calle 123",
        1500
    );

    pedido.agregarItems(crearArticuloListo());

    const efectivo = new Efectivo(
        "Efectivo",
        TipoDeMetodoDePago.EFECTIVO
    );

    const caja = new Caja(pedido, efectivo);

    const descuento = new DescuentoPorMetodoDePago(
        10,
        TipoDeMetodoDePago.EFECTIVO
    );

    expect(caja.cobrarPrecioFinalConDescuento([descuento])).toBe(10500);
    expect(pedido.getDomicilioPedido()).toBe("Calle 123");
    expect(pedido.getCostoDeEnvio()).toBe(1500);
});

test("debe devolver los datos del pedido y del medio de pago", () => {
    const pedido = crearPedidoSalonListo(DiaSemana.MARTES);

    const efectivo = new Efectivo(
        "Efectivo",
        TipoDeMetodoDePago.EFECTIVO
    );

    const caja = new Caja(pedido, efectivo);

    expect(caja.getMetodoDePago()).toBe(TipoDeMetodoDePago.EFECTIVO);
    expect(caja.getDiaPedido()).toBe(DiaSemana.MARTES);
    expect(caja.getPedido()).toBe(pedido);
});

test("los medios de pago deben devolver sus datos", () => {
    const efectivo = new Efectivo(
        "Efectivo",
        TipoDeMetodoDePago.EFECTIVO
    );

    const tarjeta = new Tarjetas(
        "Tarjeta",
        TipoDeMetodoDePago.TARJETA
    );

    const billetera = new BilleteraVirtual(
        "Billetera virtual",
        TipoDeMetodoDePago.BILLETERAVIRTUAL
    );

    expect(efectivo.getMetodoDePago()).toBe("Efectivo");
    expect(tarjeta.getMetodoDePago()).toBe("Tarjeta");
    expect(billetera.getMetodoDePago()).toBe("Billetera virtual");

    expect(efectivo.getTipoDeMetodoDePago())
        .toBe(TipoDeMetodoDePago.EFECTIVO);
    expect(tarjeta.getTipoDeMetodoDePago())
        .toBe(TipoDeMetodoDePago.TARJETA);
    expect(billetera.getTipoDeMetodoDePago())
        .toBe(TipoDeMetodoDePago.BILLETERAVIRTUAL);
});