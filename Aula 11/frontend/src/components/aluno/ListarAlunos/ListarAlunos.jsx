import React, { useState, useEffect } from "react";
import { listarTodos } from "../../../service/alunoService"; // Importa a função do serviço para listar todos os alunos
// import style from "./ListarAlunos.module.css"

function ListarAlunos(){
    const[alunos, setAlunos] = useState([]); // Estado para armazenar a lista de alunos
    const[erroMsg, setErrorMsg] = useState('') //Estado para armazenar a mensagem de erro

    // Função que é chamada ao carregar o componente, para buscar os alunos
    async function fetchAlunos() { 
        try {
            const res = await listarTodos(); // Chama o serviço para listar todos os alunos
            setAlunos(res.data) // res.data contém os dados retornados pela API 
            setErrorMsg(res.data.mensagem)
        } catch (error) {
            setErrorMsg(error.response.data.mensagem)
        }
    }

    useEffect(() =>{
        fetchAlunos() // Chama a função para buscar os alunos 
    }, []) // O array vazio garante que a função seja chamada apenas uma quando o componente for montado

    return(
        <div>
            <h2>Listagem de alunos</h2>
            {erroMsg && <p>{erroMsg}</p>} {/* Exibe mensagem de erro se houver*/}
            <ul>
                {
                    alunos.map((aluno) => (
                        <li key={aluno.matricula}> 
                            {aluno.nome} - {aluno.email} - Matricula {aluno.matricula}
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default ListarAlunos