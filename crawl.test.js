
import { test, expect } from "@jest/globals";
import { normalizeURL } from "./crawl.js";
import { getURLsFromHTML } from "./crawl.js";
import { sortByUrlOccurence } from "./report.js"








test('sort elements in object by their numeric value', () => {
    const nums = {
        two: 2,
        five: 5,
        one: 1, 
        ten: 10,
        eleven: 11
    }
    expect(sortByUrlOccurence(nums)).toEqual([['eleven', 11], ['ten', 10], ['five', 5], ['two', 2], ['one', 1]])
})






test('normalize ulr', () => {
    expect(normalizeURL('https://blog.boot.dev/path/')).toBe('blog.boot.dev/path')
    expect(normalizeURL('https://blog.boot.dev/path')).toBe('blog.boot.dev/path')
    expect(normalizeURL('http://blog.boot.dev/path/')).toBe('blog.boot.dev/path')
    expect(normalizeURL('http://blog.boot.dev/path')).toBe('blog.boot.dev/path')
})

test('convert relative url to absolute', () => {
    expect(getURLsFromHTML('<html><a href="/_nuxt/entry.CZUOdj55.css">Hoo</a></html>','https://blog.boot.dev/')).toEqual(['https://blog.boot.dev/_nuxt/entry.CZUOdj55.css'])
    expect(getURLsFromHTML('<html><a href="/images">Images</a></html>','https://blog.boot.dev/')).toEqual(['https://blog.boot.dev/images'])
    expect(getURLsFromHTML('<html><a href="/login">Login</a></html>','https://blog.boot.dev/')).toEqual(['https://blog.boot.dev/login'])
    expect(getURLsFromHTML('<html><a href="/courses/css">Courses</a></html>','https://blog.boot.dev/')).toEqual(['https://blog.boot.dev/courses/css'])
})

test('find all anchor elements', () => {
    expect(getURLsFromHTML('<html><a href="/_nuxt/entry.CZUOdj55.css">Hoo</a>'
                            + '<a href="/images">Images</a>'
                            + '<a href="/login">Login</a>' 
                            + '<a href="https://www.boot.dev/lessons/3d09e9d0-cc7d-4703-bcb1-f0c169e88f2d">Courses</a></html>'
                            + '<a>Lol</a>','https://blog.boot.dev/'))
                            .toEqual([
                            'https://blog.boot.dev/_nuxt/entry.CZUOdj55.css',
                            'https://blog.boot.dev/images',
                            'https://blog.boot.dev/login',
                            'https://www.boot.dev/lessons/3d09e9d0-cc7d-4703-bcb1-f0c169e88f2d'
                            ])
})
test('getURLsFromHTML both', () => {
    const inputURL = 'https://blog.boot.dev'
    const inputBody = '<html><body><a href="/path/one"><span>Boot.dev></span></a><a href="https://other.com/path/one"><span>Boot.dev></span></a></body></html>'
    const actual = getURLsFromHTML(inputBody, inputURL)
    const expected = [ 'https://blog.boot.dev/path/one', 'https://other.com/path/one' ]
    expect(actual).toEqual(expected)
})


  












