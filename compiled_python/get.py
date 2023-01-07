import requests


def get(url):
    r = requests.get(url, timeout=5, verify=False)
    return r.content


print(get("https://httpbin.org/get"))
