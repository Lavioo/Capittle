function NavBtn( { url, onClick } ){

    return <button className="btn">
                <img src={url} alt="" />
            </button>
}

export default NavBtn;