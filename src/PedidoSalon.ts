import { DiaSemana } from "./Enums";
import { Pedido } from "./Pedido";

export class PedidoSalon extends Pedido {
    private numeroDeMesa: number;

    public constructor(
        idPedido: number,
        diaDePedido: DiaSemana,
        numeroDeMesa: number
    ) {
        super(idPedido, diaDePedido);
        this.numeroDeMesa = numeroDeMesa;
    }

    public getNumeroDeMesa(): number {
        return this.numeroDeMesa;
    }
}