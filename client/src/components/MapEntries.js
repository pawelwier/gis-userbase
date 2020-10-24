import React, { useEffect, useState } from 'react'
import ReactMapGL, { Marker } from 'react-map-gl'
import { useHistory } from 'react-router-dom'
import SelectedUserInfo from './SelectedUserInfo';
import '../App.css'
import markerImg from '../mapmarker.png'

const MapEntries = () => {
    let history = useHistory();

    const [viewport, setViewport] = useState({
        width: "560px",
        height: "550px",
        latitude: 51.9577,
        longitude: 19.0676,
        zoom: 5.2
    })
    const [allUserLocations, setAllUserLocations] = useState([]);
    const [selectedUser, SetSelectedUser] = useState({})
    
    

    useEffect(() => { 
        async function fetchData() {
            await fetch('http://localhost:3003/api/v1/users')
            .then(response => response.json())
            .then(data => {
                console.log(data.count);
                setAllUserLocations(data.count)
            })
        }
        
        fetchData()
    }, [])

    return (
        <div className="container" style={{"width": "50%"}}>
            <ReactMapGL 
            {...viewport} 
            mapboxApiAccessToken="pk.eyJ1IjoicGF3ZWx3aWVyIiwiYSI6ImNrZHZqZXZxdDJqNzAyd3R2Y2N5bjFtcGoifQ.7PEYnuS1yokxBbRFsJlc4Q" 
            onViewportChange={setViewport}
            >
                
                {allUserLocations && allUserLocations.map((el) => { 
                    return (
                        <Marker
                            key={el.id}
                            latitude={el.latitude}
                            longitude={el.longitude}
                            offsetTop={-12}
                            offsetLeft={-15}
                        ><div id="exMarker" onClick={() => {SetSelectedUser(el)}}><img src={markerImg} /></div></Marker>
                )}
                )} 
            </ReactMapGL>
            {selectedUser.id && <SelectedUserInfo user={selectedUser} />}
            <br />
            <button className="btn btn-outline-info" onClick={() => history.push("/")}>Główna</button>
        </div>
    )
}

export default MapEntries
