import { useContext, useState } from 'react'
import './App.css'
import { UsuariosContext } from './context/UsuariosContext'

function App() {
  const {usuarios, cadastrarUsuario, removerUsuario} = useContext(UsuariosContext)
  const [novoUsuario, setNovoUsuario] = useState({
    nome: "",
    email: "",
    senha: ""
  })

  return (
    <>
      <h1>Login</h1>
      {!!usuarios && usuarios.map((usuario) => (
        <>
          <h3 key={usuario.id}>{usuario.nome}</h3>
          <button onClick={() => removerUsuario(usuario.id)}>remover</button>
        </>
      ))}
      <hr />
      <input 
        type="text" 
        value={novoUsuario.nome} 
        placeholder="Digite o nome do usuário" 
        onChange={(evento) => setNovoUsuario({...novoUsuario, nome: evento.target.value})}
      />
      <input 
       type="email" 
       value={novoUsuario.email} 
       placeholder="Digite o email do usuário" 
       onChange={(evento) => setNovoUsuario({...novoUsuario, email: evento.target.value})}
      />
      <input 
       type="password" 
       value={novoUsuario.senha} 
       placeholder="Digite a senha do usuário" 
       onChange={(evento) => setNovoUsuario({...novoUsuario, senha: evento.target.value})}
      />
      <button onClick={() => cadastrarUsuario(novoUsuario)}>Cadastrar</button>
    </>
  )
}

export default App
