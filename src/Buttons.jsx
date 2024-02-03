import React from 'react'

export default function Buttons(props) {
    return (
        <div className='buttons-container'>
            <div className='corner-text'>
                <h2 className='corner-title'>FCC</h2>
                <img src="./assets/fcc-logo.webp" alt="freecodecamp logo" className='fcc-logo'/> 
            </div>
            <div className='setting-container'>
                <h4 className="setting-text">Power</h4>
                <div className={`toggle-bar ${props.power ? "on" : "off"}`} onClick={() => props.switchPower(props.power)}>
                <div className="toggle-circle" style={props.power ? {backgroundColor: "white", marginLeft: "auto"} : {backgroundColor: "#1500ff", marginRight: "auto"}}></div>
                </div>
            </div>
            <div className='note-screen'>
                <h4 className='note-name'>{props.recentAction}</h4>
            </div>
            <div className='volume-bar' id="volume-bar">
                <div className='volume-stick' id="volume-stick"></div>
            </div>
            
            <div className='setting-container'>
                <h4 className="setting-text">{props.bank === "drum" ? "Drum" : "Piano"}</h4>
                <div className={`toggle-bar ${props.bank === "drum" ? "on" : "off"}`} onClick={() => props.switchBank(props.bank)}>
                    <div className="toggle-circle" style={props.bank === "drum" ? {backgroundColor: "white", marginLeft: "auto"} : {backgroundColor: "#1500ff", marginRight: "auto"}}></div>
                </div>
            </div>
        </div>
    )
}