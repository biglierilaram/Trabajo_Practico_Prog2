import { TipoDeMetodoDePago } from "./Enums";
import { Descuento } from "./Descuento";
import { Caja } from "./Caja";

export class DescuentoPorMetodoDePago extends Descuento {
private MetodoDePago: TipoDeMetodoDePago ;

constructor(PorcentajeDescuento:number, MetodoDePago: TipoDeMetodoDePago){
    super(PorcentajeDescuento);
    this.MetodoDePago= MetodoDePago;
}

public override esAplicable(total: Caja): boolean {
        return total.GetMetodoDePago() === this.MetodoDePago ;
    }
}