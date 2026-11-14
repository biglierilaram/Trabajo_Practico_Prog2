import { DiaSemana } from "./Enums";
import { Pedido } from "./Pedido";

/**
 * Representa un pedido que se entrega en el domicilio del cliente.
 *
 * Almacena la dirección de entrega y el costo del envío.
 */
export class PedidoEnvio extends Pedido {
    private domicilioPedido: string;
    private costoDeEnvio: number;

    /**
     * Crea un pedido con entrega a domicilio.
     *
     * @param idPedido Identificador del pedido.
     * @param diaDePedido Día de la semana en que se realiza el pedido.
     * @param domicilioPedido Dirección donde se entregará el pedido.
     * @param costoDeEnvio Importe correspondiente al envío.
     */
    public constructor(
        idPedido: number,
        diaDePedido: DiaSemana,
        domicilioPedido: string,
        costoDeEnvio: number
    ) {
        super(idPedido, diaDePedido);
        this.domicilioPedido = domicilioPedido;
        this.costoDeEnvio = costoDeEnvio;
    }

    /**
     * Obtiene el domicilio de entrega del pedido.
     *
     * @returns Dirección de entrega.
     */
    public getDomicilioPedido(): string {
        return this.domicilioPedido;
    }

    /**
     * Obtiene el costo de envío del pedido.
     *
     * @returns Importe del envío.
     */
    public getCostoDeEnvio(): number {
        return this.costoDeEnvio;
    }
}