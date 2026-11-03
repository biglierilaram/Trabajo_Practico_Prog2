import { DiaSemana } from "./Enums";
import { Pedido } from "./Pedido";

export class PedidoRetirar extends Pedido {
    private horarioDeRetiro: string;

    public constructor(
        idPedido: number,
        diaDePedido: DiaSemana,
        horarioDeRetiro: string
    ) {
        super(idPedido, diaDePedido);
        this.horarioDeRetiro = horarioDeRetiro;
    }

    public getHorarioDeRetiro(): string {
        return this.horarioDeRetiro;
    }
}