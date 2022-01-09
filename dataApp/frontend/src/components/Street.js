import { Rectangle } from "react-leaflet";



export const Street= (boundingbox, color) =>{



    return(
        <Rectangle bounds={boundingbox} pathOptions={color}></Rectangle>
    );

};