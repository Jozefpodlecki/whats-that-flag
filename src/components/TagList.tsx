import { faTags, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { tagTypeToIcon } from "appUtils";
import { Tag } from "models/Tag";
import React, { ChangeEvent, FunctionComponent, useCallback, useEffect, useState } from "react";

import styles from "./tagList.scss";

type Props = {
    tags: Tag[],
    onDelete(id: number): void;
}

const TagList: FunctionComponent<Props> = ({
    tags,
    onDelete,
}) => {
   
    const _onDelete = useCallback((event: React.MouseEvent<HTMLElement>) => {
        const id = Number(event.currentTarget.dataset.id);
        onDelete(id);
    }, []);

    return <div className={styles.list}>
        {tags.length ? <div className={styles.icon}>
            <FontAwesomeIcon icon={faTags} size="1x"/>
        </div> : null}
        {tags.map(pr => 
        <div key={pr.id} className={styles.item}>
            <div className={styles.itemContent}>
                <div className={styles.tagIcon}>
                    <FontAwesomeIcon icon={tagTypeToIcon(pr.type)}/>
                </div>
                <div className={styles.label}>{pr.name}</div>
            </div>
            
            <div
                data-id={pr.id}
                className={styles.deleteIcon}
                onClick={_onDelete}>
                <FontAwesomeIcon icon={faTimes} size="1x"/>
            </div>
        </div>
    )}
    </div>
}

export default TagList