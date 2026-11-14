import { Articulo } from "./Articulo";
import { Combo } from "./Combo";
import { Estacion } from "./Estacion";
import { EstadoItem, TipoDeEstacion } from "./Enums";
import { Item } from "./Item";
import { Pedido } from "./Pedido";

/**
 * Representa el restaurante y coordina la distribución de los artículos
 * de los pedidos hacia sus respectivas estaciones de preparación.
 */
export class Restaurante {
    private estaciones: Estacion[];

    /**
     * Crea un restaurante con las estaciones disponibles.
     *
     * @param estaciones Estaciones que forman parte del restaurante.
     */
    public constructor(estaciones: Estacion[]) {
        this.estaciones = [...estaciones];
    }

    /**
     * Confirma un pedido y distribuye sus artículos entre las estaciones.
     *
     * Si el pedido contiene combos, se distribuyen sus artículos individuales.
     * Antes de confirmar, verifica que todos los artículos estén pendientes
     * y que exista una estación correspondiente para cada uno.
     *
     * @param pedido Pedido que se desea confirmar y distribuir.
     * @throws Error si existe un tipo de ítem no reconocido, algún artículo
     * no está pendiente o falta una estación correspondiente.
     */
    public confirmarYDistribuirPedido(pedido: Pedido): void {
        const articulosAEnviar: Articulo[] = [];

        // Primero identificamos todos los artículos del pedido.
        for (const item of pedido.getItems()) {
            if (item instanceof Articulo) {
                articulosAEnviar.push(item);
            } else if (item instanceof Combo) {
                articulosAEnviar.push(...item.getArticulos());
            } else {
                throw new Error("Tipo de ítem no reconocido.");
            }
        }

        // Validamos que todos puedan ser distribuidos.
        for (const articulo of articulosAEnviar) {
            if (articulo.getEstado() !== EstadoItem.PENDIENTE) {
                throw new Error(
                    "Todos los artículos deben estar pendientes para distribuir el pedido."
                );
            }

            this.buscarEstacion(articulo.getEstacion());
        }

        // Si todas las validaciones pasan, confirmamos y distribuimos.
        pedido.confirmar();

        for (const articulo of articulosAEnviar) {
            this.buscarEstacion(articulo.getEstacion()).recibirItem(articulo);
        }
    }

    /**
     * Busca la estación correspondiente al tipo indicado.
     *
     * @param tipo Tipo de estación que se desea encontrar.
     * @returns Estación correspondiente.
     * @throws Error si no existe una estación para ese tipo.
     */
    private buscarEstacion(tipo: TipoDeEstacion): Estacion {
        const estacion: Estacion | undefined = this.estaciones.find(
            (estacionActual: Estacion) =>
                estacionActual.getTipoDeEstacion() === tipo
        );

        if (estacion === undefined) {
            throw new Error(
                `No existe una estación para el tipo ${tipo}.`
            );
        }

        return estacion;
    }

    /**
     * Obtiene una estación según su tipo, si existe.
     *
     * @param tipo Tipo de estación buscada.
     * @returns Estación encontrada o undefined si no existe.
     */
    public getEstacion(tipo: TipoDeEstacion): Estacion | undefined {
        return this.estaciones.find(
            (estacion: Estacion) =>
                estacion.getTipoDeEstacion() === tipo
        );
    }
}