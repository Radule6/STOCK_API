const express = require("express")
const app = express()
const port = 3000
const { getStocksData, getStockData } = require("./stock");
let stocks = {}
const nasdaqStocks = [
    "AAPL", "AMZN", "MSFT", "GOOGL", "META", "NVDA", "INTC", "CSCO", "ADBE", "NFLX",
    "SBUX", "GILD", "PYPL", "AMGN", "BIIB", "AMAT", "REGN", "CMCSA", "MU", "ILMN",
    "KHC", "AMD", "COST", "PEP", "QCOM", "TXN", "HON", "ADI", "VRTX", "PANW"];

async function fetchStocksData() {
    try {
        stocks = await getStocksData(nasdaqStocks);
        console.log('Stocks are done loading');
    } catch (error) {
        console.error('Error fetching stock data:', error.message);
    }
}

fetchStocksData();
const interval = setInterval(fetchStocksData, 300000);
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

}
);

app.get('/api/getStocks', async (req, res) => {
    res.json(stocks)
});


app.get('/api/getUpdatedStock/:symbol', async (req, res) => {
    const stock = await getStockData(req.params.symbol)
    res.json(stock)
})
