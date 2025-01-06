import { useContext } from "react";
import { Context } from "../context/ContextProvider";
import "./App.css"

function App() {
  const value = useContext(Context); 
  return (
    <h1>{value}</h1>
  )
}

export default App
