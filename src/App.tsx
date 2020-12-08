import SearchBox from "components/SearchBox";
import React, { ChangeEvent, FunctionComponent, useEffect, useState } from "react";
import { Route, Switch } from "react-router";
import { faFlag, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from "components/Header";
import { getFlags } from "api";
import { ImageItem } from "models/ImageItem";
import Container from "components/Container";

import styles from "./app.scss";

const App: FunctionComponent = () => {
    const [value, setValue] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [suggestions1, setSuggestions1] = useState([]);
    

    const onSearch = (value: string) => {
        setValue(value)
        setSuggestions([
            {
                id: 1,
                value: "coat of arms",
            },
            {
                id: 2,
                value: "yellow",
            },
            {
                id: 3,
                value: "the Royal Crown",
            }
        ]);
    }

    const onDelete = () => {
        
    }

    const onSuggestionClick = (value: any) => {
        setSuggestions1([
            {
                id: 1,
                value: "coat of arms",
            },
            {
                id: 2,
                value: "yellow",
            },
            {
                id: 3,
                value: "the Royal Crown",
            }
        ]);
    }

    return <div>
        <Header/>
        <SearchBox
            value={value}
            onSearch={onSearch}
            onSuggestionClick={onSuggestionClick}
            suggestions={suggestions}/>
        <div>
            {suggestions1.map(pr => 
            <div className={styles.tag}>
                <div className={styles.tagLabel}>{pr.value}</div>
                <div className={styles.deleteIcon} onClick={onDelete}>
                    <FontAwesomeIcon icon={faTimes} size="2x"/>
                </div>
            </div>
        )}
        </div>
        <Container/>
    </div>
};

export default App;
