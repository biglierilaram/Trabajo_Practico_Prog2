export class Cliente {
    private idCliente: number;
    
    constructor (idCliente: number) {
        this.idCliente = idCliente;
    }

    public getIdCliente(): number {
        return this.idCliente;
    }
}