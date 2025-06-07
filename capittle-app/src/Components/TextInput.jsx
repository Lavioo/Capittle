import { useContext } from "react";
import { TextInpCtx } from "./App";


function TextInput(){
    const {v, setV} = useContext(TextInpCtx);
    const handleChange = (e) => {
        setV(e.target.value);
    };

    return <input className="form-control" value={v} onChange={handleChange} type="text" placeholder="Entrer un pays:" style={{width: "400px"}}/>
}

export default TextInput;