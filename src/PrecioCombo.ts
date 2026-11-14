/**
 * Define la estrategia abstracta para calcular el precio de un combo.
 *
 * Las estrategias concretas implementan distintos criterios
 * para obtener el precio final.
 */
export abstract class PrecioCombo {

    /**
     * Calcula el precio final a partir del precio original.
     *
     * @param precioOriginal Suma de los precios de los artículos del combo.
     * @returns Precio resultante según la estrategia aplicada.
     */
    public abstract calcularPrecio(
        precioOriginal: number
    ): number;
}