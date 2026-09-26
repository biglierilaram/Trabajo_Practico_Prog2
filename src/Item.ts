export abstract class Item {
protected nombre: string;
protected idItem: number;
public constructor(
    nombre: string,
    idItem: number) {
    this.nombre = nombre;
    this.idItem = idItem;
}

public abstract precioFinal(): number;

}