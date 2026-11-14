/**
 * Categorías disponibles para los artículos del restaurante.
 */
export enum Categoria {
    ENTRADA,
    PLATOPRINCIPAL,
    BEBIDA,
    POSTRE
}

/**
 * Tipos de estaciones de preparación del restaurante.
 */
export enum TipoDeEstacion {
    CARNES,
    ENSALADAS,
    POSTRES,
    BARRA
}

/**
 * Días de la semana utilizados para identificar la fecha de un pedido.
 */
export enum DiaSemana {
    LUNES,
    MARTES,
    MIERCOLES,
    JUEVES,
    VIERNES,
    SABADO,
    DOMINGO
}

/**
 * Tipos de métodos de pago disponibles.
 */
export enum TipoDeMetodoDePago {
    EFECTIVO,
    TARJETA,
    BILLETERAVIRTUAL
}

/**
 * Estados posibles de un artículo durante su preparación.
 */
export enum EstadoItem {
    PENDIENTE,
    EN_PREPARACION,
    LISTO
}

/**
 * Estados posibles de un pedido.
 */
export enum EstadoPedido {
    EN_CONSTRUCCION,
    CONFIRMADO
}