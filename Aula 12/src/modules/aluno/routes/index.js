const express = require('express');
const AlunoController = require('../controllers/index');

const router = express.Router();

router.get('/alunos', AlunoController.listarTodos);
router.post('/alunos', AlunoController.criar);
router.put('/aluno/:matricula', AlunoController.editar);
router.delete('/aluno/:matricula', AlunoController.excluirPorMatricula);
router.delete('/alunos', AlunoController.excluirTodos)
router.get('/listar/:matricula', AlunoController.listarPorMatricula);

module.exports = router;