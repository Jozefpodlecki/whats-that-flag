import json
import os

directory_name = os.path.dirname(__file__)
out_file_name = os.path.join(directory_name, "combined.json")
countries_file_path = os.path.join(directory_name, "countries.json")
countries_tags_file_path = os.path.join(directory_name, "countriesTags.json")

with open(countries_file_path) as countries_file, open(countries_tags_file_path) as countriesTags_file, open(out_file_name, "w") as out_file:
    countries_tags = json.load(countriesTags_file)
    countries = json.load(countries_file)

    countries_tags_dict = {countries_tags[i]["iso3166-1-alpha-2"]: countries_tags[i]["tags"] for i in range(0, len(countries_tags), 1)}

    result = []

    for country in countries:
        country_sh = country["iso3166-1-alpha-2"]
        country_tags = countries_tags_dict.get(country_sh, [])

        result.append({
            "countryName": country["countryName"],
            "flagImageUrl": country["flagImageUrl"],
            "flagSvgUrl": country["flagSvgUrl"],
            "iso3166-1-alpha-2": country["iso3166-1-alpha-2"],
            "tags": country_tags
        })

    json.dump(result, out_file, indent=4, sort_keys=True)