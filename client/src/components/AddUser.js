import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { addNewUser, disableById, makeAllElementsInactive } from '../controllers/userController'


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
                if (prefix === "none") {
                    document.getElementById("notFound").style.visibility = "visible"
                    disableById("submitButton", true)
                } else {
                    setVoivodeship(prefix.woj_nazwa)
                    setPowiat(prefix.pow_nazwa)
                    setGmina(prefix.gm_nazwa)
                    setPostcode(prefix.pkt_kodPocztowy)
                    document.getElementById("notFound").style.visibility = "hidden"
                    disableById("submitButton", false)
                }
          })
    }

    const makeAddressFieldsActive = () => {
        if (!firstName || !lastName || !email) {
            makeAllElementsInactive(".address-field", true);
        } else {
            makeAllElementsInactive(".address-field", false);
        }
    }

    const makeSubmitButtonActive = () => {
        if (firstName && lastName && email && voivodeship && powiat && gmina && town && street && postcode && streetNumber) {
            disableById("submitButton", false)
        } else disableById("submitButton", true)
    }

    useEffect(makeAddressFieldsActive, [firstName, lastName, email])
    useEffect(makeSubmitButtonActive, [firstName, lastName, email, voivodeship, powiat, gmina, town, street, postcode, streetNumber])

    return (
        <div className="container" style={{"width": "50%"}}>
            <form className="form-group" style={{"lineHeight": "0.8", "fontSize": "0.9em"}} 
            onSubmit={e => addNewUser(e, history, firstName, lastName, email, voivodeship, powiat, gmina, town, street, postcode, streetNumber, flatNumber)}>
                <label htmlFor="firstName">Imię:</label>
                <input onChange={e => setFirstName(e.target.value)} className="form-control form-control-sm" type="text" id="firstName" value={firstName} /><br />
                <label htmlFor="lastName">Nazwisko: </label>
                <input onChange={e => setLastName(e.target.value)} className="form-control form-control-sm" type="text" id="lastName" value={lastName} /><br />
                <label htmlFor="email">Email: </label>
                <input onChange={e => setEmail(e.target.value)} className="form-control form-control-sm" type="text" id="email" value={email} /> 
                <div style={{"textAlign": "right", "marginTop": "30px", "visibility":"hidden"}} id="notFound"><span className="alert alert-danger" style={{"width" : "24%"}}>Niepoprawny adres.</span></div><br />
                <label htmlFor="voivodeship">Województwo: </label>
                <input disabled onChange={e => setVoivodeship(e.target.value)} className="form-control autoValue form-control-sm" id="voivodeship" type="text" value={voivodeship} /><br />
                <label htmlFor="">Powiat: </label>
                <input disabled onChange={e => setPowiat(e.target.value)} className="form-control autoValue form-control-sm" type="text" value={powiat} /><br />
                <label htmlFor="">Gmina: </label>
                <input disabled onChange={e => setGmina(e.target.value)} className="form-control autoValue form-control-sm" type="text" value={gmina} /><br />
                <label htmlFor="">Kod pocztowy: </label>
                <input disabled onChange={e => setPostcode(e.target.value)} className="form-control autoValue form-control-sm" type="text" value={postcode} /><br />
                <label htmlFor="">Miejscowość: </label>
                <input onChange={e => setTown(e.target.value)} className="form-control form-control-sm address-field" type="text" id="" value={town} /> <br />
                <label htmlFor="">Ulica: </label>
                <input onChange={e => setStreet(e.target.value)} className="form-control form-control-sm address-field" type="text" id="" value={street} /><br />
                <label htmlFor="">Nr domu: </label>
                <input onBlur={() => {getPostCodeFromApi()}} onChange={e => setStreetNumber(e.target.value)} className="form-control form-control-sm address-field" type="text" id="" value={streetNumber} /><br />
                <label htmlFor="">Nr mieszkania: </label>
                <input onChange={e => setFlatNumber(e.target.value)} className="form-control form-control-sm address-field" type="text" id="" value={flatNumber} /><br />
                <div style={{"textAlign": "right"}}><button disabled className="btn my-green-button" type="submit" id="submitButton">Dodaj</button></div>
            </form>
            <br />
            <button className="btn  my-green-button" onClick={() => history.push("/")}>Główna</button>
        </div>
    )
}

export default AddUser
