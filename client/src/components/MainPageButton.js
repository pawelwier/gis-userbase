import React from 'react'

const MainPageButton = ( {history} ) => {
    return (
        <div>
            <button className="btn my-green-button" onClick={() => history.push("/")}>Główna</button>
        </div>
    )
}

export default MainPageButton