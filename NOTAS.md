# Notas

## Hooks 
__Los [Hooks](https://es.react.dev/reference/react/hooks) son metodos para manejar logica__
* __Los hooks no pueden ser puestos dentro de bucles, condicionales o funciones anidadas.__
* Siempre debes de llevar el prefijo "use" antes de su nombre.
* Siempre deben de estar dentro del metodo del componente o de otro hook.
* Si un hook debe de retornar mas de un valor debe de hacerlo dentro de un array.
* Nunca un hook debe de retornar elementos JSX, los hooks solo deben de manejar __Logica__.

### useEffect
__Hook que llama a un metodo cuando uno o mas de los valores observados cambian__
```js
useEffect([metodo], [[propiedades]])
```
* Si no recibe como argumento las propiedades, llamara al metodo cada vez que se renderize la pagina.
* Si recibe un array vacio [] solo llamara al metodo cuando el componente se monte por primera vez.
* Si el metodo retorna otro metodo este metodo sera llamado cuando la propiedades cambien o el componente sea desmontado.
* El useEffect siempre sera llamado almenos una vez.
* Solo se ejecuta en el cliente.

### useState
__Hook que sirve para crear "variables" persistentes dentro del componente__
```js
[var, set] = useState([valor_inicial])
[var, set] = useState([()=>{}])
```
* Solo se puede alterar la variable a travez del metodo devuelto por el useState.
* Cuando se quiera modificar el valor, se debe de crear una compia de la variable, modificarla y volversela a pasar al metodo set.
* si el useState recibe un metodo en lugar de un valor inicial, este llamara al metodo pasado para inicializar el state.
* El valor de la variable es una promesa, tardara un tiempo en actualizarse.
* El metodo set puede recibir un metodo como argumento, en este caso el metodo recibira el valor mas actualizado de la variable `set(valor_actualizado=>{})`.
* Si se necesita por ejemplo incrementar el valor de la variable es necesario hacer `set(valor => valor + 1)` esto es por que la variable devuelta por el useState no siempre refleja el ultimo valor.
* Si la variable cambia, react volvera a renderizar los componentes.

### useRef
__Hook que crea una variable persistente__
```js
var = useRef([valor_inicial])
```
* A diferencia del useState el useRef crea una referencia persistente en el componente, esta referencia si se modifica, react no volvera a renderizar el componente.
* Se le puede pasar la referencia a un componente usando el tag ref. `<Algo ref={referecia}>`

## Formularios
__El metodo onSubmit del formulario se puede acceder a los campos del formulario sin usar `useRef`__
```js
function handleSubmit(event){
    const formData = new FormData(event.target) 
    const value = formData.get("input_name")
}
```
```html
<form onSubmit={handleSubmit}>
```