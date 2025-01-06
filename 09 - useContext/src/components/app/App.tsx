import { useContext } from "react";
import { Context } from "../context/ContextProvider";
import "./App.css"

export function App() {
  const value = useContext(Context); 
  return (
    <h1>{value}</h1>
  )
}
