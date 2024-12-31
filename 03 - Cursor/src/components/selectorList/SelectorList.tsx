import Selector from "../selector/Selector";
import "./SelectorList.css";


interface SelectorListProps {
    setCurrentCursor: React.Dispatch<React.SetStateAction<string>>
}

export default function SelectorList({ setCurrentCursor }: SelectorListProps): JSX.Element {
    const onClick = (index: string) => {
        setCurrentCursor(index);
    };

    return (
        <div className="sl-selector-list">
            <h3>Cursor Selector</h3>
            <ul>
                {Array.from({ length: 27 }, (_, i) => i + 1).map((i) => (
                    <li><Selector key={i} cursorUrl={i.toString()} onClick={onClick} /></li>
                ))}
            </ul>
        </div>
    )
}