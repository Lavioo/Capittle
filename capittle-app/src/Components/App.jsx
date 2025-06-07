import FoundAlert from "./FoundAlert";
import Flag from "./Flag";
import { createContext, useEffect, useState } from "react";
import SubmitBtn from "./SubmitBtn";
import TextInput from "./TextInput";
import Header from "./Header";

const TextInpCtx = createContext();

function App(){
    const[country, setCountry] = useState("")
    const [v, setV] = useState("");
    const [mauvaisPays, setMauvaisPays] = useState("");
    const [found, setFound] = useState(null);

    const normalizeString = (str) => {
        return str
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[\s'-]/g, "")
            .toLowerCase();
    };

    const handleSubmitClick = () => {
        if(!v)
            return false;

        if (normalizeString(v) === normalizeString(country.name.common) || normalizeString(v) === normalizeString(country.translations.fra.common)){
            setFound(true);
            setTimeout(changeCountry, 1000);
        }else{
            setMauvaisPays(v);
            setFound(false);
            setV("");
        }
    };

    const changeCountry = () =>{
        fetch("https://restcountries.com/v3.1/independent?status=true")
        .then(resp => resp.json())
        .then(data =>{
            const ctr = data[Math.floor(Math.random() * data.length)];
            setCountry(ctr);
            setFound(null)
            setV("");
        })
        .catch((err)=>{
            console.log("Could not fetch a country", err);
        })
    }

    useEffect( changeCountry, [setCountry]);


    return (
        <TextInpCtx.Provider value={{country, setCountry, v, setV}}>
            <Header></Header>
            <div className="d-flex flex-column align-items-center">
                {found === true && (<FoundAlert message={`Bravo vous avez trouvé ${country.translations.fra.common}`} type="success"/>)}
                {found === false && (<FoundAlert message={`Non il ne s'agit pas de ${mauvaisPays}`} type="danger"/>)}
                <Flag url={country ? country.flags.svg : null} text="img"/>
                <TextInput/>
                <SubmitBtn onClick={handleSubmitClick}/>
            </div>
        </TextInpCtx.Provider>
    )
}

export { TextInpCtx };
export default App;