import { Caja } from "./Caja";

const DIVISOR_PORCENTUAL: number = 100;

/**
 * Define la estrategia abstracta para aplicar descuentos sobre una caja.
 *
 * Las clases concretas determinan cuándo corresponde aplicar el descuento.
 */
export abstract class Descuento {
    protected porcentajeDescuento: number;

    /**
     * Crea una estrategia de descuento.
     *
     * @param porcentajeDescuento Porcentaje de descuento que se aplicará.
     */
    public constructor(porcentajeDescuento: number) {
        this.porcentajeDescuento = porcentajeDescuento;
    }

    /**
     * Determina si el descuento puede aplicarse a una caja.
     *
     * @param condicion Caja sobre la que se evalúa la aplicación del descuento.
     * @returns true si corresponde aplicar el descuento; false en caso contrario.
     */
    public abstract esAplicable(condicion: Caja): boolean;

    /**
     * Calcula el importe correspondiente al descuento.
     *
     * @param cantidad Importe sobre el que se calcula el descuento.
     * @returns Importe descontado.
     */
    public cantidadDeDescuento(cantidad: number): number {
        return cantidad * this.porcentajeDescuento / DIVISOR_PORCENTUAL;
    }

    /**
     * Obtiene el porcentaje configurado para el descuento.
     *
     * @returns Porcentaje de descuento.
     */
    public getPorcentajeDescuento(): number {
        return this.porcentajeDescuento;
    }

    /**
     * Calcula el precio luego de aplicar el descuento porcentual.
     *
     * @param precio Precio original.
     * @returns Precio con el descuento aplicado.
     */
    public aplicarDescuento(precio: number): number {
        return precio - (
            precio * this.porcentajeDescuento / DIVISOR_PORCENTUAL
        );
    }
}