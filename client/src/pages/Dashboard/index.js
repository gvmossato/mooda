import React from 'react';

import PlantReview from '../../components/PlantReview';
import SensorsBar from '../../components/SensorsBar';
import SensorPlot from '../../components/SensorSummary';
import SensorSummary from '../../components/SensorSummary copy';

import './styles.scoped.css'


export default function Dashboard() {
    const happiness = {
        'level': 3,
        'name': 'Feliz'
    }

    const status = [
        {
            id: 'luminosity',
            name: 'Luminosidade',
            isFine: false
        },
        {
            id: 'humidity',
            name: 'Umidade Sole & Ar',
            isFine: true
        },
        {
            id: 'temperature',
            name: 'Temperatura',
            isFine: true
        },
        {
            id: 'airQuality',
            name: 'Qualidade do Ar',
            isFine: true
        },
    ]

    return(
        <main>
            { <PlantReview props={{ status, happiness }} /> }

            <article>
                { <SensorPlot /> }
                { <SensorSummary /> }
            </article>

            { <SensorsBar /> }
        </main>
    );
}
