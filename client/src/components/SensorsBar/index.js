import React, { useContext } from "react";

import FocusContext from "../../contexts/FocusContext";

import { TbWind } from 'react-icons/tb';
import { AiOutlineSmile, AiFillSmile } from 'react-icons/ai';
import { MdOutlineWaterDrop, MdWaterDrop } from 'react-icons/md';
import { RiUserLine, RiUserFill, RiWindyFill } from 'react-icons/ri'
import { BsLightbulb, BsLightbulbFill, BsThermometerLow, BsThermometerHigh, BsCloud, BsCloudFill } from 'react-icons/bs';

import "./styles.scoped.css";


function SensorsBar() {
    const { focus, setFocus } = useContext(FocusContext)

    const sensorsIcons = [
        {
            id: 'soilMoisture',
            baseIcon: <MdOutlineWaterDrop />,
            focusIcon: <MdWaterDrop />,
        },
        {
            id: 'luminosity',
            baseIcon: <BsLightbulb />,
            focusIcon: <BsLightbulbFill />,
        },
        {
            id: 'airQuality',
            baseIcon: <TbWind />,
            focusIcon: <RiWindyFill />,
        },
        {
            id: 'temperature',
            baseIcon: <BsThermometerLow />,
            focusIcon: <BsThermometerHigh />,
        },
        {
            id: 'airMoisture',
            baseIcon: <BsCloud />,
            focusIcon: <BsCloudFill />,
        },
        {
            id: 'happiness',
            baseIcon: <AiOutlineSmile />,
            focusIcon: <AiFillSmile />,
        },
        {
            id: 'presence',
            baseIcon: <RiUserLine />,
            focusIcon: <RiUserFill />,
        },
    ];

    return (
        <aside>
            {
                sensorsIcons.map(el => { return (
                    <button className={el.id + (focus === el.id ? " clicked" : "")} key={el.id} onClick={() => setFocus(el.id)}>
                        <p>{ el.id === focus ? el.focusIcon : el.baseIcon }</p>
                    </button>
                )})
            }
        </aside>
    );
}

export default SensorsBar;
