import { Country } from "models/Country";
import { ImageItem } from "models/ImageItem";
import { Module } from "models/Module";
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

const imagesContext = require.context(
    "./assets/images/flags",
    false,
    /\.(png|jpe?g|svg)$/,
    "sync"
);

interface SuggestionsCriteria {
    page: number;
    tags?: string[];
    excludeTags: string[];
    value?: string;
}

const flags = importAll(imagesContext);

export const getSuggestions = ({
    value,
    page,
    excludeTags,
}: SuggestionsCriteria) => new Promise<string[]>((resolve, reject) => {
    
    const pageSize = 5;
    const from = page * pageSize;
    const to = from + pageSize;

    const result = Object.keys(_tags)
        .filter(pr => !excludeTags.includes(pr) && pr.includes(value))
        .slice(from, to)

    resolve(result);
}) 

interface FlagsCriteria {
    page: number;
    tags?: string[];
    value?: string;
}

export const getFlags = ({ 
    page,
    tags
 }: FlagsCriteria) => new Promise<Country[]>((resolve, reject) => {
    const entries = countries as Country[];

    const pageSize = 5;
    const from = page * pageSize;
    const to = from + pageSize;

    const re = tags
        .map((pr: keyof typeof _tags) => _tags[pr])
    
        console.log(re);

    const result = entries
        .slice(from, to)
        .map(pr => ({
            ...pr,
            imageUrl: flags[pr.countryName],
        }))

    resolve(result)
});