import { DiaSemana } from "./Enums";
import { Descuento } from "./Descuento";
import { Caja } from "./Caja";

/**
 * Estrategia de descuento que se aplica únicamente en un día específico
 * de la semana.
 */
export class DescuentoPorDia extends Descuento {
    private diaDeLaSemana: DiaSemana;

    /**
     * Crea un descuento asociado a un día de la semana.
     *
     * @param porcentajeDescuento Porcentaje de descuento.
     * @param diaDeLaSemana Día en el que se puede aplicar el descuento.
     */
    public constructor(
        porcentajeDescuento: number,
        diaDeLaSemana: DiaSemana
    ) {
        super(porcentajeDescuento);
        this.diaDeLaSemana = diaDeLaSemana;
    }

    /**
     * Comprueba si el día del pedido coincide con el día configurado.
     *
     * @param total Caja que se evalúa.
     * @returns true si coincide el día; false en caso contrario.
     */
    public override esAplicable(total: Caja): boolean {
        return total.getDiaPedido() === this.diaDeLaSemana;
    }
}