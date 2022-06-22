import { BsCheckCircleFill, BsXCircleFill } from 'react-icons/bs';
import getStatus from '../../utils/getStatus';
import moodaLogo from '../../assets/mooda.png'
import plant from '../../assets/plant.png'

import HappinessBar from '../HappinessBar';

import "./styles.scoped.css";


function PlantReview() {
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
            id: 'airQuality',
            name: 'Qualidade do Ar',
            isFine: getStatus('airQuality')
        },
        {
            id: 'temperature',
            name: 'Temperatura',
            isFine: getStatus('temperature')
        },
    ]

    return (
        <aside>

                <img src={moodaLogo} alt="mooda-logo" />

            <div className="plant-review">
                <div className="plant-frame">
                    <img src={plant} alt="plant"/>
                </div>

                { <HappinessBar /> }

                <div className="status-collection">
                    {
                        status.map(el => {
                            return (
                                <div className={"status " + el.id} key={el.id}>
                                    <p>{el.name}</p>
                                    <p className={"icon " + (el.isFine ? "check" : "cross")}>
                                        { el.isFine ? <BsCheckCircleFill /> : <BsXCircleFill /> }
                                    </p>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </aside>
    );
}

export default PlantReview;
