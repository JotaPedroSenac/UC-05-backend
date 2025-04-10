// import React, { useEffect, useState } from "react";
// import { listarPorMatricula, listarTodos } from "../../service/alunoService";


// function ListarAlunos(){

//     const [alunos, setAlunos] = useState([]);
//     const [errorMsg, setErroMsg] = useState('');

// async function listarAlunos(){
//     try {
//         const response = await listarTodos();
//         setAlunos(response.data);
//     } catch (error) {
//         setAlunos([]);
//         console.log(error);
//         setErroMsg(error)
//     }
// }

// async function listarAlunoPorMatricula(matricula){
//     try {
//         const response = await listarPorMatricula(matricula);
//         setAlunos(response.data);
//     } catch (error) {
//         setAlunos([]);
//         console.log(error);
//         setErroMsg(error)
//     }
// }

    
// useEffect(()=>{
//     // listarAlunos()
//     listarAlunoPorMatricula('a1234');
// }, []);

//     // async function ListarAlunos(){
//     //     try {
//     //         const response = await axios.get('http://localhost:3000/alunos');
//     //         if (response) {
//     //             setAlunos(response.data);
//     //         }
//     //     } catch (error) {
//     //         console.log(errorMsg);
//     //         setErroMsg(error);
//     //     }
//     // }

//     // useEffect(() => {
//     //     ListarAlunos();
//     // }, [])

//     // console.log(alunos);

//     return ( 
//         <div>
//             <h2>Listagem de alunos</h2>
//             <ul>
//             {
//                     alunos.map((aluno)=>(
//                         <li key={aluno.matricula}>
//                             {aluno.nome} - {aluno.email} - {aluno.matricula}
//                         </li>
//                     ))
//             }
//             </ul>
//         </div>
//     )
// }



// export default ListarAlunos;