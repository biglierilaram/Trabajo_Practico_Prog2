import { Pedido } from "./Pedido";
import { MetodoDePago } from "./MetodoDePago";
import { Descuento } from "./Descuento";
import { DiaSemana, TipoDeMetodoDePago } from "./Enums";
import { PedidoEnvio } from "./PedidoEnvio";

/**
 * Representa la caja encargada de calcular y registrar
 * el importe final de un pedido.
 *
 * Evalúa los descuentos aplicables y utiliza el de menor precio
 * para determinar el importe a cobrar.
 */
export class Caja {
    private pedidos: Pedido;
    private metodoDePago: MetodoDePago;
    private importeCobrado: number | null;

    /**
     * Crea una caja asociada a un pedido y a un método de pago.
     *
     * @param pedidos Pedido que se va a cobrar.
     * @param metodoDePago Método de pago elegido.
     */
    public constructor(pedidos: Pedido, metodoDePago: MetodoDePago) {
        this.pedidos = pedidos;
        this.metodoDePago = metodoDePago;
        this.importeCobrado = null;
    }

    /**
     * Evalúa los descuentos disponibles y selecciona el que
     * produce el menor precio final.
     *
     * @param descuentos Lista de estrategias de descuento.
     * @param precio Precio original sobre el que se aplican los descuentos.
     * @returns El menor precio obtenido, o el precio original si ninguno aplica.
     */
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

    /**
     * Calcula y registra el importe final del pedido.
     *
     * Verifica que el pedido no haya sido cobrado previamente
     * y que todos sus artículos estén listos. En pedidos de envío,
     * suma el costo de envío después de aplicar los descuentos.
     *
     * @param descuentos Lista de estrategias de descuento disponibles.
     * @returns Importe final cobrado.
     * @throws Error si el pedido ya fue cobrado o si todavía hay
     * artículos que no están listos.
     */
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

    /**
     * Obtiene el importe registrado luego del cobro.
     *
     * @returns Importe cobrado o null si todavía no se realizó el cobro.
     */
    public getImporteCobrado(): number | null {
        return this.importeCobrado;
    }

    /**
     * Obtiene el tipo de método de pago utilizado.
     *
     * @returns Tipo de método de pago.
     */
    public getMetodoDePago(): TipoDeMetodoDePago {
        return this.metodoDePago.getTipoDeMetodoDePago();
    }

    /**
     * Obtiene el día de la semana en que se realizó el pedido.
     *
     * @returns Fecha del pedido expresada como día de la semana.
     */
    public getDiaPedido(): DiaSemana {
        return this.pedidos.getFechaPedido();
    }

    /**
     * Obtiene el pedido asociado a la caja.
     *
     * @returns Pedido que se está cobrando.
     */
    public getPedido(): Pedido {
        return this.pedidos;
    }
}