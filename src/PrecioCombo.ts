import {Articulo} from "./Articulo"
export abstract class PrecioCombo {

public abstract calcularPrecio(articulo: Articulo[]): number;

}