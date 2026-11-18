/* eslint @typescript-eslint/no-magic-numbers: off */
import { Articulo } from "./Articulo";
import { Caja } from "./Caja";
import { Descuento } from "./Descuento";
import { DescuentoPorDia } from "./DescuentoPorDia";
import { DescuentoPorMetodoDePago } from "./DescuentoPorMetodoDePago";
import { Efectivo } from "./Efectivo";
import {
    Categoria,
    DiaSemana,
    TipoDeEstacion,
    TipoDeMetodoDePago
} from "./Enums";
import { PedidoSalon } from "./PedidoSalon";
import { PedidoEnvio } from "./PedidoEnvio";
import { Estacion } from "./Estacion";
import { Restaurante } from "./Restaurante";
import { HistorialPedidos } from "./HistorialPedidos";
import { PedidoRetirar } from "./PedidoRetirar";

const PORCENTAJE_DESCUENTO_MARTES: number = 15;
const PORCENTAJE_DESCUENTO_EFECTIVO: number = 10;

const ID_ENSALADA: number = 29;
const PRECIO_ENSALADA: number = 16500;
const ID_AGUA: number = 15;
const PRECIO_AGUA: number = 6000;
const ID_CHEESECAKE: number = 46;
const PRECIO_CHEESECAKE: number = 7200;

const ID_PEDIDO: number = 210;

// Creo los medios de pago y los descuentos.
const efectivo = new Efectivo(
    "Efectivo",
    TipoDeMetodoDePago.EFECTIVO
);

const descuentoMartes = new DescuentoPorDia(
    PORCENTAJE_DESCUENTO_MARTES,
    DiaSemana.MARTES
);

const descuentoEfectivo = new DescuentoPorMetodoDePago(
    PORCENTAJE_DESCUENTO_EFECTIVO,
    TipoDeMetodoDePago.EFECTIVO
);

const descuentosVigentes: Descuento[] = [
    descuentoMartes,
    descuentoEfectivo
];

// Creo los artículos del pedido.
const ensalada = new Articulo(
    "Ensalada Caesar",
    ID_ENSALADA,
    PRECIO_ENSALADA,
    Categoria.PLATOPRINCIPAL,
    TipoDeEstacion.ENSALADAS
);

const aguaSinGas = new Articulo(
    "Agua sin gas de 500ml",
    ID_AGUA,
    PRECIO_AGUA,
    Categoria.BEBIDA,
    TipoDeEstacion.BARRA
);

const torta1 = new Articulo(
    "Porcion de cheesecake",
    ID_CHEESECAKE,
    PRECIO_CHEESECAKE,
    Categoria.POSTRE,
    TipoDeEstacion.POSTRES
);

// Creo el pedido y agrego los artículos.
const NUMERO_DE_MESA: number = 5;

const pedido1 = new PedidoSalon(
    ID_PEDIDO,
    DiaSemana.MARTES,
    NUMERO_DE_MESA
);

pedido1.agregarItems(ensalada);
pedido1.agregarItems(aguaSinGas);
pedido1.agregarItems(torta1);

// Creo la caja y calculo el importe con el descuento más beneficioso.
// Confirmo el pedido.

// Creo las estaciones de cocina.
const estacionEnsaladas = new Estacion(
    TipoDeEstacion.ENSALADAS
);

const estacionBarra = new Estacion(
    TipoDeEstacion.BARRA
);

const estacionPostres = new Estacion(
    TipoDeEstacion.POSTRES
);

// Creo el restaurante y le asigno las estaciones.
const restaurante = new Restaurante([
    estacionEnsaladas,
    estacionBarra,
    estacionPostres
]);

// Confirmo el pedido y distribuyo automáticamente sus artículos.
restaurante.confirmarYDistribuirPedido(pedido1);

// Preparo y finalizo el artículo de ensaladas.
estacionEnsaladas.iniciarSiguienteItem();
estacionEnsaladas.finalizarItemActual();

// Preparo y finalizo el artículo de barra.
estacionBarra.iniciarSiguienteItem();
estacionBarra.finalizarItemActual();

// Preparo y finalizo el postre.
estacionPostres.iniciarSiguienteItem();
estacionPostres.finalizarItemActual();

