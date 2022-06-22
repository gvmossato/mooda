import React, { useState } from 'react';

import FocusContext from '../../contexts/FocusContext';
import PlantReview from '../../components/PlantReview';
import SensorsBar from '../../components/SensorsBar';
import SensorSummary from '../../components/SensorSummary';
import SensorPlot from '../../components/SensorPlot';

import './styles.scoped.css'



export default function Dashboard() {
    const [focus, setFocus] = useState("moisture")

    return(
        <main>
            <FocusContext.Provider value={{ focus, setFocus }}>
                { <PlantReview /> }

                <article>
                    { <SensorPlot /> }
                    { <SensorSummary /> }
                </article>

                { <SensorsBar /> }
            </FocusContext.Provider>
        </main>
    );
}
