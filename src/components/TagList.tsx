import { faTags, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { ChangeEvent, FunctionComponent, useCallback, useEffect, useState } from "react";

import styles from "./tagList.scss";

type Props = {
    tags: any[],
    onDelete(id: string): void;
}

const TagList: FunctionComponent<Props> = ({
    tags,
    onDelete,
}) => {
   
    const _onDelete = useCallback((event: React.MouseEvent<HTMLElement>) => {
        const id = event.currentTarget.dataset.id;
        onDelete(id);
    }, []);

    return <div className={styles.list}>
        {tags.length ? <div className={styles.icon}>
            <FontAwesomeIcon icon={faTags} size="1x"/>
        </div> : null}
        {tags.map(pr => 
        <div key={pr} className={styles.item}>
            <div className={styles.label}>{pr}</div>
            <div
                data-id={pr}
                className={styles.deleteIcon}
                onClick={_onDelete}>
                <FontAwesomeIcon icon={faTimes} size="1x"/>
            </div>
        </div>
    )}
    </div>
}

export default TagList