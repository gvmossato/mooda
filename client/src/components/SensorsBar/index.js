import React, { useContext } from "react";

import FocusContext from "../../contexts/FocusContext";

import { TbWind } from 'react-icons/tb';
import { AiOutlineSmile, AiFillSmile } from 'react-icons/ai';
import { MdOutlineWaterDrop, MdWaterDrop } from 'react-icons/md';
import { RiUserLine, RiUserFill, RiWindyFill } from 'react-icons/ri'
import { BsLightbulb, BsLightbulbFill, BsThermometerLow, BsThermometerHigh } from 'react-icons/bs';

import "./styles.scoped.css";


function SensorsBar() {


    const sensorsIcons = [
        {
            id: 'moisture',
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

    const { focus, setFocus } = useContext(FocusContext)

    return (
        <aside>
            {
                sensorsIcons.map(el => { return (
                    <button id={el.id} key={el.id} onClick={() => setFocus(el.id)}>
                        { el.id === focus ? el.focusIcon : el.baseIcon }
                    </button>
                )})
            }
        </aside>
    );
}

export default SensorsBar;
