import json
import os

directory_name = os.path.dirname(__file__)
file_name = os.path.join(directory_name, "countriesTags.json")

with open(file_name, "r") as countriesTags_file, open("tags.json", "w") as out_file:
    countries_tags = json.load(countriesTags_file)

    tags_dict = {}

    for country_tag in countries_tags:
        name = country_tag["iso3166-1-alpha-2"]

        for tag in country_tag["tags"]:
            tags_dict.setdefault(tag, [])
            tags_dict[tag].append(name)
        

    json.dump(tags_dict, out_file)