
import { Caja } from "./Caja";

const DIVISOR_PORCENTUAL: number = 100;

export abstract class Descuento {
    protected porcentajeDescuento: number;

    public constructor(porcentajeDescuento: number) {
        this.porcentajeDescuento = porcentajeDescuento;
    }

    public abstract esAplicable(condicion: Caja): boolean;

    public cantidadDeDescuento(cantidad: number): number {
        return cantidad * this.porcentajeDescuento / DIVISOR_PORCENTUAL;
    }

    public getPorcentajeDescuento(): number {
        return this.porcentajeDescuento;
    }

    public aplicarDescuento(precio: number): number {
        return precio - (
            precio * this.porcentajeDescuento / DIVISOR_PORCENTUAL
        );
    }
}