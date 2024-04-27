import {useParams} from "react-router-dom"

function Lista() {
  const {id} = useParams()
  return ( <h1>Lista {id}</h1> );
}

export default Lista;