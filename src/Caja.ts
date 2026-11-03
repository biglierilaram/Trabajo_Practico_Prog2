import { Pedido } from "./Pedido";
import { MetodoDePago } from "./MetodoDePago";
import { Descuento } from "./Descuento";
import { DiaSemana, TipoDeMetodoDePago } from "./Enums";

export class Caja {
    private pedidos: Pedido;
    private metodoDePago: MetodoDePago;

    public constructor(pedidos: Pedido, metodoDePago: MetodoDePago) {
        this.pedidos = pedidos;
        this.metodoDePago = metodoDePago;
    }

    public competenciaDeDescuentos(
        descuentos: Descuento[],
        precio: number
    ): number {
        let mejorPrecio: number = precio;

        for (const descuento of descuentos) {
            if (descuento.esAplicable(this)) {
                const precioConDescuento: number =
                    descuento.aplicarDescuento(precio);

                if (precioConDescuento < mejorPrecio) {
                    mejorPrecio = precioConDescuento;
                }
            }
        }

        return mejorPrecio;
    }

    public cobrarPrecioFinalConDescuento(
        descuentos: Descuento[]
    ): number {
        if (!this.pedidos.estanTodosLosItemsListos()) {
            throw new Error(
                "No se puede facturar un pedido hasta que todos sus ítems estén listos."
            );
        }

        const precio: number =
            this.pedidos.calcularPrecioTotalPedidoSinDescuentos();

        return this.competenciaDeDescuentos(descuentos, precio);
    }

    public getMetodoDePago(): TipoDeMetodoDePago {
        return this.metodoDePago.getTipoDeMetodoDePago();
    }

    public getDiaPedido(): DiaSemana {
        return this.pedidos.getFechaPedido();
    }
}