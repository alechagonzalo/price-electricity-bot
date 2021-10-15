const { TwitterClient } = require("twitter-api-client");
const cron = require("node-cron");
const { tweetPrices } = require("./functions/functions");
const { getPricePerHour } = require("./api/api");
require("dotenv").config();

const twitterClient = new TwitterClient({
    apiKey: process.env.TWITTER_API_KEY,
    apiSecret: process.env.TWITTER_API_SECRET,
    accessToken: process.env.TWITTER_ACCESS_TOKEN,
    accessTokenSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

// Schedule task to tweet at 8pm the lowest prices of electricity in Spain
cron.schedule("0 15 * * *", async () => {
    const pricePerHour = await getPricePerHour();
    if (!pricePerHour) {
        console.error("Error al leer datos de electricidad");
        return;
    }

    tweetPrices(twitterClient, pricePerHour);
});
