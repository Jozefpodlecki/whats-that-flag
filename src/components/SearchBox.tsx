import React, { ChangeEvent, FunctionComponent, useEffect, useRef, useState } from "react";

import styles from "./searchBox.scss";

type Props = {
    value: string;
    suggestions: any[];
    onSearch(value: string): void;
}

const SearchBox: FunctionComponent<Props> = ({
    value,
    suggestions,
    onSearch
}) => {

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.currentTarget.value;
        onSearch(value);
    }

    const onSuggestionClick = () => {

    }

    return <div>
        <input
            autoFocus
            className={styles.input}
            type="text"
            value={value}
            onChange={onChange}/>
        <ul>
            {suggestions.map(pr => <li
                className={styles.suggestion}
                onClick={onSuggestionClick}>{pr.value}</li>)}
        </ul>
    </div>
}

export default SearchBox;