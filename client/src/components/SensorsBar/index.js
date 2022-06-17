import React, { useState } from "react";

import { TbWind } from 'react-icons/tb';
import { AiOutlineSmile, AiFillSmile } from 'react-icons/ai';
import { MdOutlineWaterDrop, MdWaterDrop } from 'react-icons/md';
import { RiUserLine, RiUserFill, RiWindyFill } from 'react-icons/ri'
import { BsLightbulb, BsLightbulbFill, BsThermometerLow, BsThermometerHigh } from 'react-icons/bs';

import "./style.css";


function SensorsBar() {
    const sensors = [
        {
            id: 'luminosity',
            baseIcon: <BsLightbulb />,
            focusIcon: <BsLightbulbFill />,
        },
        {
            id: 'temperature',
            baseIcon: <BsThermometerLow />,
            focusIcon: <BsThermometerHigh />,
        },
        {
            id: 'umidity',
            baseIcon: <MdOutlineWaterDrop />,
            focusIcon: <MdWaterDrop />,
        },
        {
            id: 'air',
            baseIcon: <TbWind />,
            focusIcon: <RiWindyFill />,
        },
        {
            id: 'hapiness',
            baseIcon: <AiOutlineSmile />,
            focusIcon: <AiFillSmile />,
        },
        {
            id: 'user',
            baseIcon: <RiUserLine />,
            focusIcon: <RiUserFill />,
        },
    ];

    const [focus, setFocus] = useState('luminosity');

    return (
        <aside>
            {
                sensors.map(el => { return (
                    <button id={el.id} onClick={() => setFocus(el.id)}>
                        { el.id === focus ? el.focusIcon : el.baseIcon }
                    </button>
                )})
            }
        </aside>
    );
}

export default SensorsBar;
