import { Fragment, useState } from "react";
import Cursor from "../cursor/Cursor";
import SelectorList from "../selectorList/SelectorList";

export default function App() {
    const [currentCursor, setCurrentCursor] = useState("1");
    return (
       <Fragment>
         <SelectorList setCurrentCursor={setCurrentCursor}/>
         <Cursor cursorUrl={currentCursor}/>
       </Fragment>
    )
}