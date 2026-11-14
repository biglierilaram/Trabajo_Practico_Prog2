import { EstadoItem } from "./Enums";

/**
 * Representa un ítem del pedido.
 * Es la clase abstracta base de Articulo y Combo.
 */
export abstract class Item {
    protected nombre: string;
    protected idItem: number;
    private estado: EstadoItem;

    /**
     * Crea un ítem e inicializa su estado como pendiente.
     *
     * @param nombre Nombre del ítem.
     * @param idItem Identificador del ítem.
     */
    public constructor(
        nombre: string,
        idItem: number
    ) {
        this.nombre = nombre;
        this.idItem = idItem;
        this.estado = EstadoItem.PENDIENTE;
    }

    /**
     * Calcula el precio final del ítem.
     * Cada clase concreta implementa su propio cálculo.
     *
     * @returns Precio final del ítem.
     */
    public abstract precioFinal(): number;

    /**
     * Obtiene el estado actual del ítem.
     *
     * @returns Estado actual del ítem.
     */
    public getEstado(): EstadoItem {
        return this.estado;
    }

    /**
     * Inicia la preparación del ítem.
     *
     * @throws Error si el ítem no está pendiente.
     */
    public iniciarPreparacion(): void {
        if (this.estado !== EstadoItem.PENDIENTE) {
            throw new Error(
                "Solo se puede iniciar la preparación de un ítem pendiente."
            );
        }

        this.estado = EstadoItem.EN_PREPARACION;
    }

    /**
     * Finaliza la preparación del ítem.
     *
     * @throws Error si el ítem no está en preparación.
     */
    public finalizarPreparacion(): void {
        if (this.estado !== EstadoItem.EN_PREPARACION) {
            throw new Error(
                "Solo se puede finalizar la preparación de un ítem en preparación."
            );
        }

        this.estado = EstadoItem.LISTO;
    }
}