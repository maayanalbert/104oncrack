from selenium import webdriver
# import requests
from bs4 import BeautifulSoup
import time
from os import getcwd

link = "https://emojipedia.org/apple/"

driver = webdriver.PhantomJS(getcwd() + "/phantomjs")
driver.get(link)

lastHeight = driver.execute_script("return document.body.scrollHeight")

pause = 0.5
while True:
    driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
    time.sleep(pause)
    newHeight = driver.execute_script("return document.body.scrollHeight")
    if newHeight == lastHeight:
        break
    lastHeight = newHeight


html = driver.page_source
soup = BeautifulSoup(html, "html5lib")

for item in soup.find_all('img'):
    print(item['src'])