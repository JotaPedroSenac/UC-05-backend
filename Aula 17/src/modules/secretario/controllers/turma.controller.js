const TurmaModel = require('../../turma/model/turma.model');

class TurmaController{
    static async criarTurma(req, res){
        try {
            const {cod_turma, cod_curso, turno} = req.body
            if(!cod_turma || !cod_curso || !turno){
                return res.status(400).json({msg: 'Todos os campos devem ser preenchidos'})
            }
            const turma = await TurmaModel.create({cod_turma, cod_curso, turno})
            res.status(201).json({msg: 'Turma criada com sucesso', turma: turma})
        } catch (error) {
            
        }
    }
    static async listarTodasTurmas(){

    }
    static async listarTurmaPorCodigo(codigo){

    }
    static async editarTurmaPorCodigo(codigo){
        
    }
    static async deletarTodasTurmas(codigo){
        
    }
    static async deletarTurmaPorCodigo(){

    }
}