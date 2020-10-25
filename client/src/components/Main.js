import React from 'react'
import { render } from 'lit-html'
import { mainButtons } from '../lit-components/LitButtons'
import globeIcon from '../globe_icon.png'
import '../App.css'

const Main = () => {

    const buttonArray = [
        ["add1", "Dodaj użytkownika (1)"],
        ["add2", "Dodaj użytkownika (2)"],
        ["map", "Mapa użytkowników"],
        ["users", "Lista użytkowników"]
    ]

    render(mainButtons(buttonArray), document.getElementById("buttons"))

    return (
            <div  className="container" style={{"textAlign":"center"}}><img src={globeIcon} style={{"marginTop":"50px", "width": "20%"}} /></div>
    )
}

export default Main
