import SearchBox from "components/SearchBox";
import React, { ChangeEvent, FunctionComponent, useEffect, useState } from "react";
import { Route, Switch } from "react-router";
import { faFlag } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from "components/Header";
import { getFlags } from "api";
import { ImageItem } from "models/ImageItem";
import Container from "components/Container";


const App: FunctionComponent = () => {
    const [value, setValue] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [suggestions1, setSuggestions1] = useState([]);
    

    const onSearch = (value: string) => {
        setValue(value)
    }

    const onDelete = () => {
        
    }

  

    return <div>
        <Header/>
        <SearchBox
            value={value}
            onSearch={onSearch}
            suggestions={suggestions}/>
        <div>
            {suggestions1.map(pr => 
            <div>
                <div>{pr.value}</div>
                <div onClick={onDelete}></div>
            </div>
        )}
        </div>
        <Container/>
    </div>
};

export default App;
