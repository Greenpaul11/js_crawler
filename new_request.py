import requests
import urllib

API_KEY = 'd1bb73c5-203d-405e-90de-d88291c55202'

def get_scrapeops_url(url):
    payload = {'api_key': API_KEY, 'url': url}
    proxy_url = 'https://proxy.scrapeops.io/v1/?' + urllib.parse.urlencode(payload)
    print(proxy_url)
    return proxy_url

r = requests.get(get_scrapeops_url('https://www.mediaexpert.pl'))
