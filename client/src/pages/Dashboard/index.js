import React from 'react';

import SensorsBar from '../../components/SensorsBar';

export default function Dashboard() {
    return(
        <div>
            <p>Dashboard</p>

            { <SensorsBar/> }
            <p>Non scoped styled button:</p>
            <button>Global style only</button>
        </div>
    );
}
