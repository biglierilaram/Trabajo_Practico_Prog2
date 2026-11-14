# # Gestión de Pedidos de Restaurante

1- Descripción del proyecto

Este proyecto consiste en un sistema de gestión de pedidos para un restaurante, desarrollado en TypeScript.

Permite administrar pedidos de salón, retiro y envío, gestionar los artículos y combos, controlar los estados de preparación, distribuir los artículos entre las estaciones de trabajo y realizar el cobro aplicando los descuentos correspondientes.

También permite registrar los pedidos cobrados en un historial.

2- Funcionalidades principales

- Crear pedidos de salón, retiro y envío.
- Agregar y quitar artículos de los pedidos.
- Crear combos de artículos con distintas formas de cálculo de precio.
- Confirmar pedidos y distribuir sus artículos entre las estaciones correspondientes.
- Administrar los estados de preparación de los artículos: pendiente, en preparación y listo.
- Aplicar descuentos según el día de la semana o el medio de pago.
- Calcular el importe final, incluyendo el costo de envío cuando corresponda.
- Registrar y consultar el historial de pedidos cobrados.

 Tecnologías utilizadas

- TypeScript.
- Node.js.
- Node.js Test Runner (`node:test`) para las pruebas unitarias.

3- Estructura del proyecto

- `src/`: contiene las clases y la implementación del sistema.
- `Tests/`: contiene las pruebas unitarias.
- `Diagrama del TP/`: contiene los diagramas correspondientes al diseño y funcionamiento del sistema.

4- Compilación y ejecución

Se requiere tener Node.js y TypeScript disponibles.

Desde la carpeta principal del proyecto, ejecutar:

### Compilar

```powershell
npx.cmd tsc --strict --target ES2022 --module commonjs --moduleResolution node --outDir .\dist (Get-ChildItem .\src\*.ts | ForEach-Object { $_.FullName })
```

### Ejecutar

```powershell
node .\dist\index.js
```

5- Pruebas unitarias

Para compilar los archivos del proyecto y las pruebas:

```powershell
npx.cmd tsc --strict --target ES2022 --module commonjs --moduleResolution node --outDir .\dist-test (Get-ChildItem .\src\*.ts, .\Tests\*.ts | ForEach-Object { $_.FullName })
```

Para ejecutar las pruebas y obtener el informe de cobertura:

```powershell
node --experimental-test-coverage --test .\dist-test\Tests\*.test.js
```

6- Patrones de diseño utilizados

A. Strategy — Cálculo del precio de los combos

Se utiliza para permitir distintas formas de calcular el precio final de un combo sin modificar la clase `Combo`.

Participantes:

- `PrecioCombo`: define la estrategia mediante el método `calcularPrecio()`.
- `DescuentoFijoCombo`: implementa un descuento de importe fijo.
- `DescuentoPorcentualCombo`: implementa un descuento porcentual.
- `Combo`: utiliza la estrategia recibida para calcular su precio final.

B. Strategy — Aplicación de descuentos

Se utiliza para definir diferentes condiciones de aplicación de descuentos y mantener separado ese comportamiento de la clase `Caja`.

Participantes:

- `Descuento`: define el comportamiento común y los métodos para comprobar y aplicar descuentos.
- `DescuentoPorDia`: verifica si corresponde aplicar el descuento según el día del pedido.
- `DescuentoPorMetodoDePago`: verifica si corresponde aplicar el descuento según el medio de pago.
- `Caja`: evalúa los descuentos disponibles y selecciona el que genera el menor importe.

7- Diagramas

En la carpeta `Diagrama del TP/` se encuentran los diagramas de clases y de secuencia que representan la estructura del sistema y sus principales interacciones.

8- Documentación del código

Las clases y métodos se documentan mediante comentarios JSDoc para facilitar la comprensión de la implementación.