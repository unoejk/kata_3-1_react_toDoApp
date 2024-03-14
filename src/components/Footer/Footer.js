
// ---- import

import React from "react";
import ReactDOM from "react-dom/client";

import './Footer.css'

import TasksFilter from '../TasksFilter/TasksFilter'


// ---- go-go

export default class extends React.Component{
    render() {return(
        <footer className="footer">
            <span className="todo-count">{this.props.countActiveTasks} items left</span>
            <ul className="filters">
                <TasksFilter btnName={'All'} selected={'selected'}/>
                <TasksFilter btnName={'Active'} selected={''}/>
                <TasksFilter btnName={'Completed'} selected={''}/>
            </ul>
            <button className="clear-completed">Clear completed</button>
        </footer>
    )}
}
