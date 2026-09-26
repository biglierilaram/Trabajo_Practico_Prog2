import { TipoDeMetodoDePago } from "./Enums";

export abstract class MetodoDePago{
protected NombreMetodoDePago: string ;
protected TipoDeMetodoDePago: TipoDeMetodoDePago ;

constructor(NombreMetodoDePago: string, TipoDeMetodoDePago: TipoDeMetodoDePago){
this.NombreMetodoDePago= NombreMetodoDePago
this.TipoDeMetodoDePago= TipoDeMetodoDePago
}

public GetMetodoDePago(): string {
    return this.NombreMetodoDePago } ;

public GetTipoDeMetodoDePago():TipoDeMetodoDePago {
    return this.TipoDeMetodoDePago } ;
}