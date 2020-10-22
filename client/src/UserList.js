import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

const UserList = () => {
    let history = useHistory();

    const [usersPrinted, setUsersPrinted] = useState([]);

    useEffect(() => {
        const userList = async () => {
            const result = await fetch('http://localhost:3003/api/v1/users')
                .then(result => result.json())
                .then(data => {
                    console.log(data.count)
                    setUsersPrinted(data.count);
                })
        }
    
        userList()
    }, [])

    return (
        <div>
            <table>
                <tbody>
                    <tr>
                        <td>imie</td>
                        <td>nazwisko</td>
                        <td>adres</td>
                    </tr>
                    {usersPrinted.map(e => {
                        return (<tr key={e.id}>
                            <td>
                                {e.first_name}
                            </td>
                            <td>
                                {e.last_name}
                            </td>
                            <td>
                                {`${e.street} ${e.street_number} / ${e.flat_number}, ${e.postcode} ${e.town}`}
                            </td>
                        </tr>)
                    })}
                </tbody>
            </table>
            
            <button onClick={() => history.push("/")}>Glowna</button>
        </div>
    )
}

export default UserList
