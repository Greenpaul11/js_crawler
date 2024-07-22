

// get fake user agents for use in request header
async function getUserAgents(key) {
    const url = `https://headers.scrapeops.io/v1/user-agents?api_key=${key}&num_results=10`
    const response = await fetch(url)
    return response.json()
}

// get fake headers 
async function getHeaders(key) {
    const url = `https://headers.scrapeops.io/v1/browser-headers?api_key=${key}&num_results=10`
    const response = await fetch(url)
    return response.json()
}

// get url
function getScrapeopsUrl(url) {
    const payload = {'api_key': userAgentApiKey, 'url': url}
   
    
    const proxy_url = 'https://proxy.scrapeops.io/v1/?' + 'api_key=' + encodeURIComponent(payload['api_key']) + '&url=' + encodeURIComponent(payload['url'])
    console.log(proxy_url)
    return proxy_url
}

// return proxy ip address
async function getProxy() {
    try {
        const response = await fetch('https://proxylist.geonode.com/api/proxy-list?country=PL&limit=500&page=1&sort_by=lastChecked&sort_type=desc')
        const proxies = await response.json()
        return proxies
    } catch (err) {
        console.log(err.message)
    }
    if (response.status > 399) {
        console.log(`Proxy status code error ${response.status}`)
    }
    
}


// get random item from array
function getRandomElement(array) {
    const randomIndex = Math.floor(Math.random() * array.length);
    const randomElement = array[randomIndex]

    return randomElement;
}


export { getRandomElement, getProxy, getHeaders } 