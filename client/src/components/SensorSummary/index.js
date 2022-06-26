import React, { useEffect, useState, useContext } from 'react'
import { TailSpin, ThreeDots } from 'react-loader-spinner';
import getMetrics from '../../utils/getMetrics';

import FocusContext from '../../contexts/FocusContext';

import "./styles.scoped.css";


function SensorSummary() {
    const { focus } = useContext(FocusContext);

    const [periodMetrics, setPeriodMetrics] = useState([]);

    function getGradeClassName (focus, value) {
        const thresholds = {
            luminosity: {
                min: 2000,
                max: Infinity
            },
            temperature: {
                min: 15,
                max: 27
            },
            soilMoisture: {
                min: 10,
                max: 30
            },
            airMoisture: {
                min: 10,
                max: 30
            },
            airQuality: {
                min: 300,
                max: 2000
            },
            presence: {
                min: 0.2,
                max: 1.0
            },
            happiness: {
                min: 3,
                max: 5
            }
        }

        const min = thresholds[focus].min
        const max = thresholds[focus].max

        return min <= value && value <= max ? 'good' : 'bad'
    }

    useEffect(() => {
        async function requestData(focus) {
            const days = await getMetrics(focus, 'days')
            const months = await getMetrics(focus, 'months')
            const years = await getMetrics(focus, 'years')

            setPeriodMetrics([days, months, years])
            return
        }

        requestData(focus)
    }, [focus]);


    return (
        <section>
            {
                periodMetrics.length ?
                    periodMetrics.map((el) => (
                        <div key={el.period} className={"period-box " + el.period}>
                            <h3 className={"text-title " + focus}>{el.name}</h3>
                            <div className="period-metric">
                                <p>Máximo:</p>
                                <p className={getGradeClassName(focus, el.max)}>{el.max ?? <ThreeDots />}</p>
                            </div>
                            <div className="period-metric">
                                <p>Média:</p>
                                <p className={getGradeClassName(focus, el.mean)}>{el.mean ?? <ThreeDots />}</p>
                            </div>
                            <div className="period-metric">
                                <p>Mínimo:</p>
                                <p className={getGradeClassName(focus, el.min)}>{el.min ?? <ThreeDots />}</p>
                            </div>
                        </div>
                    ))
                :
                    <TailSpin color="#636363" height={200} width={100} />
            }
        </section>
    );
}

export default SensorSummary;
