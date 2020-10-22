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

    const addNewUser = async (e) => {
        e.preventDefault();
        const result = await userApi.post("/", {
            firstName, lastName, email, voivodeship, powiat, gmina, town, street, postcode, streetNumber, flatNumber
        }).then(
            history.push("/")
        )
    }
    return (
        <div>
            <form onSubmit={addNewUser}>
                <label htmlFor="">Imie: </label>
                <input onChange={e => setFirstName(e.target.value)} type="text" id="" value={firstName} /><br />
                <label htmlFor="">Nazwisko: </label>
                <input onChange={e => setLastName(e.target.value)} type="text" id="" value={lastName} /><br />
                <label htmlFor="">Email: </label>
                <input onChange={e => setEmail(e.target.value)} type="text" id="" value={email} /><br />
                <label htmlFor="">Wojewodztwo: </label>
                <input onChange={e => setVoivodeship(e.target.value)} type="text" id="" value={voivodeship} /><br />
                <label htmlFor="">Powiat</label>
                <input onChange={e => setPowiat(e.target.value)} type="text" id="" value={powiat} /><br />
                <label htmlFor="">Gmina</label>
                <input onChange={e => setGmina(e.target.value)} type="text" id="" value={gmina} /><br />
                <label htmlFor="">Miasto</label>
                <input onChange={e => setTown(e.target.value)} type="text" id="" value={town} /><br />
                <label htmlFor="">Ulica: </label>
                <input onChange={e => setStreet(e.target.value)} type="text" id="" value={street} /><br />
                <label htmlFor="">Kod pocztowy: </label>
                <input onChange={e => setPostcode(e.target.value)} type="text" id="" value={postcode} /><br />
                <label htmlFor="">Nr domu: </label>
                <input onChange={e => setStreetNumber(e.target.value)} type="text" id="" value={streetNumber} /><br />
                <label htmlFor="">Nr mieszkania: </label>
                <input onChange={e => setFlatNumber(e.target.value)} type="text" id="" value={flatNumber} /><br />
                <button type="submit">Dodaj</button>
            </form>
            <br />
            <button onClick={() => history.push("/")}>Glowna</button>
        </div>
    )
}

export default AddUser
