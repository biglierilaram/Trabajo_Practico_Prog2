import { Articulo } from "./Articulo";
import { EstadoItem } from "./Enums";
import { Item } from "./Item";
import { PrecioCombo } from "./PrecioCombo";

export class Combo extends Item {
    private articulos: Articulo[];
    private estrategiaPrecio: PrecioCombo;

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

    public precioFinal(): number {
        let precioOriginal: number = 0;

        for (const articulo of this.articulos) {
            precioOriginal += articulo.precioFinal();
        }

        return this.estrategiaPrecio.calcularPrecio(precioOriginal);
    }

    public getArticulos(): Articulo[] {
        return [...this.articulos];
    }

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

    public override iniciarPreparacion(): void {
        throw new Error(
            "Los componentes de un combo se preparan individualmente."
        );
    }

    public override finalizarPreparacion(): void {
        throw new Error(
            "Los componentes de un combo se finalizan individualmente."
        );
    }
}