import { PrecioCombo } from "./PrecioCombo";

const PORCENTAJE_MINIMO: number = 0;
const PORCENTAJE_MAXIMO: number = 100;
const DIVISOR_PORCENTUAL: number = 100;

export class DescuentoPorcentualCombo extends PrecioCombo {
    private porcentajeDescuento: number;

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

    public override calcularPrecio(precioOriginal: number): number {
        return precioOriginal -
            (precioOriginal * this.porcentajeDescuento / DIVISOR_PORCENTUAL);
    }
}