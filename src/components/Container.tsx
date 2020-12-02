import { faFlag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { ChangeEvent, FunctionComponent, useEffect, useState } from "react";
import { getFlags } from "api";
import { ImageItem } from "models/ImageItem";


import styles from "./container.scss";

type Props = {
}

const Container: FunctionComponent<Props> = ({
}) => {
    const [items, setItems] = useState<ImageItem[]>([]);
    
    useEffect(() => {
        getFlags()
            .then(result => {
                setItems(result.slice(0, 5));
            })
    }, []);
    console.log(items);
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
    </div>
}

export default Container;