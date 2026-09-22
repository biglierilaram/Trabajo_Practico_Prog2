import { Cliente } from "./cliente";
import { Pedido } from "./pedido";

export class pedidoEnvio extends Pedido {
    private direccion: string;

    constructor(idPedido: number, cliente: Cliente, direccion: string) {
        super(idPedido, cliente);
        this.direccion = direccion;
    }

    public getDireccion(): string {
        return this.direccion;
    }

    public calcularEnvio (): number { 
        return 2000;
    }
}