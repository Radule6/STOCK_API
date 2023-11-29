const express = require("express")
const app = express()
const port = 3000
const { getStocksData, getStockData } = require("./stock");
let stocks = {}
const nasdaqStocks = [
    "AAPL", "AMZN", "MSFT", "GOOGL", "META", "NVDA", "INTC", "CSCO", "ADBE", "NFLX",
    "SBUX", "GILD", "PYPL", "AMGN", "BIIB", "AMAT", "REGN", "CMCSA", "MU", "ILMN",
    "KHC", "AMD", "COST", "PEP", "QCOM", "TXN", "HON", "ADI", "VRTX", "PANW"];

app.get('/', async (req, res) => {
    res.send('Hello World!')
}
);


app.listen(port, async () => {
    console.log(`Example app listening on port ${port}`);
    stocks = await getStocksData(nasdaqStocks)
        .then((stocksData) => {
            return stocksData
        })
        .catch((error) => {
            console.error('Error fetching stock data:', error.message);
        });
    console.log("Stocks are done loading")

}
);

app.get('/api/getStocks', async (req, res) => {
    res.json(stocks)
});
