import { TipoDeMetodoDePago } from "./Enums";

/**
 * Clase abstracta que representa un método de pago.
 *
 * Define el nombre y el tipo de método de pago utilizado.
 */
export abstract class MetodoDePago {
    protected nombreMetodoDePago: string;
    protected tipoDeMetodoDePago: TipoDeMetodoDePago;

    /**
     * Crea un método de pago.
     *
     * @param nombreMetodoDePago Nombre del método de pago.
     * @param tipoDeMetodoDePago Tipo de método de pago.
     */
    public constructor(
        nombreMetodoDePago: string,
        tipoDeMetodoDePago: TipoDeMetodoDePago
    ) {
        this.nombreMetodoDePago = nombreMetodoDePago;
        this.tipoDeMetodoDePago = tipoDeMetodoDePago;
    }

    /**
     * Obtiene el nombre del método de pago.
     *
     * @returns Nombre del método de pago.
     */
    public getMetodoDePago(): string {
        return this.nombreMetodoDePago;
    }

    /**
     * Obtiene el tipo de método de pago.
     *
     * @returns Tipo de método de pago.
     */
    public getTipoDeMetodoDePago(): TipoDeMetodoDePago {
        return this.tipoDeMetodoDePago;
    }
}