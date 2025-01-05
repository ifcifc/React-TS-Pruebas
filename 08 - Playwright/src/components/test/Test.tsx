import "./Test.css"


interface TestProp{
    text:string,
    color?:string,
    background?:string
}

export function Test({text, color="#3099d1", background="#3099d1"}:TestProp){
    return(
        <div className="ts-container" style={{
            color: color,
            backgroundColor: background
        }}>
            <p>{text}</p>
        </div>
    )
}