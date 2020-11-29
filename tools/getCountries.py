from urllib.request import urlopen
from bs4 import BeautifulSoup

page = urlopen("https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2")

html = page.read().decode("utf-8")
soup = BeautifulSoup(html, "html.parser")

tables = soup.find_all("table")
tbody = tables[2].find("tbody")

rows = tbody.findChildren("tr" , recursive=False)
for row in rows:
    columns = row.findChildren("td" , recursive=False)

    if len(columns) == 0:
        continue

    name = columns[0].get_text()
    country = columns[1].get_text()
    print(name, country)