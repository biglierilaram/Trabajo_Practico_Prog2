
import { DiaSemana } from "./Enums";
import { Descuento } from "./Descuento";
import { Caja } from "./Caja";

export class DescuentoPorDia extends Descuento {
    private diaDeLaSemana: DiaSemana;

    public constructor(
        porcentajeDescuento: number,
        diaDeLaSemana: DiaSemana
    ) {
        super(porcentajeDescuento);
        this.diaDeLaSemana = diaDeLaSemana;
    }

    public override esAplicable(total: Caja): boolean {
        return total.getDiaPedido() === this.diaDeLaSemana;
    }
}