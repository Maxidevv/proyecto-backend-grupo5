# API REST de Eventos y Entradas

API construida con Node.js, Express y MongoDB para la gestión de Eventos y Entradas.

## Prerrequisitos

- Node.js (v14+ recomendado)
- MongoDB corriendo localmente (puerto `27017`) o una URI de MongoDB Atlas.

## Instalación y Configuración

1. Clonar el repositorio y navegar a la carpeta.
2. Instalar las dependencias:
   ```bash
   npm install
   ```
3. Crear un archivo `.env` en la raíz del proyecto basándose en `.env`:
   ```env
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/eventos_db
   ```

## Poblar Base de Datos (Seeding)

Para cargar datos de prueba iniciales (3 eventos, cada uno con múltiples entradas), ejecutar:

```bash
node seed.js
```

## Ejecución del Servidor

Iniciar el servidor de desarrollo:

```bash
node app.js
```
El servidor escuchará en `http://localhost:3000`.

## Endpoints Disponibles

### Eventos
- `GET /api/eventos` - Lista todos los eventos (excluye el detalle de entradas).
- `GET /api/eventos/:clave` - Obtiene el detalle de un evento y todas sus entradas.
- `POST /api/eventos` - Crea un nuevo evento.
- `PUT /api/eventos/:clave` - Actualiza información base de un evento.
- `DELETE /api/eventos/:clave` - Elimina un evento y todas sus entradas.

### Entradas
- `GET /api/eventos/:clave/entradas` - Lista todas las entradas del evento.
- `POST /api/eventos/:clave/entradas` - Compra o agrega una nueva entrada al evento.
- `GET /api/eventos/:clave/entradas/:entradaId` - Detalle puntual de una entrada.
- `PUT /api/eventos/:clave/entradas/:entradaId` - Actualiza una entrada (ej. cambio de estado a "pagado").
- `DELETE /api/eventos/:clave/entradas/:entradaId` - Cancela o elimina una entrada.

## Errores deliberados (ejercicio de revisión)

Este proyecto contiene **10 errores deliberados** (bugs) inyectados a propósito con fines académicos
(práctica de revisión de código). Los errores **no están documentados en el código fuente**.

El listado completo de errores y sus efectos se encuentra cifrado en el archivo
[`errores-inyectados.txt`](./errores-inyectados.txt) de la raíz del proyecto.

### Cifrado aplicado

- Algoritmo: **Cifrado César**
- Desplazamiento: **7**

El archivo NO contiene texto plano: es un `.txt` con el contenido desplazado. Para leerlo se debe
aplicar un desplazamiento inverso de **-7** usando cualquier herramienta de cifrado/encriptación
(p. ej. `openssl`, scripts con `tr`, sitios de cifrado César, etc.).

Ejemplo con `tr` (disponible en Linux/macOS):

```bash
cat errores-inyectados.txt | tr 'a-zA-Z' 't-za-sT-ZA-S'
```

Ejemplo con Python (herramienta de encriptación/decodificación):

```bash
python3 -c "print(''.join(chr((ord(c)-97-7)%26+97) if c.islower() else (chr((ord(c)-65-7)%26+65) if c.isupper() else c) for c in open('errores-inyectados.txt').read()))"
```
