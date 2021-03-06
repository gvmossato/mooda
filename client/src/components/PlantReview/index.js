import { useState, useEffect  } from "react";
import { BsCheckCircleFill, BsXCircleFill } from 'react-icons/bs';
import { TailSpin } from  'react-loader-spinner'

import getStatus from '../../utils/getStatus';
import moodaLogo from '../../assets/mooda.png'
import plant from '../../assets/plant.png'

import HappinessBar from '../HappinessBar';

import "./styles.scoped.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

function PlantReview() {
    const [status, setStatus] = useState([]);

    useEffect(() => {
        async function requestData() {
            const status = [
                {
                    id: 'soilMoisture',
                    name: 'Umidade do Solo',
                    isFine: await getStatus('soilMoisture')
                },
                {
                    id: 'luminosity',
                    name: 'Luminosidade',
                    isFine: await getStatus('luminosity')
                },
                {
                    id: 'airQuality',
                    name: 'Qualidade do Ar',
                    isFine: await getStatus('airQuality')
                },
                {
                    id: 'temperature',
                    name: 'Temperatura',
                    isFine: await getStatus('temperature')
                },
                {
                    id: 'airMoisture',
                    name: 'Umidade do Ar',
                    isFine: await getStatus('airMoisture')
                },
            ]
            return setStatus(status);
        }

        requestData();
    }, []);

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
                        status.length ?
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
                        :
                        <div className="loading-box">
                            <TailSpin color="#636363" height={80} width={40} />
                        </div>
                    }
                </div>
            </div>
        </aside>
    );
}

export default PlantReview;
