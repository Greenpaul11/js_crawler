function printRaport(pages) {
    console.log('Report is starting.')
    const sortedPages = sortByUrlOccurence(pages)
    sortedPages.forEach((link) => {
        const url = link[0]
        const count = link[1]
        console.log(`Found ${count} internal links to ${url}`)
    })
}


function sortByUrlOccurence(urlsObj) {
    let urlsArray = Object.entries(urlsObj)
    urlsArray.sort((a, b) => b[1] - a[1])
    return urlsArray
}



export { printRaport, sortByUrlOccurence }