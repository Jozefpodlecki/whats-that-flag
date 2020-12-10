import { faFill, faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { ChangeEvent, FunctionComponent, useEffect, useRef, useState } from "react";

import styles from "./searchBox.scss";

type Props = {
    value: string;
    suggestions: string[];
    onSearch(value: string): void;
    onSuggestionClick(value: any): void;
    onFilter(): void;
}

const SearchBox: FunctionComponent<Props> = ({
    value,
    suggestions,
    onSearch,
    onSuggestionClick,
    onFilter,
}) => {
    const [isFocused, setFocus] = useState(false);
    const [isActive, setActive] = useState(false);

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.currentTarget.value;
        onSearch(value);
    }

    const onFocus = () => {
        setFocus(true);
        setActive(true)
    }

    const onBlur = () => {
        setFocus(false);
    }

    const _onSuggestionClick = (event: React.MouseEvent<HTMLElement>) => {
        onSuggestionClick(event.currentTarget.dataset.id)
        setActive(false);
    }

    return <div className={styles.searchBox}>
        <div className={styles.searchBoxText}>
            <input
                autoFocus
                placeholder={isFocused ? "" : "What kind of flag is it?"}
                className={styles.input}
                type="text"
                value={value}
                onFocus={onFocus}
                onBlur={onBlur}
                onChange={onChange}/>
            <ul className={`${styles.suggestionList} ${isActive ? styles.active : ""}`}>
                {suggestions.map(suggestion => <li
                    key={suggestion}
                    data-id={suggestion}
                    className={styles.suggestion}
                    onClick={_onSuggestionClick}>
                        <div className={styles.suggestionIcon}>
                            <FontAwesomeIcon icon={faFill}/>
                        </div>
                        <div>{suggestion}</div>
                    </li>)}
            </ul>
        </div>
        <div>
            <div className={styles.filter} onClick={onFilter}>
                <FontAwesomeIcon icon={faFilter}/>
            </div>
        </div>
    </div>
}

export default SearchBox;