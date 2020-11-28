import React, { ChangeEvent, FunctionComponent, useState } from "react";
import { Route, Switch } from "react-router";

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
        <input type="text" value={value} onChange={onChange}/>
        <ul>
            {suggestions.map(pr => <li onClick={onSuggestionClick}>{pr.value}</li>)}
        </ul>
    </div>
}

export default SearchBox;