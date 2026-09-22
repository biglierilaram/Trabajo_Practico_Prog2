import { Cliente } from "./cliente";
import { Pedido } from "./pedidos";

export class PedidoSalon extends Pedido {
    private numeroDeMesa: number;

    constructor(idPedido: number, cliente: Cliente, numeroDeMesa: number) {
        super(idPedido, cliente);
        this.numeroDeMesa = numeroDeMesa;
    }

    public getNumeroDeMesa(): number {
        return this.numeroDeMesa;
    }
}