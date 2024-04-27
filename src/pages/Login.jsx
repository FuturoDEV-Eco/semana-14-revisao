import { useContext, useState } from "react";
import { UsuariosContext } from "../context/UsuariosContext";

function Login() {

  const {login} = useContext(UsuariosContext)

  const [usuario, setUsuario] = useState({
    email: "",
    password: ""
  })

  async function realizarLogin(){
    await login(usuario.email, usuario.senha)
  }

  return ( 
    <>
      <input
        type="email"
        value={usuario.email}
        placeholder="Digite o email do usuário"
        onChange={(evento) =>
          setUsuario({ ...usuario, email: evento.target.value })
        }
      />
      <input
        type="password"
        value={usuario.senha}
        placeholder="Digite a senha do usuário"
        onChange={(evento) =>
          setUsuario({ ...usuario, senha: evento.target.value })
        }
      />
      <button onClick={() => realizarLogin()}>Cadastrar</button>
    </>
   );
}

export default Login;