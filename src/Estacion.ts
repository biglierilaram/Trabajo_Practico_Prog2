import { TipoDeEstacion, EstadoItem } from "./Enums";
import { Item } from "./Item";

/**
 * Representa una estación de preparación del restaurante.
 *
 * Cada estación recibe artículos pendientes, los mantiene en una cola
 * y permite preparar un artículo a la vez.
 */
export class Estacion {
    private tipoDeEstacion: TipoDeEstacion;
    private colaDeItems: Item[];
    private itemEnPreparacion: Item | null;

    /**
     * Crea una estación para un tipo determinado de preparación.
     *
     * @param tipoDeEstacion Tipo de estación.
     */
    public constructor(tipoDeEstacion: TipoDeEstacion) {
        this.tipoDeEstacion = tipoDeEstacion;
        this.colaDeItems = [];
        this.itemEnPreparacion = null;
    }

    /**
     * Recibe un artículo y lo agrega al final de la cola de espera.
     *
     * @param item Artículo que se desea recibir.
     * @throws Error si el artículo no está pendiente.
     */
    public recibirItem(item: Item): void {
        if (item.getEstado() !== EstadoItem.PENDIENTE) {
            throw new Error(
                "La estación solo puede recibir ítems pendientes."
            );
        }

        this.colaDeItems.push(item);
    }

    /**
     * Toma el siguiente artículo de la cola e inicia su preparación.
     *
     * @returns Artículo cuya preparación comenzó.
     * @throws Error si ya hay otro artículo en preparación
     * o si no quedan artículos en espera.
     */
    public iniciarSiguienteItem(): Item {
        if (this.itemEnPreparacion !== null) {
            throw new Error(
                "La estación ya tiene un ítem en preparación."
            );
        }

        const siguienteItem: Item | undefined =
            this.colaDeItems.shift();

        if (siguienteItem === undefined) {
            throw new Error(
                "No hay ítems pendientes en esta estación."
            );
        }

        siguienteItem.iniciarPreparacion();
        this.itemEnPreparacion = siguienteItem;

        return siguienteItem;
    }

    /**
     * Finaliza la preparación del artículo que está siendo procesado.
     *
     * @returns Artículo cuya preparación finalizó.
     * @throws Error si no hay ningún artículo en preparación.
     */
    public finalizarItemActual(): Item {
        if (this.itemEnPreparacion === null) {
            throw new Error(
                "No hay ningún ítem en preparación."
            );
        }

        const itemFinalizado: Item = this.itemEnPreparacion;

        itemFinalizado.finalizarPreparacion();
        this.itemEnPreparacion = null;

        return itemFinalizado;
    }

    /**
     * Obtiene el tipo de estación.
     *
     * @returns Tipo de estación.
     */
    public getTipoDeEstacion(): TipoDeEstacion {
        return this.tipoDeEstacion;
    }

    /**
     * Obtiene la cantidad de artículos que esperan ser preparados.
     *
     * @returns Cantidad de artículos en la cola.
     */
    public getCantidadItemsEnEspera(): number {
        return this.colaDeItems.length;
    }

    /**
     * Obtiene el artículo que se encuentra en preparación.
     *
     * @returns Artículo en preparación o null si la estación está libre.
     */
    public getItemEnPreparacion(): Item | null {
        return this.itemEnPreparacion;
    }
}