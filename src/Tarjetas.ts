import { MetodoDePago } from "./MetodoDePago";
import { TipoDeMetodoDePago } from "./Enums";

export class Tarjetas extends MetodoDePago{

constructor(NombreMetodoDePago: string, TipoDeMetodoDePago: TipoDeMetodoDePago){
    super(NombreMetodoDePago, TipoDeMetodoDePago);
};

}