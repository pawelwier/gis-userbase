import React from 'react'
import { useHistory } from 'react-router-dom'

const Main = () => {

    let history = useHistory();

    return (
        <>
            <button className="btn btn-primary btn-lg btn-block" onClick={() => history.push("/add")}>Dodaj użytkownika (1)</button>
            <button className="btn btn-primary btn-lg btn-block" onClick={() => history.push("/select")}>Dodaj użytkownika (2)</button>
            <button className="btn btn-primary btn-lg btn-block" onClick={() => history.push("/map")}>Mapa użytkowników</button>
            <button className="btn btn-primary btn-lg btn-block" onClick={() => history.push("/users")}>Lista użytkowników</button>
        </>
    )
}

export default Main
