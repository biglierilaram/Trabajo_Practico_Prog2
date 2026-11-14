import { Caja } from "./Caja";
import { Pedido } from "./Pedido";

/**
 * Representa un registro de un pedido que ya fue cobrado.
 *
 * Almacena el pedido y el importe que se cobró.
 */
export interface RegistroPedido {
    pedido: Pedido;
    importeCobrado: number;
}

/**
 * Mantiene un historial de los pedidos cobrados en el restaurante.
 *
 * Permite registrar pedidos, consultar el historial y buscar
 * registros mediante el identificador del pedido.
 */
export class HistorialPedidos {
    private registros: RegistroPedido[];

    /**
     * Crea un historial de pedidos vacío.
     */
    public constructor() {
        this.registros = [];
    }

    /**
     * Registra un pedido cuyo cobro ya fue realizado.
     *
     * @param caja Caja asociada al pedido que se desea registrar.
     * @throws Error si el pedido todavía no fue cobrado.
     */
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

    /**
     * Obtiene una copia de los registros del historial.
     *
     * @returns Lista de registros de pedidos cobrados.
     */
    public consultarHistorial(): RegistroPedido[] {
        return this.registros.map(
            (registro: RegistroPedido) => ({
                pedido: registro.pedido,
                importeCobrado: registro.importeCobrado
            })
        );
    }

    /**
     * Busca un pedido en el historial mediante su identificador.
     *
     * @param idPedido Identificador del pedido buscado.
     * @returns Registro encontrado o undefined si no existe.
     */
    public buscarPedido(idPedido: number): RegistroPedido | undefined {
        return this.registros.find(
            (registro: RegistroPedido) =>
                registro.pedido.getIdPedido() === idPedido
        );
    }

    /**
     * Obtiene la cantidad de pedidos registrados.
     *
     * @returns Cantidad de registros del historial.
     */
    public getCantidadPedidos(): number {
        return this.registros.length;
    }
}