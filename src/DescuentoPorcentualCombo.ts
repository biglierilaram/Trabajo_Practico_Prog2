import { PrecioCombo } from "./PrecioCombo";

const PORCENTAJE_MINIMO: number = 0;
const PORCENTAJE_MAXIMO: number = 100;
const DIVISOR_PORCENTUAL: number = 100;

/**
 * Estrategia que aplica un descuento porcentual al precio de un combo.
 */
export class DescuentoPorcentualCombo extends PrecioCombo {
    private porcentajeDescuento: number;

    /**
     * Crea una estrategia de descuento porcentual.
     *
     * @param porcentajeDescuento Porcentaje de descuento, entre 0 y 100.
     * @throws Error si el porcentaje no es finito o está fuera del rango permitido.
     */
    public constructor(porcentajeDescuento: number) {
        super();

        if (
            !Number.isFinite(porcentajeDescuento) ||
            porcentajeDescuento < PORCENTAJE_MINIMO ||
            porcentajeDescuento > PORCENTAJE_MAXIMO
        ) {
            throw new Error(
                "El descuento porcentual debe estar entre 0 y 100."
            );
        }

        this.porcentajeDescuento = porcentajeDescuento;
    }

    /**
     * Calcula el precio aplicando el porcentaje de descuento.
     *
     * @param precioOriginal Precio original del combo.
     * @returns Precio con el descuento porcentual aplicado.
     */
    public override calcularPrecio(precioOriginal: number): number {
        return precioOriginal -
            (precioOriginal * this.porcentajeDescuento / DIVISOR_PORCENTUAL);
    }
}