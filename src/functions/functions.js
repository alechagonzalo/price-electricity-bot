require("dotenv").config();
const { getPricePerHour } = require("../api/api");

const sortByPrice = (objs) => {
    return objs.PVPC.sort((a, b) =>
        parseFloat(a.PCB) > parseFloat(b.PCB)
            ? 1
            : parseFloat(b.PCB) > parseFloat(a.PCB)
            ? -1
            : 0
    ).map((price) => {
        return { hour: price.Hora, price: price.PCB };
    });
};

const getPrices = async (twitterClient) => {
    const pricePerHour = await getPricePerHour();
    if (!pricePerHour) {
        console.error("Error al leer datos de electricidad");
        return;
    }

    const sortedByPrice = sortByPrice(pricePerHour);
    let text = `Las horas mas baratas para el Dia ${pricePerHour.PVPC[0].Dia} son:`;
    sortedByPrice.forEach((h, i) => {
        if (i < 5) text += `\n${i + 1}. ${h.hour} -> €${h.price} MW/h`;
    });

    twitterClient.tweets
        .statusesUpdate({
            status: text
        })
        .then((response) => {
            console.log("Tweeted! ->", response.created_at);
        })
        .catch((err) => {
            console.error(err);
        });

    return;
};

module.exports = {
    getPrices
};
