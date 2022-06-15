import React from "react";

import { RiUserLine, RiUserFill } from 'react-icons/ri'
import {
    MdOutlineWaterDrop, MdWaterDrop
} from 'react-icons/md';
import { AiOutlineSmile, AiFillSmile } from 'react-icons/ai';
import {
    BsLightbulb, BsLightbulbFill,
    BsThermometerLow, BsThermometerHigh,
    BsWind,

} from 'react-icons/bs';


import "./style.css";

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
        baseIcon: <BsWind />,
        focusIcon: <BsWind />,
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
]

function SensorsBar(focused) {
    return (
        <aside>
            {
                sensors.map(el => { return (
                    <button>
                        { el.id === focused ? el.focusIcon : el.baseIcon }
                    </button>
                )})
            }
        </aside>
    );
}

export default SensorsBar;
