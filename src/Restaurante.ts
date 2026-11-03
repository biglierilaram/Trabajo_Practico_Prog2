import { Articulo } from "./Articulo";
import { Combo } from "./Combo";
import { Estacion } from "./Estacion";
import { EstadoItem, TipoDeEstacion } from "./Enums";
import { Item } from "./Item";
import { Pedido } from "./Pedido";

export class Restaurante {
    private estaciones: Estacion[];

    public constructor(estaciones: Estacion[]) {
        this.estaciones = [...estaciones];
    }

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

    public getEstacion(tipo: TipoDeEstacion): Estacion | undefined {
        return this.estaciones.find(
            (estacion: Estacion) =>
                estacion.getTipoDeEstacion() === tipo
        );
    }
}