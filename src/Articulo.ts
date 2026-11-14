import { Categoria, TipoDeEstacion } from "./Enums";
import { Item } from "./Item";

/**
 * Representa un artículo individual del restaurante.
 * Hereda de Item y define su precio y estación de preparación.
 */
export class Articulo extends Item {
    private precioArticulo: number;
    private categoria: Categoria;
    private estacion: TipoDeEstacion;

    /**
     * Crea un artículo con sus datos y características.
     *
     * @param nombre Nombre del artículo.
     * @param idItem Identificador del artículo.
     * @param precioArticulo Precio del artículo.
     * @param categoria Categoría a la que pertenece.
     * @param estacion Estación encargada de prepararlo.
     */
    public constructor(
        nombre: string,
        idItem: number,
        precioArticulo: number,
        categoria: Categoria,
        estacion: TipoDeEstacion
    ) {
        super(nombre, idItem);
        this.precioArticulo = precioArticulo;
        this.categoria = categoria;
        this.estacion = estacion;
    }

    /**
     * Obtiene el precio final del artículo.
     *
     * @returns Precio del artículo.
     */
    public precioFinal(): number {
        return this.precioArticulo;
    }

    /**
     * Obtiene la estación encargada de preparar el artículo.
     *
     * @returns Tipo de estación correspondiente.
     */
    public getEstacion(): TipoDeEstacion {
        return this.estacion;
    }
}