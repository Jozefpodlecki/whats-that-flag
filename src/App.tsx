import SearchBox from "components/SearchBox";
import React, { ChangeEvent, FunctionComponent, useState } from "react";
import { Route, Switch } from "react-router";



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
        <div>
        </div>
    </div>
};

export default App;
