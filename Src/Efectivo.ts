import { MetodoDePago } from "./MetodoDePago";
import { TipoDeMetodoDePago } from "./Enums";

export class Efectivo extends MetodoDePago {
    public constructor(
        nombreMetodoDePago: string,
        tipoDeMetodoDePago: TipoDeMetodoDePago
    ) {
        super(nombreMetodoDePago, tipoDeMetodoDePago);
    }
}
