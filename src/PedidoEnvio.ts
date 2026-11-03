import { DiaSemana } from "./Enums";
import { Pedido } from "./Pedido";

export class PedidoEnvio extends Pedido {
    private domicilioPedido: string;
    private costoDeEnvio: number;

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

    public getDomicilioPedido(): string {
        return this.domicilioPedido;
    }

    public getCostoDeEnvio(): number {
        return this.costoDeEnvio;
    }
}