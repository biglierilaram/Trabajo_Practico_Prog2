import { Cliente } from "./cliente"
import { Pedido } from "./pedido"

export class PedidoRetirar extends Pedido {
    private horarioDeRetiro: string;

    constructor(idPedido: number, cliente: Cliente, horarioDeRetiro: string) {
        super(idPedido, cliente);
        this.horarioDeRetiro = horarioDeRetiro;
    }

    public getHorarioDeRetiro(): string {
        return this.horarioDeRetiro;
    }
}