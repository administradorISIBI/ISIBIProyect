import asyncio
from fastapi import HTTPException
from pyppeteer import launch
from bs4 import BeautifulSoup
import traceback

async def scrape(url):
    browser = await launch(headless=True)
    page = await browser.newPage()
    await page.goto(url)
    await page.waitForSelector('div.list-items-list', timeout=30000)

    content = await page.content()
    await browser.close()
    return content

async def crawl_resources_primo(request):
    try:
        university_name = request.university_name
        url = request.url
        
        # Ejecutar la función de scraping de manera asíncrona
        html = await scrape(url)
        soup = BeautifulSoup(html, 'html.parser')
        #print(soup.prettify())
        # Procesar el soup según sea necesario

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An unexpected error occurred: {str(e)}")
