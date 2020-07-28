import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Nav from "./Nav/Nav";
import List from "./Pages/List";

export default function Router() {
    return (
        <BrowserRouter>
            <Route path="/" component={Nav} />
            <Route path="/list" component={List} />
            <Route exact path="/" component={Home} />
        </BrowserRouter>
    );
}
