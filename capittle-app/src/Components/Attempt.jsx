import { useContext, useEffect, useState } from "react";
import { TextInpCtx } from "./App";

function Attempt( { att } ){
    const placeHolder = {
        name: {common: att},
        region: '?',
        subregion: '?',
        languages: {eng: '?'},
        flags: {
            svg: '?'
        }
    }
    const {country} = useContext(TextInpCtx); 
    const lnC = Object.values(country.languages)[0];
    const [attempt, setAttempt] = useState(placeHolder);
    const [ln, setLn] = useState("?");
    
    useEffect(() =>{
        if(!att) return;

        fetch(`https://restcountries.com/v3.1/translation/${att}`)
        .then(resp => resp.json())
        .then(data => {
            if(data.length === 1){
                setAttempt(data[0]);
                setLn(Object.values(data[0].languages)[0]);
            }
        })
        .catch((e) => {

        })
    }, [att])

    return(
            <ul className="list-group list-group-horizontal-md flex-fill">
                <li className={"list-group-item" + (country.name.common === attempt.name.common ? " list-group-item-success" : " list-group-item-danger")}>{attempt.name.common}</li>
                <li className={"list-group-item" + (country.region === attempt.region ? " list-group-item-success" : " list-group-item-danger")}>{attempt.region}</li>
                <li className={"list-group-item" + (country.subregion === attempt.subregion ? " list-group-item-success" : " list-group-item-danger")}>{attempt.subregion}</li>
                <li className={"list-group-item" + (lnC === ln ? " list-group-item-success" : " list-group-item-danger")}>{ln}</li>
                <li className={"list-group-item" + (country.flags.svg === attempt.flags.svg ? " list-group-item-success" : " list-group-item-danger")}><img className="img-thumbnail" src={attempt.flags.svg} alt={attempt.flags.svg} width="50px"/></li>
            </ul>
    )
}

export default Attempt;