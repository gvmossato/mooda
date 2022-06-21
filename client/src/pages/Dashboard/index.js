import React from 'react';

import PlantReview from '../../components/PlantReview';
import SensorsBar from '../../components/SensorsBar';
import SensorSummary from '../../components/SensorSummary';
import SensorPlot from '../../components/SensorPlot';

import './styles.scoped.css'


export default function Dashboard() {
    return(
        <main>
            { <PlantReview /> }

            <article>
                { <SensorPlot /> }
                { <SensorSummary /> }
            </article>

            { <SensorsBar /> }
        </main>
    );
}
