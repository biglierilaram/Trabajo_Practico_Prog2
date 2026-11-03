import { TipoDeMetodoDePago } from "./Enums";

export abstract class MetodoDePago {
    protected nombreMetodoDePago: string;
    protected tipoDeMetodoDePago: TipoDeMetodoDePago;

    public constructor(
        nombreMetodoDePago: string,
        tipoDeMetodoDePago: TipoDeMetodoDePago
    ) {
        this.nombreMetodoDePago = nombreMetodoDePago;
        this.tipoDeMetodoDePago = tipoDeMetodoDePago;
    }

    public getMetodoDePago(): string {
        return this.nombreMetodoDePago;
    }

    public getTipoDeMetodoDePago(): TipoDeMetodoDePago {
        return this.tipoDeMetodoDePago;
    }
}
