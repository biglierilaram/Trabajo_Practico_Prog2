import { DiaSemana } from "./Enums";
import { Descuento } from "./Descuento";
import { Caja } from "./Caja";

export class DescuentoPorDia extends Descuento {
private Dia: DiaSemana ;

constructor(PorcentajeDescuento:number, Dia: DiaSemana){
    super(PorcentajeDescuento);
    this.Dia= Dia;
}

public override esAplicable(total: Caja): boolean {
    return total.GetDiaPedido() === this.Dia;
}
}