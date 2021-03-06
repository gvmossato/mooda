import React, { useEffect, useState, useContext } from 'react'
import { TailSpin } from 'react-loader-spinner';
import getMetrics from '../../utils/getMetrics';

import FocusContext from '../../contexts/FocusContext';

import "./styles.scoped.css";


function SensorSummary() {
    const { focus } = useContext(FocusContext);

    const [periodMetrics, setPeriodMetrics] = useState([]);

    const namesMap = {
        'years': 'Ano',
        'months': 'Mês',
        'days': 'Dia',
    }

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
                max: 50
            },
            airMoisture: {
                min: 10,
                max: 80
            },
            airQuality: {
                min: 400,
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

        if (value === '---') return ''

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
                            <h3 className={"text-title " + focus}>{namesMap[el.period]}</h3>
                            <div className="period-metric">
                                <p>Máximo:</p>
                                <p className={getGradeClassName(focus, el.max)}>{el.max}</p>
                            </div>
                            <div className="period-metric">
                                <p>Média:</p>
                                <p className={getGradeClassName(focus, el.mean)}>{el.mean}</p>
                            </div>
                            <div className="period-metric">
                                <p>Mínimo:</p>
                                <p className={getGradeClassName(focus, el.min)}>{el.min}</p>
                            </div>
                        </div>
                    ))
                :
                    <div className="loading-box">
                        <TailSpin color="#636363" height={200} width={100} />
                    </div>
            }
        </section>
    );
}

export default SensorSummary;
