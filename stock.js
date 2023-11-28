const axios = require('axios');
const cheerio = require('cheerio');
const { privateDecrypt } = require('crypto');
const fs = require('fs')






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
    }).text();

    const previousClosePrice = $('.P6K39c').eq(0).text();
    const dayRange = $('.P6K39c').eq(1).text();
    const yearRange = $('.P6K39c').eq(2).text();
    const marketCap = $('.P6K39c').eq(3).text();
    const avgVolume = $('.P6K39c').eq(4).text();
    const peRatio = $('.P6K39c').eq(5).text();
    const dividendYield = $('.P6K39c').eq(6).text();  
    const primaryExchange = $('.P6K39c').eq(7).text();
    const about = $('.bLLb2d').text()
    const ceo = $('a.tBHE4e').eq(1).text();
    const founded = $('.P6K39c').eq(9).text();
    const headquarters = $('.P6K39c').eq(10).text();
    const website =$('.P6K39c').eq(11).text();
    const name =$('.zzDege').text();
    const test= $("div.P6K39c").eq(8).text()
    console.log($('.P6K39c').text());

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
      primaryExchange
    }
    return stock
  }catch(error){
    return error
  }
}


module.exports={getStocksData,getStockData}

