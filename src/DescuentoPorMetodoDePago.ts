import { TipoDeMetodoDePago } from "./Enums";
import { Descuento } from "./Descuento";
import { Caja } from "./Caja";

/**
 * Estrategia de descuento que se aplica cuando el pedido
 * se abona mediante un método de pago específico.
 */
export class DescuentoPorMetodoDePago extends Descuento {
    private tipoDeMetodoDePago: TipoDeMetodoDePago;

    /**
     * Crea un descuento asociado a un método de pago.
     *
     * @param porcentajeDescuento Porcentaje de descuento.
     * @param tipoDeMetodoDePago Método de pago requerido para aplicar el descuento.
     */
    public constructor(
        porcentajeDescuento: number,
        tipoDeMetodoDePago: TipoDeMetodoDePago
    ) {
        super(porcentajeDescuento);
        this.tipoDeMetodoDePago = tipoDeMetodoDePago;
    }

    /**
     * Comprueba si el método de pago de la caja coincide
     * con el requerido por esta estrategia.
     *
     * @param total Caja que se evalúa.
     * @returns true si coincide el método de pago; false en caso contrario.
     */
    public override esAplicable(total: Caja): boolean {
        return total.getMetodoDePago() === this.tipoDeMetodoDePago;
    }
}