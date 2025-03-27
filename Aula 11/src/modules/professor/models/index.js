const { pool } = require('../../../config/database');

class ProfessorModel{
    static async criar(matricula, nome, email, senha, turma){
        // static: não precisa ser instanciada
        const dados = [matricula, nome, email, senha, turma];
        const consulta = `insert into professor (matricula, nome, email, senha, turma) values ($1, $2, $3, $4, $5) returning *`;
        const novoProfessor = await pool.query(consulta, dados);
        return novoProfessor.rows;
    }
    static async editar(matricula, nome, email, senha, turma){
        const dados = [matricula, nome, email, senha, turma];
        const consulta = `update professor set nome = $2, email = $3, senha = $4, turma = $5 where matricula = $1 returning *`;
        const professorAtualizado = await pool.query(consulta, dados);
        return professorAtualizado.rows;
    }
    static async listar(){
        const consulta = `select * from professor`;
        const professores = await pool.query(consulta);
        return professores.rows;
    }
    static async listarPorMatricula(matricula){
        const dados = [matricula];
        const consulta = `select * from professor where matricula = $1`;
        const professor = await pool.query(consulta, dados);
        return professor.rows;
    }
    static async excluirPorMatricula(matricula){
        const dados = [matricula];
        const consulta = `delete from professor where matricula = $1`;
        await pool.query(consulta, dados);
    }
    static async excluirTodos(){
        const dados = [matricula];
        const consulta = `delete from professor`;
        await pool.query(consulta, dados);
    }
}

module.exports = { ProfessorModel }