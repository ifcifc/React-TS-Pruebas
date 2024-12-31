import "./Selector.css"

interface SelectorProps {
    cursorUrl?: string;
    onClick: (url:string)=>void;
}

export default function Selector({cursorUrl="1", onClick}:SelectorProps): JSX.Element {
    return (
        <button className="cr-cursor-selector" onClick={()=>onClick(cursorUrl)}>
            <img src={`cursors/${cursorUrl}.svg`} alt="random" />
        </button>
    );
}