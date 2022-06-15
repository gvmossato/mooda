import React from 'react';

import SensorsBar from '../../components/SensorsBar';

export default function Dashboard() {
    return(
        <div>
            <p>Dashboard</p>

            { <SensorsBar/> }
        </div>
    );
}
