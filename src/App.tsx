import SearchBox from "components/SearchBox";
import React, { ChangeEvent, FunctionComponent, useEffect, useState } from "react";
import { Route, Switch } from "react-router";
import { faFlag, faTags, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from "components/Header";
import { getFlags, getSuggestions } from "api";
import { ImageItem } from "models/ImageItem";
import Container from "components/Container";

import styles from "./app.scss";
import TagList from "components/TagList";

const App: FunctionComponent = () => {
    const [{
        value,
        items,
        tags,
    }, setState] = useState({
        value: "",
        items: [],
        tags: []
    });
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        getFlags({
            tags,
            page: 0,
        })
        .then(result => {
            setState(state => ({
                ...state,
                items: result.slice(0, 5),
            }));
        })
    }, [tags])

    const onSearch = (value: string) => {
        setState(state => ({...state, value}));

        getSuggestions({
            value,
            page: 0,
            excludeTags: tags,
        }).then(suggestions => {
            setSuggestions(suggestions);
        })
    }

    const onDelete = (id: string) => {
        setState(state => ({
            ...state,
            value: "",
            tags: state.tags.filter(pr => pr !== id)
        }));
    }

    const onFilter = () => {

    }

    const onSuggestionClick = (value: string) => {
        setState(state => ({
            ...state,
            value: "",
            tags: [...state.tags, value]
        }));
    }

    return <div className={styles.container}>
        <Header/>
        <div className={styles.container1}>
            <div>
                <SearchBox
                    value={value}
                    onSearch={onSearch}
                    onSuggestionClick={onSuggestionClick}
                    onFilter={onFilter}
                    suggestions={suggestions}/>
                <TagList
                    tags={tags}
                    onDelete={onDelete}
                />
            </div>
        </div>
        <Container
            items={items}
        />
    </div>
};

export default App;
