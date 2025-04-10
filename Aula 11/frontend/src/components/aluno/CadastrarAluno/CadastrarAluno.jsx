import React, {useState} from "react";

import { criar } from "../../../service/alunoService";

function CadastrarAluno(){
    const [nome, setNome] = useState('');
    const [matricula, setMatricula] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [erroMsg, setErrorMsg] = useState('');
    const [sucessoMsg, setSucessoMsg] = useState('');

    async function criarAluno(e){
        e.preventDefault();
        try {
            await criar({nome, matricula, email, senha});
            setSucessoMsg('Aluno Cadastro com sucesso');
            setErrorMsg('')
            setErrorMsg('');
            
            // Limpar os campos após o envio bem-sucedido
            setNome('');
            setMatricula('');
            setEmail('');
            setSenha('');
        } catch (error) {
            setErrorMsg(error.response.data.mensagem)
        }
    }

    return(
        <div>
            <h2>Cadastrar Aluno</h2>
            <input 
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Digite o nome"
            />

            <input 
                    type="text"
                    value={matricula}
                    onChange={(e) => setMatricula(e.target.value)}
                    placeholder="Digite sua matricula"
                    />

            <input 
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Digite seu email"
                    />

            <input 
                    type="password"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    placeholder="Digite sua senha"
                    />

                    <button onClick={criarAluno}>Cadastrar</button>
                    {erroMsg && <p>{erroMsg}</p>}
                    {sucessoMsg && <p>{sucessoMsg}</p>}
        </div>


    )
}

export default CadastrarAluno;