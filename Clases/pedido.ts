import { Cliente } from "./cliente";
// falta import item

export abstract class Pedido {
    private idPedido: number;
    private fechaPedido: Date;
    private estadoPedido: string;
    private articulos: item[];
    private cliente: Cliente;

    constructor(idPedido: number, cliente: Cliente) {
        this.idPedido= idPedido;
        this.cliente= cliente;
        this.fechaPedido= new Date();
        this.estadoPedido= "Pendiente";
        this.articulos= [];
    }

    public agregarArticulo (item: itemPedido): void {
        this.articulos.push(item);
    }

    public quitarArticulo (item: itemPedido): void {
        const posicion = this.articulos.indexOf(item);
        if (posicion !== -1) {
            this.articulos.splice(posicion,1);
        }
    }

    public modificarPedido (): void {
        console.log("Pedido modificado.");
    }

    public confirmarPedido(): void {
        this.estadoPedido= "En preparación.";
    }

    public calcularTotal(): number {
        let total=0;
        for (const item of this.articulos) {
            total += item.calcularSuma();
        }
        return total;
    }

    public getIdPedido (): number {
        return this.idPedido;
    }

    public getEstado(): string {
        return this.estado;
    }

    public getArticulos(): itemPedido[] {
        return this.articulos;
    }

}