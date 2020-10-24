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

const makeAllElementsInactive = (selectedClass, val) => {
    let inactiveElements = document.querySelectorAll(selectedClass)
    inactiveElements.forEach(e => {
        e.disabled = val
    })
}

const disableById = (id, value) => {
    document.getElementById(id).disabled = value
}

export  { addNewUser, disableById, makeAllElementsInactive }