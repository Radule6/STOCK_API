const express = require("express")
const app = express()
const port = 3000
const { getStocksData,getStockData } = require("./stock");
let stocks = {}
const nasdaqStocks = [
    "AAPL", "AMZN", "MSFT", "GOOGL", "META", "TSLA", "NVDA", "INTC", "CSCO", "ADBE",
    "NFLX", "SBUX", "AVGO", "GILD", "PYPL", "AMGN", "BIIB", "AMAT", "ZM", "MRNA",
    "REGN", "CMCSA", "INTC", "MU", "ASML", "JD", "BIDU", "ILMN", "KHC", "PDD"
];

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, async () => {
    console.log(`Example app listening on port ${port}`);
    `stocks = await getStocksData(nasdaqStocks)
        .then((stocksData) => {
            return stocksData
        })
        .catch((error) => {
            console.error('Error fetching stock data:', error.message);
        });
        console.log("Stocks are done loading")
`
    }
);

app.get('/api/hello', async(req, res) => {
    const stock = await getStockData("AAPL")
    res.json(stock);
});
