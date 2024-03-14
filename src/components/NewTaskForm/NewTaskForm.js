
// ---- import

import React from "react";
import ReactDOM from "react-dom/client";

import './NewTaskForm.css'


// ---- go-go

export default class extends React.Component{
    state={
        quest:''
    }

    // addTask
    onChange=(e)=>{
        this.setState({
            quest:e.target.value
        })
    }
    onKeyUp=(e)=>{
        if (e.key==='Enter'){
            this.props.addTask(this.state.quest)
            this.state.quest=''
        }
    }

    render() {return(
        <header className="header">
            <h1>Enter = Submit</h1>
            <input
                className="new-todo"
                placeholder="What needs to be done?"
                autoFocus
                value={this.state.quest}
                onChange={this.onChange}
                onKeyUp={this.onKeyUp}
            />
        </header>
    )}
}
