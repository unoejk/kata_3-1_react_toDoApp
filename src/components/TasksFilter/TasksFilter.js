
import React from "react";
import ReactDOM from "react-dom/client";

import './TasksFilter.css'


export default class extends React.Component{
    render() {return(
        <li>
            <button
                className={this.props.isSelected
                    ?'selected'
                    :''}
                onClick={this.props.changeFilter}
            >{this.props.btnName}</button>
        </li>
    )}
}
