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
