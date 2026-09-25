import { EstadoDeItem } from './EstadoDeItem';
import { Item } from './Item'; 
import { ItemYaListoException } from './ItemYaListoExcepcion';

export class ItemPedido {
  private readonly item: Item;
  private readonly cantidad: number;
  private estado: EstadoDeItem;

  constructor(item: Item, cantidad: number) {
    this.item = item;
    this.cantidad = cantidad;
    this.estado = EstadoDeItem.PENDIENTE;
  }

  public cambiarEstado(nuevoEstado: EstadoDeItem): void {
    if (this.estado === EstadoDeItem.LISTO) {
      throw new ItemYaListoException(this.item.getNombre());
    }
    this.estado = nuevoEstado;
  }

  public getEstado(): EstadoDeItem {
    return this.estado;
  }

  public getItem(): Item {
    return this.item;
  }

  public getCantidad(): number {
    return this.cantidad;
  }
}