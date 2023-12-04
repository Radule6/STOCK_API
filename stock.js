const axios = require('axios');
const cheerio = require('cheerio');

async function getStocksData(array) {
  const stocks = await Promise.all(array.map(item => getStockData(item)));
  return stocks
}

async function getStockData(symbol){
  try{
    const url = `https://www.google.com/finance/quote/${symbol}:NASDAQ`
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const preMarketPrice = $('div').filter(function() {
      return $(this).attr('class') === 'YMlKec fxKbKc';
    }).eq(0).text();

    let previousClosePrice = $('.P6K39c').eq(0).text();
    let dayRange = $('.P6K39c').eq(1).text();
    let yearRange = $('.P6K39c').eq(2).text();
    let marketCap = $('.P6K39c').eq(3).text();
    let avgVolume = $('.P6K39c').eq(4).text();
    let peRatio = $('.P6K39c').eq(5).text();
    let dividendYield = $('.P6K39c').eq(6).text();  
    let primaryExchange = $('.P6K39c').eq(7).text();

    let cdpClimateChangeScore = $('.P6K39c').eq(8).text();

    if (cdpClimateChangeScore.length >3){
        cdpClimateChangeScore = 'Not provided'
    }
    let about = $('.bLLb2d').text()


    let ceo = $('a.tBHE4e').eq(1).text();
    let founded = $('.P6K39c').eq(10).text();
    let headquarters = $('.P6K39c').eq(11).text();
    let website =$('a.tBHE4e').last().text();
    let name =$('.zzDege').text();

    const stock = {
      name,
      symbol,
      about,
      founded,
      headquarters,
      website,
      ceo,
      previousClosePrice,
      preMarketPrice,
      dayRange,
      yearRange,
      marketCap,
      avgVolume,
      peRatio,
      dividendYield,
      primaryExchange,
      cdpClimateChangeScore
    }
    return stock
  }catch(error){
    return error
  }
}


module.exports={getStocksData,getStockData}

