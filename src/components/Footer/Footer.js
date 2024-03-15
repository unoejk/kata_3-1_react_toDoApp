
import React from "react";
import ReactDOM from "react-dom/client";

import './Footer.css'

import TasksFilter from '../TasksFilter/TasksFilter'

export default (props)=>{
    const tasksFilterElemList=props.filters.map(val=>{
        return(
            <TasksFilter
                key={val}
                btnName={val}
                isSelected={props.activeFilter===val}
                changeFilter={()=>props.changeFilter(val)}
            />
        )
    })

    return(
        <footer className="footer">
            <span className="todo-count">{props.countActiveTasks} items left</span>
            <ul className="filters">
                {tasksFilterElemList}
            </ul>
            <button
                className="clear-completed"
                onClick={props.clearCompletedTasks}
            >Clear completed</button>
        </footer>
    )
}
