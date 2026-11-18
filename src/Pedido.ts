import { DiaSemana, EstadoItem, EstadoPedido } from "./Enums";
import { Item } from "./Item";

/**
 * Clase abstracta que representa un pedido del restaurante.
 *
 * Contiene los artículos, el día del pedido y su estado.
 * Define las operaciones comunes para las distintas modalidades de pedido.
 */
export abstract class Pedido {
    private static readonly itemNoEncontrado: number = -1;
    private static readonly cantidadItemsAEliminar: number = 1;
    private static readonly cantidadMinimaItems: number = 0;

    protected idPedido: number;
    private diaDePedido: DiaSemana;
    private productosFinales: Item[];
    private estado: EstadoPedido;

    /**
     * Crea un pedido en estado de construcción.
     *
     * @param idPedido Identificador del pedido.
     * @param diaDePedido Día de la semana en que se realiza el pedido.
     */
    public constructor(idPedido: number, diaDePedido: DiaSemana) {
        this.idPedido = idPedido;
        this.diaDePedido = diaDePedido;
        this.productosFinales = [];
        this.estado = EstadoPedido.EN_CONSTRUCCION;
    }

    /**
     * Obtiene el identificador del pedido.
     *
     * @returns Identificador del pedido.
     */
    public getIdPedido(): number {
        return this.idPedido;
    }

    /**
     * Calcula el precio total de los artículos del pedido sin descuentos.
     *
     * @returns Suma de los precios finales de todos los artículos.
     */
    public calcularPrecioTotalPedidoSinDescuentos(): number {
        let precioTotal: number = 0;

        for (const item of this.productosFinales) {
            precioTotal += item.precioFinal();
        }

        return precioTotal;
    }

    /**
     * Agrega un artículo al pedido.
     *
     * @param item Artículo que se desea agregar.
     * @throws Error si el pedido ya fue confirmado.
     */
    public agregarItems(item: Item): void {
        this.validarEnConstruccion();
        this.productosFinales.push(item);
    }

    /**
     * Obtiene una copia de los artículos del pedido.
     *
     * @returns Lista de artículos del pedido.
     */
    public getItems(): Item[] {
        return [...this.productosFinales];
    }

    /**
     * Elimina el último artículo del pedido.
     *
     * Este método está protegido para que puedan utilizarlo
     * las clases derivadas.
     */
    protected quitarUltimoItem(): void {
        this.productosFinales.pop();
    }

    /**
     * Quita un artículo del pedido si todavía no comenzó su preparación.
     *
     * @param item Artículo que se desea quitar.
     * @throws Error si el pedido está confirmado o si el artículo
     * ya comenzó su preparación.
     */
    public quitarItem(item: Item): void {
        this.validarEnConstruccion();

        const indice: number = this.productosFinales.indexOf(item);

        if (indice === Pedido.itemNoEncontrado) {
            return;
        }

        if (item.getEstado() !== EstadoItem.PENDIENTE) {
            throw new Error(
                "No se puede quitar un ítem que comenzó su preparación."
            );
        }

        this.productosFinales.splice(
            indice,
            Pedido.cantidadItemsAEliminar
        );
    }

    /**
     * Confirma el pedido e impide que se siga modificando.
     *
     * @throws Error si el pedido ya fue confirmado o si no contiene ítems.
     */
    public confirmar(): void {
        this.validarEnConstruccion();

        if (this.productosFinales.length === Pedido.cantidadMinimaItems) {
            throw new Error(
                "No se puede confirmar un pedido sin ítems."
            );
        }

        this.estado = EstadoPedido.CONFIRMADO;
    }

    /**
     * Comprueba si el pedido fue confirmado.
     *
     * @returns true si está confirmado; false si continúa en construcción.
     */
    public estaConfirmado(): boolean {
        return this.estado === EstadoPedido.CONFIRMADO;
    }

    /**
     * Comprueba si todos los artículos del pedido están listos.
     *
     * @returns true si hay artículos y todos están listos; false en caso contrario.
     */
    public estanTodosLosItemsListos(): boolean {
        return (
            this.productosFinales.length > Pedido.cantidadMinimaItems &&
            this.productosFinales.every(
                (item: Item) => item.getEstado() === EstadoItem.LISTO
            )
        );
    }

    /**
     * Obtiene el día de la semana en que se realizó el pedido.
     *
     * @returns Día del pedido.
     */
    public getFechaPedido(): DiaSemana {
        return this.diaDePedido;
    }

    /**
     * Verifica que el pedido todavía esté en construcción.
     *
     * @throws Error si el pedido ya fue confirmado.
     */
    private validarEnConstruccion(): void {
        if (this.estado !== EstadoPedido.EN_CONSTRUCCION) {
            throw new Error(
                "No se puede modificar un pedido que ya fue confirmado."
            );
        }
    }
}