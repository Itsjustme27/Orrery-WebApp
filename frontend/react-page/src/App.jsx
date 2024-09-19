
import { useState, useEffect } from 'react';
import Earth from './Planets/Earth';
import Sun from './Planets/Sun';


export default function App() {
    
    fetch("http://127.0.0.1:5000/api/orbits").then(response => response.json()).then(data => {{
        console.log(data);
    }
    });
    return(
        <>
            <Sun />
        </>
    )

}