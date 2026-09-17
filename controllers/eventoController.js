const Evento = require('../models/Evento');
const { v4: uuidv4 } = require('uuid');

// ==========================================
// CRUD EVENTOS
// ==========================================

// Obtener todos los eventos (excluyendo detalles de entradas para ser ligero)
exports.getEventos = async (req, res) => {
    try {
        const eventos = await Evento.find().select('-entradas');
        res.json(eventos);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener eventos', error: error.message });
    }
};

// Obtener un evento por clave (incluyendo entradas)
exports.getEventoByClave = async (req, res) => {
    try {
        const evento = await Evento.findOne({ clave: req.params.clave });
        if (!evento) {
            return res.status(404).json({ message: 'Evento no encontrado' });
        }
        res.json(evento);
    } catch (error) {
        res.status(500).json({ message: 'Error al buscar el evento', error: error.message });
    }
};

// Crear un nuevo evento
exports.createEvento = async (req, res) => {
    try {
        const nuevoEvento = new Evento(req.body);
        const eventoGuardado = await nuevoEvento.save();
        res.status(201).json(eventoGuardado);
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: 'La clave del evento ya existe' });
        }
        res.status(400).json({ message: 'Error al crear evento', error: error.message });
    }
};

// Actualizar un evento
exports.updateEvento = async (req, res) => {
    try {
        // Evitamos sobreescribir las entradas accidentalmente en un PUT general
        const datosActualizar = { ...req.body };
        delete datosActualizar.entradas;

        const evento = await Evento.findOneAndUpdate(
            { clave: req.params.clave },
            datosActualizar,
            { new: true, runValidators: true }
        );

        if (!evento) {
            return res.status(404).json({ message: 'Evento no encontrado' });
        }
        res.json(evento);
    } catch (error) {
        res.status(400).json({ message: 'Error al actualizar evento', error: error.message });
    }
};

// Eliminar un evento
exports.deleteEvento = async (req, res) => {
    try {
        const evento = await Evento.findOneAndDelete({ clave: req.params.clave });
        if (!evento) {
            return res.status(404).json({ message: 'Evento no encontrado' });
        }
        res.json({ message: 'Evento eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar evento', error: error.message });
    }
};

// ==========================================
// CRUD ENTRADAS (INCRUSTADAS)
// ==========================================

// Obtener todas las entradas de un evento
exports.getEntradasByEvento = async (req, res) => {
    try {
        const evento = await Evento.findOne({ clave: req.params.clave });
        if (!evento) return res.status(404).json({ message: 'Evento no encontrado' });
        
        res.json(evento.entradas);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener entradas', error: error.message });
    }
};

// Crear (comprar/reservar) una nueva entrada en un evento
exports.addEntrada = async (req, res) => {
    try {
        const evento = await Evento.findOne({ clave: req.params.clave });
        if (!evento) return res.status(404).json({ message: 'Evento no encontrado' });

        const nuevaEntrada = req.body;
        if (!nuevaEntrada.id) {
            nuevaEntrada.id = uuidv4();
        }

        evento.entradas.push(nuevaEntrada);
        await evento.save();

        res.status(201).json({ message: 'Entrada creada con éxito', entrada: nuevaEntrada });
    } catch (error) {
        res.status(400).json({ message: 'Error al crear entrada', error: error.message });
    }
};

// Obtener detalle de una entrada específica
exports.getEntradaById = async (req, res) => {
    try {
        const evento = await Evento.findOne({ clave: req.params.clave });
        if (!evento) return res.status(404).json({ message: 'Evento no encontrado' });

        const entrada = evento.entradas.find(e => e.id === req.params.entradaId);
        if (!entrada) return res.status(404).json({ message: 'Entrada no encontrada' });

        res.json(entrada);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener entrada', error: error.message });
    }
};

// Actualizar una entrada específica
exports.updateEntrada = async (req, res) => {
    try {
        const evento = await Evento.findOne({ clave: req.params.clave });
        if (!evento) return res.status(404).json({ message: 'Evento no encontrado' });

        const entradaIndex = evento.entradas.findIndex(e => e.id === req.params.entradaId);
        if (entradaIndex === -1) return res.status(404).json({ message: 'Entrada no encontrada' });

        // Actualizamos los campos recibidos
        evento.entradas[entradaIndex] = { ...evento.entradas[entradaIndex].toObject(), ...req.body };
        await evento.save();

        res.json({ message: 'Entrada actualizada exitosamente', entrada: evento.entradas[entradaIndex] });
    } catch (error) {
        res.status(400).json({ message: 'Error al actualizar entrada', error: error.message });
    }
};

// Eliminar (cancelar) una entrada
exports.deleteEntrada = async (req, res) => {
    try {
        const evento = await Evento.findOne({ clave: req.params.clave });
        if (!evento) return res.status(404).json({ message: 'Evento no encontrado' });

        const entradaIndex = evento.entradas.findIndex(e => e.id === req.params.entradaId);
        if (entradaIndex === -1) return res.status(404).json({ message: 'Entrada no encontrada' });

        evento.entradas.splice(entradaIndex, 1);
        await evento.save();

        res.json({ message: 'Entrada eliminada exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar entrada', error: error.message });
    }
};
