const axios = require("axios");

const getPricePerHour = () => {
    return new Promise((resolve, reject) => {
        axios
            .get("https://api.esios.ree.es/archives/70/download_json?locale=es")
            .then((response) => {
                return resolve(response.data);
            })
            .catch(() => {
                return resolve(null);
            });
    });
};

module.exports = {
    getPricePerHour
};
