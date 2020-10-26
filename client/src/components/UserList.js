import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import '../App.css'
import { handleDelete } from '../controllers/userController'
import MainPageButton from './MainPageButton'

const UserList = () => {
    let history = useHistory();

    const [usersPrinted, setUsersPrinted] = useState([]);

    useEffect(() => {
        const userList = async () => {
            await fetch('http://localhost:3003/api/v1/users')
                .then(result => result.json())
                .then(data => {
                    data.count.sort((a, b) => a.id - b.id)
                    setUsersPrinted(data.count);
                })
        }
    
        userList()
    }, [])

    const getFullAddress = (entry) => {
        const fullAddress = entry.flat_number ? `${entry.street} ${entry.street_number}/${entry.flat_number}, ${entry.postcode} ${entry.town}` : 
        `${entry.street} ${entry.street_number}, ${entry.postcode} ${entry.town}`
        return fullAddress;
    }


    return (
        <div>
            <table className="table">
                <thead className="thead-dark">
                    <tr>
                        <th>Imię</th>
                        <th>Nazwisko</th>
                        <th>Adres</th>
                        <th> </th>
                    </tr>
                </thead>
                <tbody>
                    {usersPrinted.map(e => {
                        return (<tr key={e.id}>
                            <td>
                                {e.first_name}
                            </td>
                            <td>
                                {e.last_name}
                            </td>
                            <td>
                                {getFullAddress(e)}
                            </td>
                            <td>
                                <button onClick={() => handleDelete(e, history)} type="button" style={{"backgroundColor":"#db5a65"}} className="btn btn-danger btn-sm">Usuń</button>
                            </td>
                        </tr>)
                    })}
                </tbody>
            </table>
            
            <MainPageButton history={history} />
        </div>
    )
}

export default UserList
