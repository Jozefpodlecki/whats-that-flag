import { faFlag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { ChangeEvent, FunctionComponent, useEffect, useState } from "react";
import { getFlags } from "api";
import { ImageItem } from "models/ImageItem";


import styles from "./container.scss";
import Loader from "react-loader-spinner";
import { Country } from "models/Country";
import Item from "./Item";


type Props = {
    items: any[]
}

const Container: FunctionComponent<Props> = ({
    items,
}) => {
    const [{
        tags,
        page,
        prevY,
        isLoading
    }, setState] = useState<{
        tags: string[];
        page: number;
        prevY: number;
        isLoading: boolean;
    }>({
        tags: [],
        page: 0,
        prevY: 0,
        isLoading: true,
    });
    
    useEffect(() => {
        
    }, []);
    
    const options = {
        root: null as any,
        rootMargin: "0px",
        threshold: 1.0
      };


    // const handleObserver = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
    //     const y = entries[0].boundingClientRect.y;

    //     if (prevY > y) {
    //         const newPage = page + 1;
    //         getFlags({
    //             tags, 
    //             page: 0
    //         })
    //         setState(state => ({ ...state, page: newPage }));
    //     }

    //     setState(state => ({ ...state, prevY: y }));
    // }

    // const observer = new IntersectionObserver(
    //     handleObserver,
    //     options
    // );

    return <div className={styles.container}>
        {items.map(item => <Item key={item.countryName} {...item}/>)}
        {/* {isLoading ? <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} /> : null} */}
    </div>
}

export default Container;