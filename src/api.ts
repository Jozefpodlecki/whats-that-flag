import { Country } from "models/Country";
import { ImageItem } from "models/ImageItem";
import { Module } from "models/Module";
import { resolve } from "path";
import countries from "./assets/countries.json";
import tags from "./assets/tags.json";

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

interface Criteria {
    page: number;
    tags?: string[];
    value: string;
}

const flags = importAll(imagesContext);

export const getSuggestions = ({
    value,
    page
}: Criteria) => new Promise<Country[]>((resolve, reject) => {
    
    Object.entries(tags)
        .filter(pr => pr[0].includes(value))
}) 

export const getFlags = ({ 
    page
 }: Criteria) => new Promise<Country[]>((resolve, reject) => {
    const entries = countries as Country[];

    const pageSize = 5;
    const from = page * pageSize;
    const to = from + pageSize;
    
    const result = entries
        .slice(from, to)
        .map(pr => ({
            ...pr,
            imageUrl: flags[pr.imageUrl],
        }))
        console.log(result);
    resolve(result)
});