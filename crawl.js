import * as url from 'url'
import { JSDOM } from 'jsdom'
import { request } from 'http'

function normalizeURL(urlString) {
    const urlObj = new URL(urlString)
    const newUrl = url.parse(urlString)
    let newUrlFormat = url.format({
        hostname: newUrl.hostname,
        pathname: newUrl.pathname
    })
    if (newUrlFormat[newUrlFormat.length -1] === '/') {
        newUrlFormat = newUrlFormat.slice(0, -1)
    }
    return newUrlFormat

}


function getURLsFromHTML(htmlBody, baseURL) {
    const urls = []
    const dom = new JSDOM(htmlBody)
    const anchors = dom.window.document.querySelectorAll('a')

    for(const anchor of anchors) {
        if (anchor.hasAttribute('href')) {
            try {
                urls.push(new URL(anchor.href, baseURL).href)
            } catch (error) {
                console.log(`${error.message}: ${anchor.href}`)
            }
        }
    }
    
    return urls
}

async function crawlPage(baseURL, currentURL=baseURL, pages={}) {
    const url = currentURL
    if (new URL(baseURL).hostname === new URL(currentURL).hostname) {
        const normalizedCurrentURL = normalizeURL(currentURL)
        if (normalizedCurrentURL in pages) {
            pages[normalizedCurrentURL]++
            return pages
        }
        pages[normalizedCurrentURL] = 1
        
        let response
        try {
            response = await fetch(url)
        } catch (err) {
            console.log(`${err.message}`)
            return pages
        }
        
        if (response.status > 399) {
            console.log(`Status code error ${response.status}`)
          
        }
        const contentType = response.headers.get('content-type')
        if (!contentType || !contentType.includes('text/html')) {
            console.log(`Invalid content-type ${response.headers.get('content-type')}`)
            
        }

        const body = await response.text()
        const addedUrls = getURLsFromHTML(body, baseURL)
        for (const link of addedUrls) {
            pages = await crawlPage(baseURL, link, pages)
        }
        return pages

    } else {
        return pages
    }
}















export { normalizeURL, getURLsFromHTML, crawlPage };