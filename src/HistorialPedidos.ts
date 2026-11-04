import { Caja } from "./Caja";
import { Pedido } from "./Pedido";

export interface RegistroPedido {
    pedido: Pedido;
    importeCobrado: number;
}

export class HistorialPedidos {
    private registros: RegistroPedido[];

    public constructor() {
        this.registros = [];
    }

    public registrarPedido(caja: Caja): void {
        const importeCobrado: number | null = caja.getImporteCobrado();

        if (importeCobrado === null) {
            throw new Error("No se puede registrar un pedido que todavía no fue cobrado.");
        }

        const pedido: Pedido = caja.getPedido();

        this.registros.push({
            pedido: pedido,
            importeCobrado: importeCobrado
        });
    }

    public consultarHistorial(): RegistroPedido[] {
        return this.registros.map(
            (registro: RegistroPedido) => ({
                pedido: registro.pedido,
                importeCobrado: registro.importeCobrado
            })
        );
    }

    public buscarPedido(idPedido: number): RegistroPedido | undefined {
        return this.registros.find(
            (registro: RegistroPedido) =>
                registro.pedido.getIdPedido() === idPedido
        );
    }

    public getCantidadPedidos(): number {
        return this.registros.length;
    }
}