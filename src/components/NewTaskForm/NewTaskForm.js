
import React from "react";
import ReactDOM from "react-dom/client";

import './NewTaskForm.css'


export default class extends React.Component{
    static defaultProps={
        addTask:()=>{}
    }
    static propTypes={
        addTask:(props,propName,componentName)=>{
            if (typeof props[propName]==='function')
                return null
            return new TypeError(`${componentName}: ${propName} must be function`)
        }
    }

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
