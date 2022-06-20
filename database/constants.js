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
    }
}

const weights = {
    luminosity:   3,
    temperature:  1,
    soilMoisture: 4,
    airMoisture:  1,
    airQuality:   3
}

module.exports = { thresholds, weights }
