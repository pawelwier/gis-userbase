import React from 'react'
import { useHistory } from 'react-router-dom'

const Main = () => {

    let history = useHistory();

    return (
        <>
            <button onClick={() => history.push("/add")}>Dodaj</button>
            <br />
            <button onClick={() => history.push("/map")}>Mapa</button>
            <br />
            <button onClick={() => history.push("/users")}>Uzytkownicy</button>
        </>
    )
}

export default Main
