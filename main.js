import { link } from 'fs'
import * as process from 'process'
import { crawlPage } from './crawl.js'
import { printRaport } from './report.js'

async function main(arg) {
    if (process.argv.length > 3) {
        console.log('Too many arguments')
        return
    } else if (process.argv.length < 3) {
        console.log('Not enough arguments')
        return
    } 
    const baseURL = process.argv[2]
    console.log(`starting crawl of: ${baseURL}`)
    const pages = await crawlPage(baseURL)
    printRaport(pages)
}

main()