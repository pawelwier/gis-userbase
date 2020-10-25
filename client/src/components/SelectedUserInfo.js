import React from 'react'
import { useHistory } from 'react-router-dom';
import { handleDelete } from '../controllers/userController'

const SelectedUserInfo = ( {user} ) => {

    const history = useHistory()
    const getFullAddress = (entry) => {
        const fullAddress = entry.flat_number ? `${entry.street} ${entry.street_number}/${entry.flat_number}, ${entry.postcode} ${entry.town}` : 
        `${entry.street} ${entry.street_number}, ${entry.postcode} ${entry.town}`
        return fullAddress;
    }

    return (
        <div style={{"marginTop": "20px", "width": "560px"}} className="card" id="selected_user">
            <div className="card-body">
                <table>
                    <tbody>
                        <tr>
                            <td style={{"width":"90%"}}>

                    <h6 className="card-title"><b>Użytkownik:</b> {user.first_name} {user.last_name}</h6>
                    <h6 className="card-subtitle"><b>Adres: </b>{getFullAddress(user)}</h6>
                            </td>
                            <td style={{"width":"10%", "textAlign":"right"}}>
                        <button onClick={() => handleDelete(user, history)} type="button" className="btn btn-danger btn-sm" style={{"backgroundColor":"#db5a65"}}>Usuń</button>

                            </td>
                        </tr>
                    </tbody>
                </table>
             </div>
        </div>
    )
}

export default SelectedUserInfo
