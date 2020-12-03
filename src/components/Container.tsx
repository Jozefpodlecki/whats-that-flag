import { faFlag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { ChangeEvent, FunctionComponent, useEffect, useState } from "react";
import { getFlags } from "api";
import { ImageItem } from "models/ImageItem";


import styles from "./container.scss";
import Loader from "react-loader-spinner";

type Props = {
}

const Container: FunctionComponent<Props> = ({
}) => {
    const [{
        items,
        page,
        prevY,
        isLoading
    }, setState] = useState<{
        items: ImageItem[];
        page: string;
        prevY: number;
        isLoading: boolean;
    }>({
        items: [],
        page: "",
        prevY: 0,
        isLoading: true,
    });
    
    useEffect(() => {
        getFlags({page})
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


    const handleObserver = (entities, observer) => {
        const y = entities[0].boundingClientRect.y;

        if (prevY > y) {
            const lastItem = items[items.length - 1];
            const curPage = lastItem.id;
            getFlags({page})
            setState({ page: curPage });
        }

        setState({ prevY: y });
    }

    const observer = new IntersectionObserver(
        handleObserver,
        options
    );

    return <div className={styles.container}>
        {items.map(pr => <div key={pr.id} className={styles.item}>
            <div
                className={styles.itemChild}
                style={{
                    backgroundImage: `url(${pr.url})`,
                }}>
                    <span>Test</span>
                </div>
        </div>)}
        {isLoading ? <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} /> : null}
    </div>
}

export default Container;