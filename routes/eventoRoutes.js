const express = require('express');
const router = express.Router();
const eventoController = require('../controllers/eventoController');

// Rutas para Eventos
router.get('/', eventoController.getEventos);
router.get('/:clave', eventoController.getEventoByClave);
router.post('/', eventoController.createEvento);
router.put('/:clave', eventoController.updateEvento);
router.delete('/:clave', eventoController.deleteEvento);

// Rutas para Entradas incrustadas en Eventos
router.get('/:clave/entradas', eventoController.getEntradasByEvento);
router.get('/:clave/entradas/:idEntrada', eventoController.getEntradaById);
router.post('/:clave/entradas', eventoController.addEntrada);
router.put('/:clave/entradas/:entradaId', eventoController.updateEntrada);
router.delete('/:clave/entradas/:entradaId', eventoController.deleteEntrada);

module.exports = router;
