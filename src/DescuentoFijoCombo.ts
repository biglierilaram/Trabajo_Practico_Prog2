import { Articulo } from "./Articulo";
import { PrecioCombo } from "./PrecioCombo";

export class DescuentoFijoCombo extends PrecioCombo {
private montoDescontadoCombo: number;
public constructor(montoDescontadoCombo: number) {
    super();
    this.montoDescontadoCombo = montoDescontadoCombo;
}

public override calcularPrecio(articulos: Articulo[]): number {
    let contador:number = 0;
    const descuentoAplicado = this.montoDescontadoCombo;

for (const articulo of articulos) {
contador+= articulo.precioFinal();
    }

return contador-descuentoAplicado;

}
}