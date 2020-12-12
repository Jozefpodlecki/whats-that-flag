import { 
    faFilter} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { tagTypeToIcon } from "appUtils";
import { useOnClickOutside } from "hooks/useOnClickOutside";
import { Tag } from "models/Tag";
import React, { ChangeEvent, FunctionComponent, useRef, useState } from "react";

import styles from "./searchBox.scss";

type Props = {
    value: string;
    suggestions: Tag[];
    onSearch(value: string): void;
    onSuggestionClick(id: number): void;
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
    const searchBoxRef = useRef<HTMLDivElement>();
    useOnClickOutside(searchBoxRef, () => {
        if(isActive) {
            setActive(false);
        }
    });

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
        onSuggestionClick(Number(event.currentTarget.dataset.id))
        setActive(false);
    }

    return <div ref={searchBoxRef} className={styles.searchBox}>
        <div className={styles.searchBoxText}>
            <input
                autoFocus
                placeholder={isFocused ? "" : "Tell me something about this flag..."}
                className={styles.input}
                type="text"
                value={value}
                onFocus={onFocus}
                onBlur={onBlur}
                onChange={onChange}/>
            <ul className={`${styles.suggestionList} ${isActive ? styles.active : ""}`}>
                {suggestions.map(suggestion => <li
                    key={suggestion.id}
                    data-id={suggestion.id}
                    className={styles.suggestion}
                    onClick={_onSuggestionClick}>
                        <div className={styles.suggestionIcon}>
                            <FontAwesomeIcon icon={tagTypeToIcon(suggestion.type)}/>
                        </div>
                        <div>{suggestion.name}</div>
                    </li>)}
            </ul>
        </div>
        {/* <div>
            <div className={styles.filter} onClick={onFilter}>
                <FontAwesomeIcon icon={faFilter}/>
            </div>
        </div> */}
    </div>
}

export default SearchBox;