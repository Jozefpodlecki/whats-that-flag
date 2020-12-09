from urllib.request import urlopen
from bs4 import BeautifulSoup
import json
import os

page = urlopen("https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2")

html = page.read().decode("utf-8")
soup = BeautifulSoup(html, "html.parser")

tables = soup.find_all("table")
tbody = tables[2].find("tbody")

result = []
rows = tbody.findChildren("tr" , recursive=False)
for row in rows:
    columns = row.findChildren("td" , recursive=False)

    if not columns:
        continue

    name = columns[0].get_text().lower()
    country = columns[1].get_text()
    result.append({
        "iso3166-1-alpha-2": name,
        "countryName": country,
        "tags": [],
        "flagImageUrl": "./{}.png".format(name),
        "flagSvgUrl": "./{}.svg".format(name)
    })

dirname = os.path.dirname(__file__)
filename = os.path.join(dirname, "countries.json")

with open(filename, "w") as outfile:
    json.dump(result, outfile)