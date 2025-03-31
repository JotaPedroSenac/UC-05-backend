const EnderecoModel = requre('../models/index.js');

class EnderecoController{
    static async criar(req, res){
        try {
            const { matricula,cep, logradouro,numero,bairro, complemento,uf, localidade,ponto_referencia } = req.body;
            if (!matricula || !cep || !logradouro || !numero || !bairro || !complemento || !uf || !localidade || !ponto_referencia) {
                 return res.status(200).json({mensagem: "Todos os campos devem ser preenchidos"});
            }
            const novoEndereco = await EnderecoModel.criarEndereco(matricula,cep, logradouro,numero,bairro, complemento,uf, localidade,ponto_referencia);
            res.status(201).json({mensagem: "Endereço criado com sucesso", edereco: novoEndereco});
        } catch (error) {
            res.status(500).json({mensagem: "Erro ao criar novo endereço!", erro: error.message})
        }
    }

    static async listar(req, res){
        try {
            const enderecos = await EnderecoModel.listarEnderecos();
            if (enderecos.length === 0) {
                return res.status(400).json({mensagem: "banco de dados vazio"});
            }
            res.status(200).json(enderecos);
        } catch (error) {
            res.status(500).json({mensagem: "Erro ao listar endereços!", erro: error.message})
        }
    }

    static async listarPorMatricula(req, res){
        try {
            const matricula = req.params.matricula;
            const endereco = await EnderecoModel.listarPorMatricula(matricula);
            if (endereco.length === 0) {
                return res.status(404).json({mensagem: "Endereço não encontrado"});
            }
            res.status(200).json(endereco);
        } catch (error) {
            res.status(500).json({mensagem: "Erro ao listar endereço!", erro: error.message})
        }
    }

    static async listarPorCEP(req, res){
        try {
            const cep = req.params.cep;
            const endereco = await EnderecoModel.listarPorCEP(cep);
            if (endereco.length === 0) {
                return res.status(404).json({mensagem: "Endereço não encontrado"});
            }
            res.status(200).json(endereco);
        } catch (error) {
            res.status(500).json({mensagem: "Erro ao listar endereço!", erro: error.message})
        }
    }

    static async listarPorCidade(req, res){
        try {
            const cidade = req.params.cidade;
            const endereco = await EnderecoModel.listarPorCidade(cidade);
            if (endereco.length === 0) {
                return res.status(404).json({mensagem: "Endereço não encontrado"});
            }
            res.status(200).json(endereco);
        } catch (error) {
            res.status(500).json({mensagem: "Erro ao listar endereço!", erro: error.message})
        }
    }

    static async editar(req, res){
        try {
            const { matricula } = req.params;
            const { cep, numero, ponto_referencia } = req.body;
            if(!cep || !numero || !ponto_referencia){
                return res.status(200).json({mensagem: "Todos os campos precisam ser preenchidos"})
            }
            const enderecoAtualizado = await EnderecoModel.editarEndereco(matricula, cep, numero, ponto_referencia);
            if(enderecoAtualizado.length === 0){
                return res.satus(400).json({mensagem: "matricula está errada ou não existe"})
            }
            res.status(201).json({mensagem: "Endereçoo atualizado com sucesso", endereco: enderecoAtualizado });
        } catch (error) {
            res.status(500).json({ error: "Erro ao atualizar endereço." });
        }
    }

}

module.exports = EnderecoController;