
// ---- import

import React from "react";
import ReactDOM from "react-dom/client";

import './TasksFilter.css'


// ---- go-go

export default class extends React.Component{
    render() {return(
        <li>
            <button className={this.props.selected}>{this.props.btnName}</button>
        </li>
    )}
}
