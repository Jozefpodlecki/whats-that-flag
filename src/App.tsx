import React, { ChangeEvent, FunctionComponent, useState } from "react";
import { Route, Switch } from "react-router";

type Props = {
    value: string;
    onSearch(value: string): void;
}

const SearchBox: FunctionComponent<Props> = ({
    value,
    onSearch
}) => {

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.currentTarget.value;
        onSearch(value);
    }

    return <div>
        <input type="text" value={value} onChange={onChange}/>
    </div>
}

const App: FunctionComponent = () => {
    const [value, setValue] = useState("");

    const onSearch = (value: string) => {
        setValue(value)
    }

    return <div>
        <SearchBox value={value} onSearch={onSearch}/>
        <div>
        </div>
    </div>
};

export default App;
