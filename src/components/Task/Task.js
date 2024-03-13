
// ---- import

import React from "react";
import ReactDOM from "react-dom/client";

import { formatDistanceToNowStrict } from 'date-fns'

import './Task.css'


// ---- go-go

export default class extends React.Component{
    taskClass=()=>{
        let res=''
        if (this.props.isCompleted)
            res+='completed '
        if (this.props.isEditing)
            res+='editing '
        return res
    }

    timeString='created '+formatDistanceToNowStrict(this.props.passTime,{addSuffix:true})

    render() {return(
        <li className={this.taskClass()}>
            <div className="view">
                <input className="toggle" type="checkbox"/>
                <label>
                    <span className="description">{this.props.quest}</span>
                    <span className="created">{this.timeString}</span>
                </label>
                <button className="icon icon-edit"></button>
                <button className="icon icon-destroy"></button>
            </div>
            <input type="text" className="edit" defaultValue="Editing task"/>
        </li>
    )}
}
