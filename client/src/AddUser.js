import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import userApi from './api/User'


const AddUser = () => {
    let history = useHistory();

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [voivodeship, setVoivodeship] = useState("")
    const [powiat, setPowiat] = useState("")
    const [gmina, setGmina] = useState("")
    const [town, setTown] = useState("")
    const [street, setStreet] = useState("")
    const [postcode, setPostcode] = useState("")
    const [streetNumber, setStreetNumber] = useState("")
    const [flatNumber, setFlatNumber] = useState("")

    const addNewUser = async(e) => {
        e.preventDefault();
        const result = await userApi.post("/", {
            firstName, lastName, email, voivodeship, powiat, gmina, town, street, postcode, streetNumber, flatNumber
        }).then(
            history.push("/")
        )
    }

    const getPostCodeFromApi = async() => {
        const addressData = {  "reqs": [
                    {
                    "q": `${town} ${street} ${streetNumber}`
                    }
                ],
                "useExtServiceIfNotFound": true
            }


        fetch('https://capap.gugik.gov.pl/api/fts/gc/pkt', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(addressData),
          })
          .then(response => response.json())
          .then(data => {
            let prefix = data[0].hasOwnProperty("single") ? data[0].single : (data[0].hasOwnProperty("others") ? data[0].others[0] : "none");
                if (prefix == "none") {
                    makeAllElementsActive();
                    document.getElementById("notFound").innerHTML = "Nie znaleziono adresu. Prosze wprowadz recznie."
                    document.getElementById("manualButton").style.visibility = "hidden"
                } else {
                    setVoivodeship(prefix.woj_nazwa)
                    setPowiat(prefix.pow_nazwa)
                    setGmina(prefix.gm_nazwa)
                    setPostcode(prefix.pkt_kodPocztowy)
                    document.getElementById("manualButton").style.visibility = "visible"
                    document.getElementById("notFound").style.visibility = "hidden"
                }
          })
    }

    const makeAllElementsActive = () => {
        let inactiveElements = document.querySelectorAll(".autoValue")
        inactiveElements.forEach(e => {
            e.disabled=!e.disabled
        })
    }

    return (
        <div>
            <form className="form-group" style={{"width": "20%", "line-height": "0.8", "font-size": "0.9em"}} onSubmit={addNewUser}>
                <label htmlFor="firstName">Imie:</label>
                <input onChange={e => setFirstName(e.target.value)} className="form-control form-control-sm" type="text" id="firstName" value={firstName} /><br />
                <label htmlFor="lastName">Nazwisko: </label>
                <input onChange={e => setLastName(e.target.value)} className="form-control form-control-sm" type="text" id="lastName" value={lastName} /><br />
                <label htmlFor="email">Email: </label>
                <input onChange={e => setEmail(e.target.value)} className="form-control form-control-sm" type="text" id="email" value={email} /> <div style={{"text-align": "right"}} id="notFound"></div><br />
                <label htmlFor="voivodeship">Wojewodztwo: </label>
                <input disabled onChange={e => setVoivodeship(e.target.value)} className="form-control autoValue form-control-sm" id="voivodeship" type="text" value={voivodeship} /><br />
                <label htmlFor="">Powiat: </label>
                <input disabled onChange={e => setPowiat(e.target.value)} className="form-control autoValue form-control-sm" type="text" value={powiat} /><br />
                <label htmlFor="">Gmina: </label>
                <input disabled onChange={e => setGmina(e.target.value)} className="form-control autoValue form-control-sm" type="text" value={gmina} /><br />
                <label htmlFor="">Kod pocztowy: </label>
                <input disabled onChange={e => setPostcode(e.target.value)} className="form-control autoValue form-control-sm" type="text" value={postcode} /> <button className="btn btn-outline-info" id="manualButton" type="button" style={{"float": "right", "font-size": "0.9em", "padding": "3px"}} onClick={() => makeAllElementsActive()}>Recznie</button><br />
                <label htmlFor="">Miejscowosc: </label>
                <input onChange={e => setTown(e.target.value)} className="form-control form-control-sm" type="text" id="" value={town} /> <br />
                <label htmlFor="">Ulica: </label>
                <input onChange={e => setStreet(e.target.value)} className="form-control form-control-sm" type="text" id="" value={street} /><br />
                <label htmlFor="">Nr domu: </label>
                <input onBlur={() => {getPostCodeFromApi()}} onChange={e => setStreetNumber(e.target.value)} className="form-control form-control-sm" type="text" id="" value={streetNumber} /><br />
                <label htmlFor="">Nr mieszkania: </label>
                <input onChange={e => setFlatNumber(e.target.value)} className="form-control form-control-sm" type="text" id="" value={flatNumber} /><br />
                <div style={{"text-align": "right"}}><button className="btn btn-info" type="submit">Dodaj</button></div>
            </form>
            <br />
            <button className="btn btn-outline-info" onClick={() => history.push("/")}>Glowna</button>
        </div>
    )
}

export default AddUser
