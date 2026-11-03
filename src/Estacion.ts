import { TipoDeEstacion, EstadoItem } from "./Enums";
import { Item } from "./Item";

export class Estacion {
    private tipoDeEstacion: TipoDeEstacion;
    private colaDeItems: Item[];
    private itemEnPreparacion: Item | null;

    public constructor(tipoDeEstacion: TipoDeEstacion) {
        this.tipoDeEstacion = tipoDeEstacion;
        this.colaDeItems = [];
        this.itemEnPreparacion = null;
    }

    public recibirItem(item: Item): void {
        if (item.getEstado() !== EstadoItem.PENDIENTE) {
            throw new Error(
                "La estación solo puede recibir ítems pendientes."
            );
        }

        this.colaDeItems.push(item);
    }

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

    public getTipoDeEstacion(): TipoDeEstacion {
        return this.tipoDeEstacion;
    }

    public getCantidadItemsEnEspera(): number {
        return this.colaDeItems.length;
    }

    public getItemEnPreparacion(): Item | null {
        return this.itemEnPreparacion;
    }
}