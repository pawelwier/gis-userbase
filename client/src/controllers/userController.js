const addNewUser = async(e, history, firstName, lastName, email, voivodeship, powiat, gmina, town, street, postcode, streetNumber, flatNumber) => {
    e.preventDefault();

    await fetch("http://localhost:3003/api/v1/users", {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({firstName, lastName, email, voivodeship, powiat, gmina, town, street, postcode, streetNumber, flatNumber}) 
    })
    .then(
        history.push("/")
    )
}

export  { addNewUser }