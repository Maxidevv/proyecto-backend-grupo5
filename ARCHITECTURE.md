# Arquitectura del Proyecto (Backend de Eventos y Entradas)

El proyecto sigue una arquitectura monolítica basada en el patrón Modelo-Vista-Controlador (MVC), omitiendo la capa de la "Vista" ya que se trata de una API REST que expone datos en formato JSON.

## Estructura de Directorios

```text
/
├── config/
│   └── db.js               # Conexión y configuración de MongoDB.
├── controllers/
│   └── eventoController.js # Lógica de negocio para manejar Eventos y sus Entradas incrustadas.
├── models/
│   └── Evento.js           # Esquema de Mongoose (define Eventos y Subesquema de Entradas).
├── routes/
│   └── eventoRoutes.js     # Definición de rutas (endpoints) y delegación a los controladores.
├── app.js                  # Punto de entrada de la aplicación Express, configuración de middleware.
├── seed.js                 # Script para limpiar y poblar la base de datos con información simulada.
├── package.json            # Dependencias y scripts de NPM.
└── .env.ejemplo            # Plantilla para variables de entorno.
```

## Decisiones de Diseño (NoSQL)

1. **Documentos Incrustados (Embedded Documents):**
   Las `Entradas` no poseen una colección propia, sino que están modeladas como un array de subdocumentos dentro de su `Evento` asociado. Esta estrategia optimiza la velocidad de lectura al requerir una única consulta a la base de datos para traer un evento y todos los tickets vendidos/reservados del mismo.

2. **Identificador Primario:**
   Si bien MongoDB proporciona un `_id` por defecto, la API expone los endpoints utilizando la propiedad `clave` del evento como parámetro en la URL, ofreciendo identificadores más semánticos y seguros para el negocio (e.g. `EVT-2026-001`).

3. **Inyección de Identificadores (UUID):**
   Dado que las entradas son subdocumentos, el sistema asigna un `uuid v4` a cada entrada en el momento de creación, lo que garantiza unicidad sin depender de los `_id` nativos de los subesquemas que pueden ser engorrosos de manejar.
