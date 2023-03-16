const axios = require("axios")
const cheerio = require("cheerio")

const webUrls = {
    "grid": "https://www.grid.com.ar/calzado/zapatillas/hombre?initialMap=genero&map=category-1,category-2,genero&order=OrderByPriceDESC",
    "moov": "https://www.moov.com.ar/hombre/calzado/zapatillas/hombre?srule=highest-price&start=0&sz=500",
    "digitalSports": "https://www.digitalsport.com.ar/dionysos/prods/?category[1]=1&gender=1&sort=price_regular%20desc",
    "amazon": "https://www.amazon.es/Apple-iPhone-128GB-Rojo-Reacondicionado/dp/B09MJV1MZG/ref=sr_1_18?__mk_es_ES=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=14A2KO8DOX0LN&keywords=apple+iphone+13&qid=1676989174&s=electronics&sprefix=apple+iphone+13+%2Celectronics%2C275&sr=1-18"
}

async function getMoovSneakers(){
    moovBaseURL = 'https://www.moov.com.ar'
    const moovData  = await axios.get(webUrls.moov);
    const moov = cheerio.load(moovData.data)
    const moovSneakers = []
    const productsGrid = moov('div.product-grid')
    const products = moov(productsGrid).find("div.product")

    for(let i=0; i<products.length; i++){
        let attributes = JSON.parse(moov(products[i]).find("input.productGtmData").val())
        moovSneakers.push(attributes)
    }

    return moovSneakers
}

async function scrape(){
    let moovSneakers = await getMoovSneakers()
    console.log(moovSneakers)
}

 scrape();

