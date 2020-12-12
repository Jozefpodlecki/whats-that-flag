import SearchBox from "components/SearchBox";
import React, { ChangeEvent, FunctionComponent, useCallback, useEffect, useState } from "react";
import { Route, Switch } from "react-router";
import { faFlag, faTags, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from "components/Header";
import { getFlags, getSuggestions } from "api";
import { ImageItem } from "models/ImageItem";
import Container from "components/Container";

import styles from "./app.scss";
import TagList from "components/TagList";
import { Country } from "models/Country";
import { Tag } from "models/Tag";

type State = {
    value: string;
    items: Country[];
    tags: Tag[];
    page: number;
    fetchNextPage: boolean;
    isLoading: boolean;
    hasMoreItems: boolean;
}

const App: FunctionComponent = () => {
    const [{
        value,
        items,
        tags,
        page,
        fetchNextPage,
        isLoading,
        hasMoreItems,
    }, setState] = useState<State>({
        value: "",
        items: [],
        tags: [],
        page: 0,
        fetchNextPage: false,
        isLoading: true,
        hasMoreItems: true,
    });
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        getFlags({
            tags,
            page: 0,
            pageSize: 6,
        })
        .then(items => {
            setState(state => ({
                ...state,
                items,
                hasMoreItems: !!items.length,
            }));
        })
    }, [tags])

    useEffect(() => {

        if(!hasMoreItems) {
            setState(state => ({
                ...state,
                isLoading: false,
            }));
        }

        if(hasMoreItems && fetchNextPage) {
            getFlags({
                tags,
                page: page + 1,
                pageSize: 6,
            })
            .then(items => {
                setState(state => ({
                    ...state,
                    page: state.page + 1,
                    items: [...state.items, ...items],
                    fetchNextPage: false,
                    isLoading: false,
                    hasMoreItems: !!items.length,
                }));
            })
        }
    }, [fetchNextPage, hasMoreItems]);

    const onSearch = (value: string) => {
        setState(state => ({...state, value}));

        getSuggestions({
            value,
            page: 0,
            pageSize: 5,
            excludeTags: tags,
        }).then(suggestions => {
            setSuggestions(suggestions);
        })
    }

    const onDelete = (id: number) => {
        setState(state => ({
            ...state,
            value: "",
            tags: state.tags.filter(pr => pr.id !== id)
        }));
    }

    const onFilter = () => {
    }

    const onPageEnd = useCallback(() => 
        setState(state => ({...state, 
            isLoading: true,
            fetchNextPage: true
        })), 
    [tags, page])

    const onSuggestionClick = (id: number) => {
        const tag = suggestions.find(pr => pr.id === id);

        setState(state => ({
            ...state,
            value: "",
            tags: [...state.tags, tag]
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
            onPageEnd={onPageEnd}
            isLoading={isLoading}
            items={items}
        />
    </div>
};

export default App;
