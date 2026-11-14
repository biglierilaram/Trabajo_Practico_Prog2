import { DiaSemana } from "./Enums";
import { Item } from "./Item";
import { Pedido } from "./Pedido";

/**
 * Representa un pedido realizado para consumir en una mesa del restaurante.
 *
 * Permite corregir el pedido eliminando los artículos agregados
 * desde un artículo determinado hasta el último.
 */
export class PedidoSalon extends Pedido {
    private numeroDeMesa: number;

    /**
     * Crea un pedido para una mesa determinada.
     *
     * @param idPedido Identificador del pedido.
     * @param diaDePedido Día de la semana en que se realiza el pedido.
     * @param numeroDeMesa Número de mesa asignada.
     */
    public constructor(
        idPedido: number,
        diaDePedido: DiaSemana,
        numeroDeMesa: number
    ) {
        super(idPedido, diaDePedido);
        this.numeroDeMesa = numeroDeMesa;
    }

    /**
     * Obtiene el número de mesa asociado al pedido.
     *
     * @returns Número de mesa.
     */
    public getNumeroDeMesa(): number {
        return this.numeroDeMesa;
    }

    /**
     * Elimina el artículo indicado y todos los artículos agregados después.
     *
     * @param item Artículo desde el cual se desea corregir el pedido.
     * @throws Error si el pedido ya fue confirmado.
     */
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

    /**
     * Verifica que el pedido pueda corregirse.
     *
     * @throws Error si el pedido ya fue confirmado.
     */
    private validarCorreccion(): void {
        if (this.estaConfirmado()) {
            throw new Error(
                "No se puede corregir un pedido que ya fue confirmado."
            );
        }
    }
}