import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import {addNewUser} from '../controllers/userController'

const AddUserSelect = () => {

    const voivodeshipList = ["dolnośląskie", "kujawsko-pomorskie", "lubelskie", "lubuskie", "łódzkie", "małopolskie", 
    "mazowieckie", "opolskie", "podkarpackie", "podlaskie", "pomorskie", "śląskie", "świętokrzyskie", 
    "warmińsko-mazurskie", "wielkopolskie", "zachodniopomorskie"];

    const history = useHistory();
    
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [voivodeship, setVoivodeship] = useState("- wybierz -");
    const [townOptions, setTownOptions] = useState([]);
    const [selectedTown, setSelectedTown] = useState("- wybierz -");
    const [streetName, setStreetName] = useState("");
    const [addressOptions, setAddressOptions] = useState([]);
    const [fullAddressOptions, setFullAddressOptions] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState("");
    const [addressRemainingDetails, setAddressRemainingDetails] = useState({})

    const makeInputActiveInactive = (idCondition, idChange) => {
        let elementActiveText = document.getElementById(idCondition).value
        document.getElementById(idChange).disabled = (elementActiveText === "- wybierz -") ? true : false
    }

    const disableById = (id) => {
        document.getElementById(id).disabled = true
    }

    const handleVoivodeshipSelect = async (e) => {
        disableById("streetSelection");
        disableById("addressSelection");
        setStreetName("");
        setAddressOptions([]);
        setFullAddressOptions([]);
        setSelectedAddress("");
        setSelectedTown("- wybierz -")
        setVoivodeship(e.target.value);

        const reqBody = [
            {
                "level": "woj",
                "v": e.target.value
            }
        ]

        await fetch('https://capap.gugik.gov.pl/api/fts/hier/pkt/qq', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(reqBody),
            })
            .then(response => response.json())
            .then(data => {
                const tags = data._search.tags
                const resultArray = tags.map((e) => e.tag)
                resultArray.shift();
                if (e.target.value === "pomorskie") resultArray.shift();
                setTownOptions(resultArray)
                makeInputActiveInactive("voivodeshipSelection", "townSelection")
            })
    }

    const handleTownSelection = (e) => {
        setStreetName("")
        setAddressOptions([])
        setFullAddressOptions([])
        setSelectedAddress("")
        setSelectedTown(e.target.value)
        disableById("addressSelection")
        makeInputActiveInactive("townSelection", "streetSelection")
    }
    
    const handleStreetInput = (e) => {
        setStreetName(e.target.value)
    }
    

    const getGimnaPowiatFromApi = async () => {

        if (streetName === "") {
            setAddressOptions([])
            setFullAddressOptions([])
            disableById("addressSelection")
            return
        }

        const reqBody = { "reqs": [
                {
                "q": `${selectedTown} ${streetName}`
                }
            ],
            "useExtServiceIfNotFound": true
        }

        await fetch('https://capap.gugik.gov.pl/api/fts/gc/pkt', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(reqBody),
            })
            .then(response => response.json())
            .then(data => {
                if (!data[0].others) return;
                const addresses = data[0].others
                setFullAddressOptions(data[0].others);
                const resultArray = addresses.sort((a, b) => a.pkt_numer - b.pkt_numer).map((e) => e.name)
                setAddressOptions(resultArray)
                makeInputActiveInactive("townSelection", "addressSelection")
            })
    }

    const updateAddress = () => {
        const finalAddress = fullAddressOptions.find(address => address.name === selectedAddress)
        if (finalAddress) {
            setAddressRemainingDetails({
                postcode : finalAddress.pkt_kodPocztowy,
                gmina : finalAddress.gm_nazwa,
                powiat : finalAddress.pow_nazwa,
                streetNumber : finalAddress.pkt_numer,
            });
            document.getElementById("printedAddress").innerHTML = finalAddress.longDesc
        }
    }

    useEffect(updateAddress, [selectedAddress])

    return (
        <div className="container" style={{"width": "50%"}}>
            <form className="form-group" style={{"lineHeight": "0.8", "fontSize": "0.9em"}} 
            onSubmit={e => addNewUser(e, history, firstName, lastName, email, voivodeship, addressRemainingDetails.powiat, 
            addressRemainingDetails.gmina, selectedTown, streetName, addressRemainingDetails.postcode, addressRemainingDetails.streetNumber)}>
            <label htmlFor="firstName">Imię:</label>
                <input onChange={e => setFirstName(e.target.value)} className="form-control form-control-sm" type="text" id="firstName" value={firstName} /><br />
                <label htmlFor="lastName">Nazwisko: </label>
                <input onChange={e => setLastName(e.target.value)} className="form-control form-control-sm" type="text" id="lastName" value={lastName} /><br />
                <label htmlFor="email">Email: </label>
                <input onChange={e => setEmail(e.target.value)} className="form-control form-control-sm" type="text" id="email" value={email} /><br />
                <label htmlFor="voivodeshipSelection">Województwo: </label>
                <select className="form-control form-control-sm" onChange={e => handleVoivodeshipSelect(e)} value={voivodeship} id="voivodeshipSelection">
                    <option>- wybierz -</option>
                    {voivodeshipList.map((v) => {
                        return (
                            <option key={v} value={v}>{v}</option>
                            )
                        })}
                </select><br />
                <label htmlFor="townSelection">Miasto: </label>
                <select className="form-control form-control-sm" disabled onChange={e => handleTownSelection(e)} value={selectedTown} id="townSelection">
                    <option>- wybierz -</option>
                    {townOptions.map((e) => {
                        return (
                            <option value={e} key={e}>
                                {e}
                            </option>
                        )
                    })}
                </select><br />
                <label htmlFor="streetName">Ulica: </label>
                <input disabled onBlur={() => {getGimnaPowiatFromApi()}} type="text" className="form-control form-control-sm" value={streetName} 
                    onChange={e => {handleStreetInput(e)}} id="streetSelection"/><br />
                <label htmlFor="selectedAddress">Adres: </label>
                <select className="form-control form-control-sm" disabled value={selectedAddress} onChange={e => setSelectedAddress(e.target.value)} id="addressSelection">
                    <option>- wybierz -</option>
                        {addressOptions.map((e) => {
                            return (
                                <option value={e} key={e}>
                                    {e}
                                </option>
                            )
                        })}
                </select><br />
                <div style={{"textAlign": "right"}}><button className="btn btn-info" type="submit">Dodaj</button></div>
            </form>
            <div id="printedAddress"></div>
            <br />
            <button className="btn btn-outline-info" onClick={() => history.push("/")}>Główna</button>
        </div>
    )
}

export default AddUserSelect
