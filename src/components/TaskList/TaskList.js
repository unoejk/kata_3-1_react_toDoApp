
// ---- import

import React from "react";
import ReactDOM from "react-dom/client";

import './TaskList.css'

import Task from '../Task/Task'


// ---- go-go

export default class extends React.Component{
    taskElemList=this.props.taskDataList.map((val)=>{
        const {id,...valWithoutId}=val
        return(
            <Task key={id} {...valWithoutId}/>
        )
    })

    render() {return(
        <ul className="todo-list">
            {this.taskElemList}
        </ul>
    )}
}
