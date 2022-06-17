import React from 'react';

import PlantReview from '../../components/PlantReview';
import SensorsBar from '../../components/SensorsBar';


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
        <div>
            <p>Dashboard</p>

            { <PlantReview props={{ status, happiness }} /> }

            { <SensorsBar /> }

        </div>
    );
}
