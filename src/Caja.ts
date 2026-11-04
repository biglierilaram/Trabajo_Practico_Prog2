import { Pedido } from "./Pedido";
import { MetodoDePago } from "./MetodoDePago";
import { Descuento } from "./Descuento";
import { DiaSemana, TipoDeMetodoDePago } from "./Enums";
import { PedidoEnvio } from "./PedidoEnvio";

export class Caja {
    private pedidos: Pedido;
    private metodoDePago: MetodoDePago;
    private importeCobrado: number | null;

    public constructor(pedidos: Pedido, metodoDePago: MetodoDePago) {
        this.pedidos = pedidos;
        this.metodoDePago = metodoDePago;
        this.importeCobrado = null;
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
        if (this.importeCobrado !== null) {
            throw new Error("Este pedido ya fue cobrado.");
        }

        if (!this.pedidos.estanTodosLosItemsListos()) {
            throw new Error(
                "No se puede facturar un pedido hasta que todos sus ítems estén listos."
            );
        }

        const precio: number =
            this.pedidos.calcularPrecioTotalPedidoSinDescuentos();

        let importeFinal: number = this.competenciaDeDescuentos(
            descuentos,
            precio
        );

        if (this.pedidos instanceof PedidoEnvio) {
            importeFinal += this.pedidos.getCostoDeEnvio();
        }

        this.importeCobrado = importeFinal;

        return this.importeCobrado;
    }

    public getImporteCobrado(): number | null {
        return this.importeCobrado;
    }

    public getMetodoDePago(): TipoDeMetodoDePago {
        return this.metodoDePago.getTipoDeMetodoDePago();
    }

    public getDiaPedido(): DiaSemana {
        return this.pedidos.getFechaPedido();
    }

    public getPedido(): Pedido {
        return this.pedidos;
    }
}