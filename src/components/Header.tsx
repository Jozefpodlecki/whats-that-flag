import { faFlag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { ChangeEvent, FunctionComponent } from "react";

import styles from "./header.scss";

type Props = {
}

const Header: FunctionComponent<Props> = ({
}) => {


    return <header className={styles.header}>
        <span>Whats that </span>
        <FontAwesomeIcon icon={faFlag} inverse/>
    </header>
}

export default Header;