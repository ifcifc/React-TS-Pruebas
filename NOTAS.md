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
useEffect([metodo], [[dependencies]])
```
* Si no recibe como argumento las propiedades, llamara al metodo cada vez que se renderize la pagina.
* Si recibe un array vacio [] solo llamara al metodo cuando el componente se monte por primera vez.
* Si el metodo retorna otro metodo este metodo sera llamado cuando la propiedades cambien o el componente sea desmontado.
* El useEffect siempre sera llamado almenos una vez.
* Solo se ejecuta en el cliente.

### useState
__Hook que sirve para crear "variables" persistentes dentro del componente__
```js
[value, set] = useState([valor_inicial])
[value, set] = useState([()=>{}])
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
value = useRef([valor_inicial])
```
* A diferencia del useState el useRef crea una referencia persistente en el componente, esta referencia si se modifica, react no volvera a renderizar el componente.
* Se le puede pasar la referencia a un componente usando el tag ref. `<Algo ref={referecia}>`

### useMemo
__Hook que permite almacenar entre renderizados el resultado de una operacion__
```js
value = useMemo([metodo], [[dependencies]])
```
* Llama al metodo cuando una de las dependencias cambia y actualiza el valor devuelto.
* Util para almacenar resultados de filtros.
* Actua como una especie de cache almacenando el resultado entre renderizados sin tener que volver a realizar las operaciones continuamente.
* Solamente para valores.

### useCallback
__Hook su funcion es similar al useMemo pero con funciones en lugar de valores__
```js
callback = useCallback([metodo], [[dependencies]])
```
* Funciona de la misma manera que el useMemo.
* Cuando una dependencia cambia actualizara el metodo.
* Solamente para funciones.

### useContext
__Hook que permite pasar datos a travez de los distintos componentes sin la necesidad de pasarlo a travez de los props__
> ContextProvider.jsx
```js
export const Context = createContext("");
export const ContextProvider = ({children}:IChildren) => {
    const [data, setData] = useState("data in context");
    return (
        <Context.Provider value={data}>
            {children}
        </Context.Provider>
    );
}
```
> Main.jsx
```html
  <ContextProvider>
    <App />
  </ContextProvider>
```
> App.jsx
```js
export function App() {
  const value = useContext(Context); 
  return (
    <h1>{value}</h1>
  )
}
```

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

## Carpeta Mooks
__Para contener datos de prueba, por ejemplo json con la respuesta de una api para evitar llamar a la api continuamente en el desarrollo o para mantener la consistencia en los datos mientras se desarrolla la app.__

## Playwright
__Para realizar pruebas de validacion__
> Instalacion
```sh
npm init playwright@latest
npx playwright install-deps
```
> Ejecutar los test
```sh
npx playwright test
```


## CSS
### Grid
__Sirve para poner los elementos en forma de rejilla__
```css
display: grid;
grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
```
* __grid-template-columns__: indica la forma en que se dispondra la rejilla.
* __repeat__: indica que el patron se va a repetir.
* __auto-fit__:indica como se ajustaran las filas y columnas al espacio disponible.
* __minmax(200px, 1fr)__: indica que tendra un tamaño de 200px y que podra crecer como maximo a 1fr.

### Unidad fr
__La unidad fr reprecenta una fraccion del tamaño__
* Solo se puede usar en el Grid.
* Si un elemento mide 100px un `1fr=100px`, `1fr 1fr = 50px 50px`, `1fr 3fr = 25px 75px`.  

