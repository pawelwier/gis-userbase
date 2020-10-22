import React, { useEffect, useState } from 'react'
import ReactMapGL, { Marker } from 'react-map-gl'
import { useHistory } from 'react-router-dom'

const MapEntries = () => {
    let history = useHistory();

    const [viewport, setViewport] = useState({
        width: '460px',
        height: '450px',
        latitude: 51.9577,
        longitude: 19.0676,
        zoom: 5
    })
    const [allUserLocations, setAllUserLocations] = useState([]);
    
    
    

    useEffect(() => { 
        async function fetchData() {
            const response = await fetch('http://localhost:3003/api/v1/users')
            .then(response => response.json())
            .then(data => {
                console.log(data.count);
                setAllUserLocations(data.count)
            })
        }
        
        fetchData()
    }, [])

    return (
        <>
            <ReactMapGL {...viewport} 
            mapboxApiAccessToken="pk.eyJ1IjoicGF3ZWx3aWVyIiwiYSI6ImNrZHZqZXZxdDJqNzAyd3R2Y2N5bjFtcGoifQ.7PEYnuS1yokxBbRFsJlc4Q" 
            onViewportChange={setViewport}
            >
                
                {allUserLocations && allUserLocations.map((el) => { 
                    return (
                        <Marker
                            key={el.id}
                            latitude={el.latitude}
                            longitude={el.longitude}
                        >X</Marker>
                )}
                )} 
            </ReactMapGL>
            <br />
            <button onClick={() => history.push("/")}>Glowna</button>
        </>
    )
}

export default MapEntries
