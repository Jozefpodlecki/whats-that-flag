import { faFlag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { ChangeEvent, FunctionComponent, useEffect, useState } from "react";
import { getFlags } from "api";
import { ImageItem } from "models/ImageItem";


import styles from "./container.scss";
import Loader from "react-loader-spinner";
import { Country } from "models/Country";

type Props = {
}

const Container: FunctionComponent<Props> = ({
}) => {
    const [{
        items,
        tags,
        page,
        prevY,
        isLoading
    }, setState] = useState<{
        items: Country[];
        tags: string[];
        page: number;
        prevY: number;
        isLoading: boolean;
    }>({
        items: [],
        tags: [],
        page: 0,
        prevY: 0,
        isLoading: true,
    });
    
    useEffect(() => {
        getFlags({tags, page})
            .then(result => {
                setState(state => ({
                    ...state,
                    items: result.slice(0, 5),
                    isLoading: false,
                }));
            })
    }, []);
    
    const options = {
        root: null as any,
        rootMargin: "0px",
        threshold: 1.0
      };


    const handleObserver = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
        const y = entries[0].boundingClientRect.y;

        if (prevY > y) {
            const newPage = page + 1;
            getFlags({tags, page: newPage})
            setState(state => ({ ...state, page: newPage }));
        }

        setState(state => ({ ...state, prevY: y }));
    }

    const observer = new IntersectionObserver(
        handleObserver,
        options
    );

    return <div className={styles.container}>
        {items.map(pr => <div key={pr["iso3166-1-alpha-2"]} className={styles.item}>
            <div
                className={styles.itemChild}
                style={{
                    backgroundImage: `url(${pr.imageUrl})`,
                }}>
                    <span>Test</span>
                </div>
        </div>)}
        {isLoading ? <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} /> : null}
    </div>
}

export default Container;