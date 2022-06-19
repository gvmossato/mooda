const axios = require('axios');


function getSensorData(params) {
    const endpoint = process.env.NODE_ENV === 'development' ? 'localhost:3001/api' : 'https://mood-a.herokuapp.com/api'
    const query = new URLSearchParams(params).toString()

    axios
        .get(endpoint + query)
        .then(res => {
            console.log(res);
        })
        .catch(error => {
            console.error(error);
        });
}

module.exports = getSensorData
