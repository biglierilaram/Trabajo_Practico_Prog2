
import { Articulo } from "./Articulo";
import { Caja} from "./Caja";
import { Descuento } from "./Descuento";
import { DescuentoPorDia } from "./DescuentoPorDia";
import { DescuentoPorMetodoDePago } from "./DescuentoPorMetodoDePago";
import { Efectivo } from "./Efectivo";
import { Categoria, DiaSemana, TipoDeEstacion, TipoDeMetodoDePago } from "./Enums";
import { Pedido } from "./Pedido";

//Primero creo los descuentos y tambien el array que los guarda//

const efectivo = new Efectivo("Efectivo", TipoDeMetodoDePago.EFECTIVO); // creo metodo de pago

const descuentoMartes = new DescuentoPorDia(15,DiaSemana.MARTES);

const descuentoEfectivo = new DescuentoPorMetodoDePago(10,TipoDeMetodoDePago.EFECTIVO);

const descuentosVigentes: Descuento[] = [descuentoMartes, descuentoEfectivo];


//Creo Articulos, pueden ser combos tmb, o sea -- Items--//
const ensalada = new Articulo("Ensalada Caesar",29, 16500, Categoria.PLATOPRINCIPAL, TipoDeEstacion.ENSALADAS)
const aguaSinGas = new Articulo("Agua sin gas de 500ml", 15, 6000, Categoria.BEBIDA, TipoDeEstacion.BARRA);
const torta1 = new Articulo("Porcion de cheesecake",46,7200,Categoria.POSTRE, TipoDeEstacion.POSTRES);

//Creo pedido y le cargo items //
const pedido1= new Pedido(210, DiaSemana.MARTES)
pedido1.AgregarItems(ensalada);
pedido1.AgregarItems(aguaSinGas);
pedido1.AgregarItems(torta1);
pedido1.calcularPrecioTotalPedidoSinDescuentos();

//Creo caja, que recibe pedido y lo cobra, evaluando los descuentos//
const caja = new Caja(pedido1, efectivo);
//const descuentoAplicado= caja.CompetenciaDeDescuentos(descuentosVigentes, pedido1.calcularPrecioTotalPedidoSinDescuentos());

console.log(caja.CobrarPrecioFinalConDescuento(descuentosVigentes)) ;

//El precio total debe quedar en 29.700, dto por dia es del 15% y por efvo es del 10%.
// Como le conviene el 15%, deberia mostrar el total - 15% : 25.245 . Muestra eso 






