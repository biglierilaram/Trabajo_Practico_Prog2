import { Articulo } from "./Articulo";
import { EstadoItem } from "./Enums";
import { Item } from "./Item";
import { PrecioCombo } from "./PrecioCombo";

/**
 * Representa un combo compuesto por varios artículos.
 *
 * El precio final se calcula utilizando una estrategia de precios,
 * permitiendo aplicar distintos criterios de descuento.
 */
export class Combo extends Item {
    private articulos: Articulo[];
    private estrategiaPrecio: PrecioCombo;

    /**
     * Crea un combo con sus artículos y la estrategia de precios.
     *
     * @param nombre Nombre del combo.
     * @param idItem Identificador del combo.
     * @param articulos Artículos que componen el combo.
     * @param estrategiaPrecio Estrategia utilizada para calcular su precio.
     * @throws Error si el combo no contiene artículos.
     */
    public constructor(
        nombre: string,
        idItem: number,
        articulos: Articulo[],
        estrategiaPrecio: PrecioCombo
    ) {
        super(nombre, idItem);

        if (articulos.length === 0) {
            throw new Error(
                "Un combo debe contener al menos un artículo."
            );
        }

        this.articulos = [...articulos];
        this.estrategiaPrecio = estrategiaPrecio;
    }

    /**
     * Calcula el precio original sumando sus artículos y aplica
     * la estrategia de precios correspondiente.
     *
     * @returns Precio final del combo.
     */
    public precioFinal(): number {
        let precioOriginal: number = 0;

        for (const articulo of this.articulos) {
            precioOriginal += articulo.precioFinal();
        }

        return this.estrategiaPrecio.calcularPrecio(precioOriginal);
    }

    /**
     * Obtiene una copia de los artículos que componen el combo.
     *
     * @returns Lista de artículos del combo.
     */
    public getArticulos(): Articulo[] {
        return [...this.articulos];
    }

    /**
     * Determina el estado del combo según el estado de sus artículos.
     *
     * @returns LISTO si todos están listos, EN_PREPARACION si alguno
     * comenzó a prepararse o PENDIENTE si ninguno fue iniciado.
     */
    public override getEstado(): EstadoItem {
        const todosListos: boolean = this.articulos.every(
            (articulo: Articulo) =>
                articulo.getEstado() === EstadoItem.LISTO
        );

        if (todosListos) {
            return EstadoItem.LISTO;
        }

        const algunArticuloIniciado: boolean = this.articulos.some(
            (articulo: Articulo) =>
                articulo.getEstado() !== EstadoItem.PENDIENTE
        );

        if (algunArticuloIniciado) {
            return EstadoItem.EN_PREPARACION;
        }

        return EstadoItem.PENDIENTE;
    }

    /**
     * No permite iniciar la preparación directamente sobre el combo,
     * ya que sus artículos se preparan individualmente.
     *
     * @throws Error porque los componentes se preparan por separado.
     */
    public override iniciarPreparacion(): void {
        throw new Error(
            "Los componentes de un combo se preparan individualmente."
        );
    }

    /**
     * No permite finalizar la preparación directamente sobre el combo,
     * ya que sus artículos se finalizan individualmente.
     *
     * @throws Error porque los componentes se finalizan por separado.
     */
    public override finalizarPreparacion(): void {
        throw new Error(
            "Los componentes de un combo se finalizan individualmente."
        );
    }
}