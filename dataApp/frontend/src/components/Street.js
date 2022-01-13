import { Circle } from "react-leaflet";



export const Street= ({position}) =>{
    const pathoptions = {fillColor: "red", fillOpacity: 1, stroke: false}
    return(
       <Circle center={position} radius={200} pathOptions={pathoptions} ></Circle>
    );

};