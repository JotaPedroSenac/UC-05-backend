const express = require('express');
const EnderecoController = require('../controllers/index');

const router = express.Router();
// listar todos os enderecos
router.get('/endereco', EnderecoController.listar);
// criar os enderecos
router.post('/enderecos', EnderecoController.criar);
// editar os enderecos
router.put('/endereco/:matricula', EnderecoController.editar);
// listar endereco por matricula
router.get('/listar/:matricula', EnderecoController.listarPorMatricula);
// listar endereco por cep
router.get('/listar/endereco/:cep', EnderecoController.listarPorCEP);
// listar endereco por cidade
router.get('/listar/cidade/:cidade', EnderecoController.listarPorCidade);

module.exports = router;