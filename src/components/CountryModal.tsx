import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Country } from "models/Country";
import React, { FunctionComponent, useEffect, useState } from "react";
import styles from "./countryModal.scss";

type Props = {
    country: Country;
    isShowing: boolean;
    onClose(): void;
}

const CountryModal: FunctionComponent<Props> = ({
    country,
    isShowing,
    onClose
}) => {
    const [style, setStyles] = useState({

    });

    const onScroll  = () => {
        const { scrollTop } = document.documentElement;

        setStyles(state => ({
            top: scrollTop,
        }))
    }

    useEffect(() => {
        if(isShowing) {
            onScroll();

            window.addEventListener("scroll", onScroll)

            return () => {
                window.removeEventListener("scroll", onScroll)
            }
        }
    }, [isShowing])

    return <div style={style} className={styles.modal}>
        <div className={styles.header}>
            <div className={styles.closeIcon} onClick={onClose}>
                    <FontAwesomeIcon icon={faTimes} size="1x"/>
                </div>
        </div>
        <div className={styles.body}>
        </div>
    </div>
}

export default CountryModal;