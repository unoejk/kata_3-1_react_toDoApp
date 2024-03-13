
// ---- import

import React from "react";
import ReactDOM from "react-dom/client";

import './NewTaskForm.css'


// ---- go-go

export default class extends React.Component{
    render() {return(
        <header className="header">
            <h1>todos</h1>
            <input className="new-todo" placeholder="What needs to be done?" autoFocus/>
        </header>
    )}
}
