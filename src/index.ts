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
import { Estacion } from "./Estacion";
import { Restaurante } from "./Restaurante";

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
pedido1.confirmar();

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

// Distribuyo los artículos en sus estaciones correspondientes.
estacionEnsaladas.recibirItem(ensalada);
estacionBarra.recibirItem(aguaSinGas);
estacionPostres.recibirItem(torta1);

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

// El precio total es 29.700.
// El descuento del martes es del 15% y el de efectivo del 10%.
// Se aplica el descuento más beneficioso: 25.245.
