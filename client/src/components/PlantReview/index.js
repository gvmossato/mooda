import { BsCheckCircleFill, BsXCircleFill } from 'react-icons/bs';
import getStatus from '../../utils/getStatus';
import HappinessBar from '../HappinessBar';

import "./styles.scoped.css";

const status = [
    {
        id: 'moisture',
        name: 'Umidade Solo & Ar',
        isFine: getStatus('soilMoisture') && getStatus('airMoisture')
    },
    {
        id: 'luminosity',
        name: 'Luminosidade',
        isFine: getStatus('luminosity')
    },
    {
        id: 'temperature',
        name: 'Temperatura',
        isFine: getStatus('temperature')
    },
    {
        id: 'airQuality',
        name: 'Qualidade do Ar',
        isFine: getStatus('airQuality')
    },
]

function PlantReview() {
    return (
        <aside>
            <img src="" alt="mooda-logo" />
            <div>
                <img src="" alt="plant-pic"/>

                { <HappinessBar /> }

                {
                    status.map(el => { return (
                        <div id={el.id}>
                            <p>{el.name}</p>
                            <p className={"icon " + (el.isFine ? "check" : "cross")}>
                                { el.isFine ? <BsCheckCircleFill /> : <BsXCircleFill /> }
                            </p>
                        </div>
                    )})
                }
            </div>
        </aside>
    );
}

export default PlantReview;