// Creo la caja y calculo el importe con el descuento más beneficioso.
const caja = new Caja(pedido1, efectivo);

console.log(
    caja.cobrarPrecioFinalConDescuento(descuentosVigentes)
);
// Creo el historial y registro el pedido cobrado.
const historial = new HistorialPedidos();

historial.registrarPedido(caja);

// Consulto el historial de pedidos.
console.log("Cantidad de pedidos registrados:", historial.getCantidadPedidos());

console.log("Historial de pedidos:", historial.consultarHistorial());

console.log("Pedido buscado:", historial.buscarPedido(ID_PEDIDO));

// El precio total es 29.700.
// El descuento del martes es del 15% y el de efectivo del 10%.
// Se aplica el descuento más beneficioso: 25.245.
// Pruebo la corrección de un pedido en construcción.
const pedidoCorreccion = new PedidoSalon(
    211,
    DiaSemana.MARTES,
    NUMERO_DE_MESA
);

const articulo1 = new Articulo(
    "Ensalada",
    101,
    5000,
    Categoria.ENTRADA,
    TipoDeEstacion.ENSALADAS
);

const articulo2 = new Articulo(
    "Jugo de naranja",
    102,
    3000,
    Categoria.BEBIDA,
    TipoDeEstacion.BARRA
);

const articulo3 = new Articulo(
    "Cheesecake",
    103,
    4000,
    Categoria.POSTRE,
    TipoDeEstacion.POSTRES
);

pedidoCorreccion.agregarItems(articulo1);
pedidoCorreccion.agregarItems(articulo2);
pedidoCorreccion.agregarItems(articulo3);

// Corrijo el pedido eliminando desde el último ítem hasta el jugo.
pedidoCorreccion.quitarItemsHasta(articulo2);

console.log("Cantidad de ítems después de la corrección:",
    pedidoCorreccion.getItems().length
);

console.log("Se conservó la ensalada:",
    pedidoCorreccion.getItems()[0] === articulo1
);

// Pruebo el cobro de un pedido con envío.
const pedidoEnvio = new PedidoEnvio(
    212,
    DiaSemana.MARTES,
    "Av. Maipú 1000",
    2000
);

const articuloEnvio = new Articulo(
    "Hamburguesa",
    104,
    10000,
    Categoria.PLATOPRINCIPAL,
    TipoDeEstacion.ENSALADAS
);

pedidoEnvio.agregarItems(articuloEnvio);

// Marco el artículo como listo para poder cobrarlo.
articuloEnvio.iniciarPreparacion();
articuloEnvio.finalizarPreparacion();

const cajaEnvio = new Caja(pedidoEnvio, efectivo);

console.log(
    "Importe cobrado por pedido con envío:",
    cajaEnvio.cobrarPrecioFinalConDescuento(descuentosVigentes)
);


// Pruebo la corrección de un pedido para retirar.
const pedidoRetirar = new PedidoRetirar(
    213,
    DiaSemana.MARTES,
    "20:30"
);

const articuloRetirar1 = new Articulo(
    "Pizza",
    105,
    12000,
    Categoria.PLATOPRINCIPAL,
    TipoDeEstacion.CARNES
);

const articuloRetirar2 = new Articulo(
    "Gaseosa",
    106,
    3000,
    Categoria.BEBIDA,
    TipoDeEstacion.BARRA
);

const articuloRetirar3 = new Articulo(
    "Flan",
    107,
    2500,
    Categoria.POSTRE,
    TipoDeEstacion.POSTRES
);

pedidoRetirar.agregarItems(articuloRetirar1);
pedidoRetirar.agregarItems(articuloRetirar2);
pedidoRetirar.agregarItems(articuloRetirar3);

// Corrijo el pedido eliminando desde el último ítem hasta la gaseosa.
pedidoRetirar.quitarItemsHasta(articuloRetirar2);

console.log(
    "Cantidad de ítems del pedido para retirar:",
    pedidoRetirar.getItems().length
);

console.log(
    "Se conservó la pizza:",
    pedidoRetirar.getItems()[0] === articuloRetirar1
);