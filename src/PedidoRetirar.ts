import { DiaSemana } from "./Enums";
import { Item } from "./Item";
import { Pedido } from "./Pedido";

/**
 * Representa un pedido que el cliente realiza para retirar en el restaurante.
 *
 * Permite corregir el pedido eliminando los artículos agregados
 * desde un artículo determinado hasta el último.
 */
export class PedidoRetirar extends Pedido {
    private horarioDeRetiro: string;

    /**
     * Crea un pedido para retirar.
     *
     * @param idPedido Identificador del pedido.
     * @param diaDePedido Día de la semana en que se realiza el pedido.
     * @param horarioDeRetiro Horario acordado para retirar el pedido.
     */
    public constructor(
        idPedido: number,
        diaDePedido: DiaSemana,
        horarioDeRetiro: string
    ) {
        super(idPedido, diaDePedido);
        this.horarioDeRetiro = horarioDeRetiro;
    }

    /**
     * Obtiene el horario acordado para retirar el pedido.
     *
     * @returns Horario de retiro.
     */
    public getHorarioDeRetiro(): string {
        return this.horarioDeRetiro;
    }

    /**
     * Elimina el artículo indicado y todos los artículos agregados después.
     *
     * @param item Artículo desde el cual se desea corregir el pedido.
     * @throws Error si el pedido ya fue confirmado.
     */
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