import { faFlag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { ChangeEvent, FunctionComponent, useEffect, useRef, useState } from "react";
import { getFlags } from "api";
import { ImageItem } from "models/ImageItem";


import styles from "./container.scss";
import Loader from "react-loader-spinner";
import { Country } from "models/Country";
import Item from "./Item";


type Props = {
    items: Country[];
    isLoading: boolean;
    onPageEnd(): void;
}

const Container: FunctionComponent<Props> = ({
    items,
    isLoading,
    onPageEnd,
}) => {
    const loaderRef = useRef<HTMLDivElement>();
    
    const options = {
        root: null as any,
        rootMargin: "0px",
        threshold: 1.0
      };

    const onClick = () => {

    }

    useEffect(() => {
        const handleObserver = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
            const [entry] = entries;
    
            if(entry.isIntersecting) {
                onPageEnd();
            }
        }
    
        const observer = new IntersectionObserver(
            handleObserver,
            options
        );

        observer.observe(loaderRef.current)

        return () => {
            observer.disconnect();
        }

    }, [loaderRef])

    return <div className={styles.container}>
        <div className={styles.list}>
            {items.map(item => <Item onClick={onClick} key={item.countryName} {...item}/>)}
        </div>
        <div ref={loaderRef} className={styles.loader}>
            {isLoading ? <Loader type="ThreeDots" color="white" height={80} width={80} /> : null}
        </div>
    </div>
}

export default Container;