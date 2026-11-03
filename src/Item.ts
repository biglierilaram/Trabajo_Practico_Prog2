
import { EstadoItem } from "./Enums";

export abstract class Item {
    protected nombre: string;
    protected idItem: number;
    private estado: EstadoItem;

    public constructor(
        nombre: string,
        idItem: number
    ) {
        this.nombre = nombre;
        this.idItem = idItem;
        this.estado = EstadoItem.PENDIENTE;
    }

    public abstract precioFinal(): number;

    public getEstado(): EstadoItem {
        return this.estado;
    }

    public iniciarPreparacion(): void {
        if (this.estado !== EstadoItem.PENDIENTE) {
            throw new Error(
                "Solo se puede iniciar la preparación de un ítem pendiente."
            );
        }

        this.estado = EstadoItem.EN_PREPARACION;
    }

    public finalizarPreparacion(): void {
        if (this.estado !== EstadoItem.EN_PREPARACION) {
            throw new Error(
                "Solo se puede finalizar la preparación de un ítem en preparación."
            );
        }

        this.estado = EstadoItem.LISTO;
    }
}
