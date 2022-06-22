const axios = require('axios');


async function getHappiness(params) {
    const endpoint = process.env.NODE_ENV === 'development' ? 'http://localhost:3001/api/happiness' : 'https://mood-a.herokuapp.com/api/happiness'
    const query = '?' + new URLSearchParams(params).toString()
    const options = { headers: { "Content-Type": 'text/plain' } }
    try {
        var res = await axios.get(endpoint + query, options);
    } catch(err) {
        console.log(err)
    }

    return res.data
}

module.exports = getHappiness
