
import React from "react";
import ReactDOM from "react-dom/client";

import { formatDistanceToNowStrict } from 'date-fns'

import './Task.css'


export default class extends React.Component{
    state={
        isEditing:false,
        quest:''
    }

    taskStyleClass=()=>{
        let res=[]
        if (this.props.isCompleted){
            res.push('completed')
        }
        if (this.state.isEditing){
            res.push('editing')
        }
        return res
            .join(' ')
    }

    timeString='created '+formatDistanceToNowStrict(this.props.time,{addSuffix:true})

    switchChange=()=>{
        this.setState((state)=>{
            return{
                isEditing:!state.isEditing
            }
        })
    }

    completeTask=()=>{
        this.props.completeTask(this.props.isCompleted)
    }

    removeTask=()=>{
        this.props.removeTask()
    }

    // changeTask
    questOnChange=(e)=>{
        this.setState({
            quest:e.target.value
        })
    }
    questOnKeyUp=(e)=>{
        if (e.key==='Enter'){
            this.props.changeTask(this.state.quest)
            this.switchChange()
            this.state.quest=''
        }
    }

    render() {return(
        <li className={this.taskStyleClass()}>
            <div className="view">
                <input
                    className="toggle"
                    type="checkbox"
                    checked={this.props.isCompleted}
                    onChange={this.completeTask}
                />
                <label>
                    <span className="description">{this.props.quest}</span>
                    <span className="created">{this.timeString}</span>
                </label>
                <button
                    className="icon icon-edit"
                    onClick={this.switchChange}
                ></button>
                <button
                    className="icon icon-destroy"
                    onClick={this.removeTask}
                ></button>
            </div>
            <input
                type="text"
                className="edit"
                placeholder="Editing task"
                value={this.state.quest}
                onChange={this.questOnChange}
                onKeyUp={this.questOnKeyUp}
            />
        </li>
    )}
}
