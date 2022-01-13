import React, { useEffect, useState } from "react";
import { Street } from "./Street";



export const StreetGatherer = () => {

    const [streetInfo, setStreetinfo] = useState([])

    useEffect( async () => {

        console.log('fetching')
        let streetJson = await fetch("/getStreets")
        let streetData = await streetJson.json()
        console.log(streetData)
        setStreetinfo(streetData)
    })


    return (
        <div>
            {streetInfo.map((object) =>{
                console.log(object)
                return <Street position={[object.latitude, object.longitude]}></Street>
            })}
        </div>
    );

};