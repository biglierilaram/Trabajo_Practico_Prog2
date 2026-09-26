import { MetodoDePago } from "./MetodoDePago";
import { TipoDeMetodoDePago } from "./Enums";

export class BilleteraVirtual extends MetodoDePago{

constructor(NombreMetodoDePago: string, TipoDeMetodoDePago: TipoDeMetodoDePago){
    super(NombreMetodoDePago, TipoDeMetodoDePago);
};

}