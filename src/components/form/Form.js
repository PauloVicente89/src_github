import React, { useEffect,useState } from 'react'

// LIB AXIOS
import axios from 'axios'
// ICONS
import { FaSearch } from 'react-icons/fa'
// CSS DA PAGINA
import './Form.css'


// Main Function
export default function Form() {
    const [user , setUser] = useState("");
    const [repositorios , setRepositorios] = useState([]);
    const [branches , setBranches] = useState([]);
    const [commits , setCommit] = useState([]);

    

    function HandlerSearch() {

        axios.get(`https://api.github.com/users/${user}/repos`)
            .then(res =>
                res.data.map(repo => {
                   setRepositorios(repositorios => [...repositorios, repo.name])

                   axios.get(`https://api.github.com/repos/${user}/${repo.name}/branches`)
                    .then(res => 
                        res.data.map(branch => {
                            setBranches(branches => [...branches, branch.name])
                            console.log(branch.name)
                        })
                    )
                    
                })

                

            )
        

    }


return (
    <>  
    {/* CONTAINER COM INPUT DE PESQUISA */}
        <div className='pesquisar'>

            <h3>Usuário Github:</h3>

            <div className='central'>
                <input onChange={(e) => setUser(e.target.value)} />
                <button onClick={HandlerSearch}>
                    <FaSearch/>
                </button>
            </div>
        </div>

        {/* RETORNO DOS ITENS */}
        <div className='itens'>
            <ul>
                <li>
                    <h3>Lista de repositórios</h3>
                </li>

                {/* LISTA DE REPOSITORIOS */}
                {repositorios.map(
                    (repo) => {
                        {branches.map(
                            (branche) =>
                            <li>{branche}</li>
                        )}
                        return(
                            // CRIANDO UMA LI A CADA REPOSITORIO
                            <li className='nome-repo'>
                                <button type='button' id='searchBranche'>
                                    {repo}
                                </button>
                            </li>
                        )
                    }
                )}

            </ul>



            <ul>
                <li>
                    <h3>Branches</h3>
                </li>
                
            </ul>

            <ul>
                <li>
                    <h3>Nº de commits</h3>
                </li>
                {/* {commits.map(
                    (commit) =>
                    <li>{commit}</li>
                )} */}
            </ul>
        </div>
    </>
  )
}
