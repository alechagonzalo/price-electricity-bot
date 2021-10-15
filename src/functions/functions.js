require("dotenv").config();
const { getPricesChart } = require("../api/api");
const { mapperDataAMToDataVM } = require("./mapper");

const QuickChart = require("quickchart-js");

const sortByPrice = (objs) => {
    return [...objs.PVPC].sort((a, b) =>
        parseFloat(a.PCB) > parseFloat(b.PCB)
            ? 1
            : parseFloat(b.PCB) > parseFloat(a.PCB)
            ? -1
            : 0
    );
};

const generatePricesText = (prices) => {
    const sortedByPrice = mapperDataAMToDataVM(sortByPrice(prices));
    let text = `Horas mas baratas  ${prices.PVPC[0].Dia}:`;
    sortedByPrice.forEach((h, i) => {
        if (i < 7) text += `\n${i + 1}. ${h.hour} hs. €${h.price} MW/h`;
    });

    return text;
};

const generatePricesChart = async (prices) => {
    const mappedPrices = mapperDataAMToDataVM(prices);

    const labels = [];
    const data = [];

    mappedPrices.forEach((p) => {
        labels.push(`${p.hour}`);
        data.push(p.price.replace(",", "."));
    });

    const myChart = new QuickChart();
    myChart
        .setConfig({
            type: "bar",
            data: {
                labels: labels,
                datasets: [{ label: "Precio  MW/h", data: data }]
            }
        })
        .setWidth(800)
        .setHeight(400)
        .setBackgroundColor("white");

    return getPricesChart(myChart.getUrl());
};

const tweetPrices = async (twitterClient, prices) => {
    try {
        const textTweet = generatePricesText(prices);
        const imgBase64 = await generatePricesChart(prices.PVPC);
        const media = await twitterClient.media.mediaUpload({
            media_data: imgBase64
        });

        twitterClient.tweets
            .statusesUpdate({
                status: textTweet,
                media_ids: [media.media_id_string]
            })
            .then((response) => {
                console.log("Tweeted! ->", response.created_at);
            })
            .catch((err) => {
                console.error(err);
            });
    } catch (error) {
        console.log(error);
    }

    return;
};

module.exports = {
    tweetPrices
};
