const axios = require("axios");

const getPricePerHour = () => {
    return new Promise((resolve) => {
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

const getPricesChart = (url) => {
    return new Promise((resolve, reject) => {
        axios
            .get(url, { responseType: "arraybuffer" })
            .then((response) => {
                return resolve(Buffer.from(response.data).toString("base64"));
            })
            .catch((e) => {
                console.log(e);
                return resolve(null);
            });
    });
};

module.exports = {
    getPricePerHour,
    getPricesChart
};
