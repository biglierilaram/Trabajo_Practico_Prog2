import { MetodoDePago } from "./MetodoDePago";
import { TipoDeMetodoDePago } from "./Enums";

export class BilleteraVirtual extends MetodoDePago {
    public constructor(
        nombreMetodoDePago: string,
        tipoDeMetodoDePago: TipoDeMetodoDePago
    ) {
        super(nombreMetodoDePago, tipoDeMetodoDePago);
    }
}