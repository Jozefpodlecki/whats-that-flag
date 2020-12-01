import { ImageItem } from "models/ImageItem";
import { Module } from "models/Module";

const importAll = (context: __WebpackModuleApi.RequireContext) => {
    return Promise.all<ImageItem>(
        context.keys().map((key) =>
            context<Promise<Module>>(key).then((module) => ({
                id: key,
                url: module.default,
            }))
        )
    );
};

const imagesContext = require.context(
    "./assets/images/flags",
    false,
    /\.(png|jpe?g|svg)$/,
    "lazy"
);

export const getFlags = () => importAll(imagesContext);