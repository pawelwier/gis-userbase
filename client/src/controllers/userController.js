import { html, render} from 'lit-html'

let message = (name) => html`<div class="alert alert-success">Nowy użytkownik: ${name}</div>`

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
        history.push("/"),
        render(message(`${firstName} ${lastName}`), document.getElementById("messages"))
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

const handleDelete = async (e, history) => {
    await fetch('http://localhost:3003/api/v1/users/' + e.id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(
        history.go(0)
    )
}

export  { addNewUser, disableById, makeAllElementsInactive, handleDelete }