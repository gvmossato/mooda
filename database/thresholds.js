const thresholds = {
    luminosity: {
        min: 1500,
        max: Infinity
    },
    temperature: {
        min: 10,
        max: 40
    },
    soilHumidity: {
        min: 30,
        max: 70
    },
    airHumidity: {
        min: 30,
        max: 70
    },
    airQuality: {
        min: 10,
        max: 90
    }
}

module.exports = thresholds
