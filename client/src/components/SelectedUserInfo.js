import React from 'react'

const SelectedUserInfo = ( {user} ) => {

    const getFullAddress = (entry) => {
        const fullAddress = entry.flat_number ? `${entry.street} ${entry.street_number}/${entry.flat_number}, ${entry.postcode} ${entry.town}` : 
        `${entry.street} ${entry.street_number}, ${entry.postcode} ${entry.town}`
        return fullAddress;
    }

    return (
        <div style={{"marginTop": "20px", "width": "460px"}} className="card" id="selected_user">
            <div className="card-body">
            <h6 className="card-title"><b>Uzytkownik:</b> {user.first_name} {user.last_name}</h6>
            <h6 className="card-subtitle"><b>Adres: </b>{getFullAddress(user)}</h6>
            </div>
        </div>
    )
}

export default SelectedUserInfo
