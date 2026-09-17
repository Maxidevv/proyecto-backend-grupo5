require('dotenv').config();
const mongoose = require('mongoose');
const Evento = require('./models/Evento');
const connectDB = require('./config/db');

// Función auxiliar para generar entradas falsas
const generarEntradas = (cantidad) => {
    const entradas = [];
    const estados = ['pagado', 'pendiente', 'cancelado'];
    for (let i = 0; i < cantidad; i++) {
        entradas.push({
            apellido: `Usuario${i + 1}`,
            dni: `1000000${i}`,
            email: `usuario${i + 1}@ejemplo.com`,
            precio: Math.floor(Math.random() * (10000 - 1000) + 1000), // Precio entre 1000 y 10000
            estado: estados[Math.floor(Math.random() * estados.length)],
            nroTelefono: `+5411${Math.floor(Math.random() * 100000000)}`
        });
    }
    return entradas;
};

const seedDatabase = async () => {
    try {
        await connectDB();
        
        console.log('Limpiando base de datos...');
        await Evento.deleteMany({});
        
        const eventosMock = [
            {
                clave: 'EVT-2026-001',
                titulo: 'Concierto de Rock',
                lugar: 'Estadio Nacional',
                fecha: new Date('2026-10-15T20:00:00Z'),
                bannerUrl: 'https://ejemplo.com/banner-rock.jpg',
                conEntrada: true,
                descripcion: 'El mejor concierto de rock del año.',
                entradas: generarEntradas(20)
            },
            {
                clave: 'EVT-2026-002',
                titulo: 'Conferencia Tech',
                lugar: 'Centro de Convenciones',
                fecha: new Date('2026-11-05T09:00:00Z'),
                bannerUrl: 'https://ejemplo.com/banner-tech.jpg',
                conEntrada: true,
                descripcion: 'Conferencia sobre el futuro de la tecnología y programación.',
                entradas: generarEntradas(15)
            },
            {
                clave: 'EVT-2026-003',
                titulo: 'Obra de Teatro Clásica',
                lugar: 'Teatro Colón',
                fecha: new Date('2026-12-01T19:30:00Z'),
                bannerUrl: 'https://ejemplo.com/banner-teatro.jpg',
                conEntrada: true,
                descripcion: 'Representación de una famosa obra clásica en el Teatro Colón.',
                entradas: generarEntradas(18)
            }
        ];

        console.log('Insertando datos de prueba...');
        await Evento.insertMany(eventosMock);
        
        console.log('✅ Base de datos poblada exitosamente (3 Eventos con 15-20 entradas cada uno)');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error al poblar la base de datos:', error.message);
        process.exit(1);
    }
};

seedDatabase();
