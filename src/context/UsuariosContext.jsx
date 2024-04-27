import { createContext, useEffect, useState } from "react";

export const UsuariosContext = createContext()

export const UsuariosContextProvider = ({children}) => {
  const [usuarios, setUsuarios] = useState([])

  useEffect(() => {
    getUsuarios()
    //localStorage.setItem("idUsuarioLogado", 66)
  }, [])

  function getUsuarios(){
    fetch("http://localhost:3000/usuarios")
    .then(response => response.json())
    .then(dados => setUsuarios(dados))
    .catch(erro => console.log(erro))
  }

  function getUsuarioPorId(id){
    fetch("http://localhost:3000/usuarios/" + id)
    .then(response => response.json())
    .then(dados => setUsuarios(dados))
    .catch(erro => console.log(erro))
  }

  async function login(email, senha){
    try {
      debugger
      const response = await fetch("http://localhost:3000/usuarios")
      const dados = await response.json()

      let usuarioExiste = false

      dados.map(usuario => {
        debugger
        if(usuario.email == email){
          usuarioExiste = true
          if(usuario.senha == senha){
            localStorage.setItem("isAutenticado", true)
            window.location.href = "/"
            return
          }

          alert("Senha incorreta!")
          return
        }

      })

      if(!usuarioExiste){
        alert("Não existe um usuário com esse email!")
      }

    } catch {

    }
  }

  function cadastrarUsuario(usuario){
    if(usuario.nome == ""){
      alert("O usuário precisa ter um nome!")
    }

    fetch("http://localhost:3000/usuarios", {
      method: "POST",
      body: JSON.stringify(usuario),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(() => { 
      alert("Usuário cadastrado com sucesso!")
      getUsuarios()
    })
    .catch(() => alert("Erro ao cadastrar usuário!"))
  }

  function editarUsuario(usuario, id){
    if(usuario.nome == ""){
      alert("O usuário precisa ter um nome!")
    }

    fetch("http://localhost:3000/usuarios/" + id, {
      method: "PUT",
      body: JSON.stringify(usuario),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(() => { 
      alert("Usuário cadastrado com sucesso!")
      getUsuarios()
    })
    .catch(() => alert("Erro ao cadastrar usuário!"))
  }
  
  function removerUsuario(id){
    fetch("http://localhost:3000/usuarios/" + id, {
      method: "DELETE",
    })
    .then(() => { 
      alert("Usuário removido com sucesso!")
      getUsuarios()
    })
    .catch(() => alert("Erro ao remover usuário!"))
  }

  return (
    <UsuariosContext.Provider value={{usuarios, login, cadastrarUsuario, removerUsuario, editarUsuario, getUsuarioPorId}}>
      {children}
    </UsuariosContext.Provider>
  )
}

