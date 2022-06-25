import React, { useEffect, useState, useContext } from 'react'
import { ThreeDots } from 'react-loader-spinner';
import { formatDate } from '../../utils/format'
import getPlotData from '../../utils/getPlotData';

import Chart from "react-apexcharts";
import FocusContext from '../../contexts/FocusContext';
import DatePicker from '../DatePicker'

import "./styles.scoped.css";


function SensorPlot() {
    const { focus } = useContext(FocusContext)

    const [seriesData, setSeriesData] = useState([]);
    const [startDate, setStartDate] = useState(formatDate());
    const [endDate, setEndDate] = useState(formatDate());

    useEffect(() => {
        async function requestData(focus, startDate, endDate) {
            setSeriesData([])
            const res = await getPlotData(focus, startDate, endDate)
            setSeriesData(res)
            return
        }

        requestData(focus, startDate, endDate)
    }, [focus, startDate, endDate]);

    function handleStartDateChange(event) {
        setStartDate(formatDate(event.target.value))
    }

    function handleEndDateChange(event) {
        setEndDate(formatDate(event.target.value))
    }

    const sensorsMaps = {
        airMoisture: {
            id: 'airMoisture',
            name: 'Umidade do Ar',
            color: '#00EEFF',
            unit: '%'
        },
        soilMoisture: {
            id: 'soilMoisture',
            name: 'Umidade do Solo',
            color: '#0099FF',
            unit: '%'
        },
        luminosity: {
            id: 'luminosity',
            name: 'Luminosidade',
            color: '#FFF600',
            unit: 'lúmen'
        },
        temperature: {
            id: 'temperature',
            name: 'Temperatura',
            color: '#FF5C00',
            unit: '°C'
        },
        airQuality: {
            id: 'airQuality',
            name: 'Qualidade do Ar',
            color: '#D0F7F7',
            unit: 'ppm CO₂'
        },
        happiness: {
            id: 'happiness',
            name: 'Felicidade',
            color: '#FF67F0',
            unit: ''
        },
        presence: {
            id: 'presence',
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
            categories: seriesData[1],
            axisBorder: {
                show: false,
            },
            axisTicks: {
                show: false,
            },
        },
        yaxis: {
            decimalsInFloat: 2,

        },
        title: {
            text: sensorsMaps[focus].unit,
            style: {
                color: sensorsMaps[focus].color,
            },
        },
        grid: {
            borderColor: '#171717',
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
            <div>
                <h1 className={"text-title " + sensorsMaps[focus].id}>
                    { sensorsMaps[focus].name }
                </h1>
                <div>
                    <DatePicker onChange={handleStartDateChange} value={startDate} />
                    <DatePicker onChange={handleEndDateChange} value={endDate} />
                </div>
            </div>
            <div className="graph">
                {
                    seriesData.length ?
                    <Chart options={plotOptions} series={plotData} type="area" height="350" width="700" />
                    :
                    <ThreeDots />
                }
            </div>
        </section>
    );
}

export default SensorPlot;
