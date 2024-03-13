
// ---- import

import React from "react";
import ReactDOM from "react-dom/client";

import './App.css'

import TaskList from '../TaskList/TaskList'
import NewTaskForm from '../NewTaskForm/NewTaskForm'
import Footer from '../Footer/Footer'


// ---- go-go

const genExTime=(ms)=>{
    return new Date((new Date()).getTime()-ms)
}

export default class extends React.Component{
    lastId=3
    taskDataList=[
        {id:1, quest:'Completed task', passTime:genExTime(1000*17), isCompleted:true},
        {id:2, quest:'Editing task', passTime:genExTime(1000*60*5), isEditing:true},
        {id:3, quest:'Active task', passTime:genExTime(1000*60*5)}
    ]

    render() {return(
        <section className="todoapp">
            <NewTaskForm/>
            <section className="main">
                <TaskList taskDataList={this.taskDataList}/>
                <Footer/>
            </section>
        </section>
    )}
}