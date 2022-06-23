import React, { useCallback, useEffect, useState, useContext } from 'react'
import { ThreeDots } from 'react-loader-spinner';
import Chart from "react-apexcharts";

import getPlotData from '../../utils/getPlotData'
import FocusContext from '../../contexts/FocusContext';

import "./styles.scoped.css";



function SensorPlot() {
    const { focus } = useContext(FocusContext)

    const [seriesData, setSeriesData] = useState([]);

    const seriesCallback = useCallback(
        async (focus, startDate, endDate) => {
            setSeriesData([])
            return await getPlotData(focus, startDate, endDate)
        }, []
    );

    useEffect(() => {
        seriesCallback(focus, '2022-06-20', '2022-06-21').then(res => setSeriesData(res))
    }, [seriesCallback, focus]);

    const sensorsMaps = {
        airMoisture: {
            name: 'Humidade do Ar',
            color: '#00EEFF',
            unit: '%'
        },
        soilMoisture: {
            name: 'Humidade do Solo',
            color: '#0099FF',
            unit: '%'
        },
        luminosity: {
            name: 'Luminosidade',
            color: '#FFF600',
            unit: 'lúmen'
        },
        temperature: {
            name: 'Temperatura',
            color: '#FF5C00',
            unit: '°C'
        },
        airQuality: {
            name: 'Qualidade do Ar',
            color: '#D0F7F7',
            unit: 'ppm CO₂'
        },
        happiness: {
            name: 'Felicidade',
            color: '#FF67F0',
            unit: ''
        },
        presence: {
            name: 'Presença',
            color: '#C870FF',
            unit: ''
        },
    }

    const plotData = [{
        name: sensorsMaps[focus].name,
        data: seriesData[0]
    }]

    const plotOptions = {
        chart: {
            fontFamily: 'Nunito, Helvetica, sans-serif',
            foreColor: '#636363'
        },
        xaxis: {
            type: 'datetime',
            categories: seriesData[1]
        },
        yaxis: {
            decimalsInFloat: 0,

        },
        title: {
            text: sensorsMaps[focus].unit,
            style: {
                color: sensorsMaps[focus].color,
            },

        },
        grid: {
            borderColor: '#1E1E1E',
            strokeDashArray: 5,
        },
        curve: 'smooth',
        stroke: {
            width: 2,
            lineCap: 'round',
            colors: [sensorsMaps[focus].color],
        },
        fill: {
            type: 'gradient',
            colors: [sensorsMaps[focus].color],
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.5,
                opacityTo: 0,
            }
        },
        tooltip: {
            x: {
                show: true,
                format: 'dd/MM/yyyy HH:mm:ss',
                formatter: undefined,
            },
            followCursor: true,
            style: {
                fontSize: '12px',
                fontFamily: 'Nunito, Helvetica, sans-serif',
            },
            marker: {
                show: true,
            },
        },
        colors: [sensorsMaps[focus].color],
        markers: {
            size: 0.01,
            strokeColors: [sensorsMaps[focus].color],
            colors: [sensorsMaps[focus].color],
        },
        dataLabels: {
            enabled: false
        },
    }

    return (
        <section>
            <h1>
                { sensorsMaps[focus].name }
            </h1>
            {
                seriesData.length ?
                <Chart options={plotOptions} series={plotData} type="area" height="350" width="700" />
                :
                <ThreeDots />
            }
            <div>

            </div>
        </section>
    );
}

export default SensorPlot;
