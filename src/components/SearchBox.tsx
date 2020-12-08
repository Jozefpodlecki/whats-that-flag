import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { ChangeEvent, FunctionComponent, useEffect, useRef, useState } from "react";

import styles from "./searchBox.scss";

type Props = {
    value: string;
    suggestions: any[];
    onSearch(value: string): void;
    onSuggestionClick(value: any): void;
}

const SearchBox: FunctionComponent<Props> = ({
    value,
    suggestions,
    onSearch,
    onSuggestionClick,
}) => {

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.currentTarget.value;
        onSearch(value);
    }

    return <div className={styles.searchBox}>
        <div className={styles.searchBoxText}>
            <input
                autoFocus
                className={styles.input}
                type="text"
                value={value}
                onChange={onChange}/>
            <ul className={styles.suggestionList}>
                {suggestions.map(pr => <li
                    key={pr.id}
                    className={styles.suggestion}
                    onClick={() => onSuggestionClick(pr)}>{pr.value}</li>)}
            </ul>
        </div>
        <div>
            <FontAwesomeIcon icon={faFilter}/>
        </div>
    </div>
}

export default SearchBox;