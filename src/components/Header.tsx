import { faGit, faGithub } from "@fortawesome/free-brands-svg-icons";
import { faFlag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { ChangeEvent, FunctionComponent } from "react";

import styles from "./header.scss";

type Props = {
}

const Header: FunctionComponent<Props> = ({
}) => {


    return <header className={styles.header}>
        <div className={styles.logo}>
            <span>Whats that </span>
            <FontAwesomeIcon icon={faFlag} inverse/>
        </div>
        <div className={styles.github}>
            <a className={styles.githubLink} href={process.env.githubLink}>
                <FontAwesomeIcon icon={faGithub}/>
            </a>
        </div>
    </header>
}

export default Header;