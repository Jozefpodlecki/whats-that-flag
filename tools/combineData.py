import json

with open('countries.json') as countries_file, open('countriesTags.json') as countriesTags_file, open("combined.json", "w") as outfile:
    countries_tags = json.load(countriesTags_file)
    countries = json.load(countries_file)

    countries_dict = {countries[i]["iso3166-1-alpha-2"]: countries[i + 1] for i in range(0, len(countries), 2)}

    result = []

    for country_tag in countries_tags:
        country_sh = country_tag["iso3166-1-alpha-2"]
        countries_dict[country_sh]

        result.append({
            "item": countries_dict[country_sh],
            "tags": country_tag["tags"]
        })

    json.dump(result, outfile)