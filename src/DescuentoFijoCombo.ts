import { PrecioCombo } from "./PrecioCombo";

export class DescuentoFijoCombo extends PrecioCombo {
    private descuentoFijo: number;

    public constructor(descuentoFijo: number) {
        super();
        this.descuentoFijo = descuentoFijo;
    }

    public override calcularPrecio(precioOriginal: number): number {
        return precioOriginal - this.descuentoFijo;
    }
}