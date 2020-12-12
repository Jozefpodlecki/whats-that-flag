import { Country } from "models/Country";
import { ImageItem } from "models/ImageItem";
import { Module } from "models/Module";
import { Tag } from "models/Tag";
import { resolve } from "path";
import countries from "./assets/countries.json";
import _tags from "./assets/tags.json";

const importAll = (context: __WebpackModuleApi.RequireContext) => {
    return context.keys()
        .reduce((acc, key) => {
            const module = context(key);

            acc[key] = module.default;

            return acc;
        }, {} as Record<string, string>);
};

const flagContext = require.context(
    "./assets/images/flags",
    false,
    /\.(png|jpe?g|svg)$/,
    "sync"
);

const svgContext = require.context(
    "./assets/svgs",
    false,
    /\.svg$/,
    "sync"
);

interface SuggestionsCriteria {
    page: number;
    pageSize: number;
    excludeTags: Tag[];
    value?: string;
}

const flags = importAll(flagContext);
const svgs = importAll(svgContext);

export const getSuggestions = ({
    value,
    page,
    pageSize,
    excludeTags,
}: SuggestionsCriteria) => new Promise<Tag[]>((resolve, reject) => {
    
    const from = page * pageSize;
    const to = from + pageSize;

    const result = _tags
        .filter(pr => pr.name.toLowerCase().includes(value.toLowerCase())
            && !excludeTags.some(npr => npr.id === pr.id) )
        .slice(from, to) as Tag[];

    resolve(result);
}) 

interface FlagsCriteria {
    page: number;
    pageSize: number;
    tags: Tag[];
    value?: string;
}

export const getFlags = ({ 
    page,
    pageSize,
    tags,
 }: FlagsCriteria) => new Promise<Country[]>((resolve, reject) => {
    const entries = countries as Country[];
    
    const from = page * pageSize;
    const to = from + pageSize;
    
    const tagsCombined = tags.flatMap((pr: Tag) => pr.countries)

    const tagMatchesPerCountry = tagsCombined.reduce<Record<string, number>>((acc, value) => {
        acc[value] = acc[value] || 0;
        acc[value]++;

        return acc;
    }, {});
    
    let result = entries;

    if(Object.keys(tagMatchesPerCountry).length) {
        result = result.filter(pr => tagMatchesPerCountry[pr["iso3166-1-alpha-2"]] === tags.length);
    }

    result = result.slice(from, to)
        .map(pr => ({
            ...pr,
            flagImageUrl: flags[pr.flagImageUrl],
            flagSvgUrl: svgs[pr.flagSvgUrl],
        }))

    resolve(result)
});