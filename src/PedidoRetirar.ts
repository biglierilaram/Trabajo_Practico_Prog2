import { DiaSemana } from "./Enums";
import { Item } from "./Item";
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

    public quitarItemsHasta(item: Item): void {
        if (this.estaConfirmado()) {
            throw new Error(
                "No se puede corregir un pedido que ya fue confirmado."
            );
        }

        const items: Item[] = this.getItems();
        const indice: number = items.indexOf(item);

        if (indice === -1) {
            return;
        }

        while (this.getItems().length > indice) {
            this.quitarUltimoItem();
        }
    }
}