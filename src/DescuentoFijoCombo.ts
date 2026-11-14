import { PrecioCombo } from "./PrecioCombo";

/**
 * Estrategia que aplica un descuento de importe fijo al precio de un combo.
 */
export class DescuentoFijoCombo extends PrecioCombo {
    private descuentoFijo: number;

    /**
     * Crea una estrategia de descuento fijo.
     *
     * @param descuentoFijo Importe que se resta al precio original.
     */
    public constructor(descuentoFijo: number) {
        super();
        this.descuentoFijo = descuentoFijo;
    }

    /**
     * Calcula el precio restando el descuento fijo.
     *
     * @param precioOriginal Precio original del combo.
     * @returns Precio con el descuento fijo aplicado.
     */
    public override calcularPrecio(precioOriginal: number): number {
        return precioOriginal - this.descuentoFijo;
    }
}