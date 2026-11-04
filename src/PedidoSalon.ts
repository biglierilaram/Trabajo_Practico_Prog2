import { DiaSemana } from "./Enums";
import { Item } from "./Item";
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

    public quitarItemsHasta(item: Item): void {
        this.validarCorreccion();

        const items: Item[] = this.getItems();
        const indice: number = items.indexOf(item);

        if (indice === -1) {
            return;
        }

        while (this.getItems().length > indice) {
            this.quitarUltimoItem();
        }
    }

    private validarCorreccion(): void {
        if (this.estaConfirmado()) {
            throw new Error(
                "No se puede corregir un pedido que ya fue confirmado."
            );
        }
    }
}