import { MetodoDePago } from "./MetodoDePago";
import { TipoDeMetodoDePago } from "./Enums";

/**
 * Representa el pago realizado en efectivo.
 */
export class Efectivo extends MetodoDePago {

    /**
     * Crea un método de pago en efectivo.
     *
     * @param nombreMetodoDePago Nombre del método de pago.
     * @param tipoDeMetodoDePago Tipo de método de pago.
     */
    public constructor(
        nombreMetodoDePago: string,
        tipoDeMetodoDePago: TipoDeMetodoDePago
    ) {
        super(nombreMetodoDePago, tipoDeMetodoDePago);
    }
}