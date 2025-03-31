const express = require('express');
const EnderecoController = require('../controllers/index');

const router = express.Router();

router.get('/endereco', EnderecoController.listar);
router.post('/enderecos', EnderecoController.criar);
router.put('/endereco/:matricula', EnderecoController.editar);
router.get('/listar/:matricula', EnderecoController.listarPorMatricula);
router.get('/listar/:cep', EnderecoController.listarPorCEP);
router.get('/listar/:cidade', EnderecoController.listarPorCidade);

module.exports = router;