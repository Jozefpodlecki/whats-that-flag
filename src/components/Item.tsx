import React, { FunctionComponent } from "react";
import styles from "./container.scss";

type Props = {
    imageUrl: string;
    countryName: string;
    "iso3166-1-alpha-2": string;
}

const Item: FunctionComponent<Props> = ({
    imageUrl,
    countryName,
    "iso3166-1-alpha-2": is3166alpha2,
}) => {
    return <div key={is3166alpha2} className={styles.item}>
    <div
        className={styles.itemChild}
        style={{
            backgroundImage: `url(${imageUrl})`,
        }}>
            <span>{countryName}</span>
        </div>
</div>
};

export default Item;