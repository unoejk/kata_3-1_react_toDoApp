
import React from "react";
import ReactDOM from "react-dom/client";

import './TaskList.css'

import Task from '../Task/Task'


// export default class extends React.Component{
//     taskElemList=this.props.taskDataList.map((val)=>{
//         const {id,...valWithoutId}=val
//         return(
//             <Task
//                 key={id}
//                 {...valWithoutId}
//                 completeTask={()=>this.props.completeTask(id)}
//                 changeTask={()=>this.props.changeTask(id)}
//                 removeTask={()=>this.props.removeTask(id)}
//             />
//         )
//     })
//
//     render() {return(
//         <ul className="todo-list">
//             {this.taskElemList}
//         </ul>
//     )}
// }

export default (props)=>{
    const taskElemList=props.taskDataList.map(val=>{
        const {id,...valWithoutId}=val
        return(
            <Task
                key={id}
                {...valWithoutId}
                completeTask={(isCompleted)=>props.completeTask(id,isCompleted)}
                changeTask={(newQuest)=>props.changeTask(id,newQuest)}
                removeTask={()=>props.removeTask(id)}
            />
        )
    })

    return(
        <ul className="todo-list">
            {taskElemList}
        </ul>
    )
}
