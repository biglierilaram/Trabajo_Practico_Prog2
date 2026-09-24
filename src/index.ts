import { Articulo } from "./Articulo";
import { Combo } from "./Combo";
import { DescuentoFijoCombo } from "./DescuentoFijoCombo";
import {Categoria} from "./Enums"
import { TipoDeEstacion } from "./Enums";

const NUMERO_1:number = 7000;
const NUMERO_2:number = 3000;
const NUMERO_3:number = 4000;
const ID_HAMBURGUESA = 1;
const ID_PAPAS_FRITAS = 2;
const ID_COCA_COLA = 3;
const MONTO_DESCUENTO = 5000;
const ID_COMBO = 1;

const hamburguesa = new Articulo(
    "Hamburguesa",
    ID_HAMBURGUESA,
    NUMERO_1,
    Categoria.PLATOPRINCIPAL,
    TipoDeEstacion.CARNES);

const papasFritas = new Articulo(
    "Papas Fritas",
    ID_PAPAS_FRITAS,
    NUMERO_2,
    Categoria.ENTRADA,
    TipoDeEstacion.ENSALADAS);

const cocaCola = new Articulo(
    "CocaCola",
    ID_COCA_COLA,
    NUMERO_3,
    Categoria.BEBIDA,
    TipoDeEstacion.BARRA);

const descuentoDe5000 = new DescuentoFijoCombo(MONTO_DESCUENTO);

const combo1 = new Combo("Combo1",ID_COMBO,descuentoDe5000);
combo1.agregarArticulos(hamburguesa);
combo1.agregarArticulos(papasFritas);
combo1.agregarArticulos(cocaCola);

combo1.precioFinal();

console.log(combo1.precioFinal());
