import * as url from 'url'
import * as https from 'https'
import { JSDOM } from 'jsdom'
import axios from 'axios'
import { normalizeURL, parseOriginWithPath } from './crawl.js'
import { getHeaders, getRandomElement } from './scrape_scripts.js'










async function getPageData(url) {
    
    try {
        // Use axios module for integrating proxy connection
        const instance = axios.create({
            proxy: proxyConfig,
            httpsAgent: new https.Agent({
                rejectUnauthorized: false
            })
        })
        
        const response = await instance.get(url)
        
        if (response.status > 399) {
            console.log(`Status code error ${response.status}`)
        }
        const contentType = response.headers.get('content-type')
        if (!contentType || !contentType.includes('text/html')) {
            console.log(`Invalid content-type ${response.headers.get('content-type')}`)
        }
        
        const bodyString = response['data']
        return bodyString
    
    } catch (error) {
        if (error.response) {
            console.log('RESPONSE ERROR')
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            console.log(error.message)
        } else if (error.request) {
            console.log('REQUEST ERROR')
            console.log(error.request);
            console.log(error.message)
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
        }    
    }   
   
}



function getURLsFromHTML(htmlBody) {
    const urls = []
    const dom = new JSDOM(htmlBody)
    const body = dom.window.document
    const p = body.querySelectorAll('a')
    for(const url of p) {
        urls.push(url.href)
    }
    
    return urls
}

function scrapePage(bodyString, url) {
    const dom = new JSDOM(bodyString)
    const resultsCont = dom.window.document.querySelectorAll('.offer-box')
    for(const result of resultsCont) {
        const price = result.querySelector('.main-price')
        const mainLinkCont = result.querySelector('h2')
        const mainLinkHref = mainLinkCont.querySelector('a').href
        const productLink = parseOriginWithPath(url, mainLinkHref )
    
        console.log(price.getAttribute('mainprice'))
        console.log(mainLinkCont.textContent.trim())
        console.log(productLink)
    }
}

function scrapePage1(bodyString, item) {
    const dom = new JSDOM(bodyString)
    // Find all links
    const links = dom.window.document.querySelectorAll('a')
    const itemWordList = item.toLowerCase().split(' ')
    const targetLinks = []
    // Select links that contains searched item text
    for (const link of links) {
        const linkWordList = link.textContent.trim().toLowerCase().split(' ')
        const listChecker = itemWordList.map(item => item)
        for (let i=0; i < itemWordList.length; i++) { 
            if (linkWordList.includes(itemWordList[i])) {
                const index = listChecker.indexOf(itemWordList[i])
                listChecker.splice(index, 1)
            }
        }
        
        if (!listChecker.length) {
            targetLinks.push(link)
        }
    }
    targetLinks.forEach((link) => {
        console.log(link.textContent.trim())
    })
    
    console.log(targetLinks)
    

}
function removeTags(str) {
    if ((str === null) || (str === '')) {
        return false
    } 
    return str.replace(/(<([^>]+)>)/, '')
}

async function main(item) {
    const encodedItem = encodeURIComponent(item)
    const site1 = `https://www.mediaexpert.pl/search?query%5Bquerystring%5D=${encodedItem}`
    const siteData = await getPageData(site1)
    scrapePage(siteData, site1)
    return siteData
}

let data = await main('ryzen')



