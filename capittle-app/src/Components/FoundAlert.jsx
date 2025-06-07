function FoundAlert({message, type}){
    return(<div className={`alert alert-${type}`} role="alert">{message}</div>);
}

export default FoundAlert;