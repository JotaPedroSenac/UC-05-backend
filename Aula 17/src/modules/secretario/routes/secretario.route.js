const express = require('express');
const router = express.Router();
const AlunoController = require('../controllers/aluno.controller');

// listar alunos http://localhost:3000/secretario/listar-alunos
router.get('/secretario/listar-alunos', AlunoController.listarAlunos);

// listar aluno por matricula http://localhost:3000/secretario/listar-aluno/:a954871
router.get('/secretario/listar-aluno/:matricula', AlunoController.listarAlunoPorMatricula);

// listar aluno http://localhost:3000/secretario/criar-aluno
router.post('/secretario/criar-aluno', AlunoController.criarAluno);

// editar aluno http://localhost:3000/secretario/editar-aluno
router.post('/secretario/editar-aluno', AlunoController.editarAluno);

// deletar aluno http://localhost:3000/secretario/deletar-aluno/:matricula
router.post('/secretario/deleter-aluno/:matricula', AlunoController.deletarAlunoPorMatricula);

// deletar aluno http://localhost:3000/secretario/deletar-alunos/
router.post('/secretario/deleter-alunos', AlunoController.deletarTodosAlunos);

module.exports = router;