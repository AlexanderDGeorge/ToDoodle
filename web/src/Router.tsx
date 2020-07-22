import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Nav from "./Nav/Nav";

export default function Router() {
    return (
        <BrowserRouter>
            <Route path="/" component={Nav} />
            <Route exact path="/" component={Home} />
        </BrowserRouter>
    );
}
