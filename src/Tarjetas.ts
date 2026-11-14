import { MetodoDePago } from "./MetodoDePago";
import { TipoDeMetodoDePago } from "./Enums";

/**
 * Representa el pago realizado mediante tarjeta.
 */
export class Tarjetas extends MetodoDePago {

    /**
     * Crea un método de pago con tarjeta.
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