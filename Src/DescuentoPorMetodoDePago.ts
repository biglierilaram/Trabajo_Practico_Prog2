import { TipoDeMetodoDePago } from "./Enums";
import { Descuento } from "./Descuento";
import { Caja } from "./Caja";

export class DescuentoPorMetodoDePago extends Descuento {
    private tipoDeMetodoDePago: TipoDeMetodoDePago;

    public constructor(
        porcentajeDescuento: number,
        tipoDeMetodoDePago: TipoDeMetodoDePago
    ) {
        super(porcentajeDescuento);
        this.tipoDeMetodoDePago = tipoDeMetodoDePago;
    }

    public override esAplicable(total: Caja): boolean {
        return total.getMetodoDePago() === this.tipoDeMetodoDePago;
    }
}