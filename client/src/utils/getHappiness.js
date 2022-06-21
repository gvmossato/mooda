const axios = require('axios');


async function getHappiness(params) {
    const endpoint = process.env.NODE_ENV === 'development' ? 'localhost:3001/api/happiness' : 'https://mood-a.herokuapp.com/api/happiness'
    const query = new URLSearchParams(params).toString()

    return await axios
        .get(endpoint + query)
        .then(res => {
            console.log(res);
            return res
        })
        .catch(error => {
            console.error(error);
            return
        });
}

module.exports = getHappiness
