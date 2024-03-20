import React from 'react'
// import ReactDOM from 'react-dom/client'
import { formatDistanceToNowStrict } from 'date-fns'

import './Task.css'

export default class Task extends React.Component {
  static defaultProps = {
    quest: '',
    time: new Date(),
    isCompleted: false,
    completeTask: () => {},
    changeTask: () => {},
    removeTask: () => {},
  }
  static propTypes = {
    quest: (props, propName, componentName) => {
      if (typeof props[propName] === 'string') return null
      return new TypeError(`${componentName}: ${propName} must be string`)
    },
    time: (props, propName, componentName) => {
      if (props[propName] instanceof Date) return null
      return new TypeError(`${componentName}: ${propName} must be Date`)
    },
    isCompleted: (props, propName, componentName) => {
      if (typeof props[propName] === 'boolean') return null
      return new TypeError(`${componentName}: ${propName} must be boolean`)
    },
    completeTask: (props, propName, componentName) => {
      if (typeof props[propName] === 'function') return null
      return new TypeError(`${componentName}: ${propName} must be function`)
    },
    changeTask: (props, propName, componentName) => {
      if (typeof props[propName] === 'function') return null
      return new TypeError(`${componentName}: ${propName} must be function`)
    },
    removeTask: (props, propName, componentName) => {
      if (typeof props[propName] === 'function') return null
      return new TypeError(`${componentName}: ${propName} must be function`)
    },
  }

  state = {
    isEditing: false,
    quest: '',
  }

  taskStyleClass = () => {
    let res = []
    if (this.props.isCompleted) res.push('completed')
    if (this.state.isEditing) res.push('editing')
    return res.join(' ')
  }

  timeString = 'created ' + formatDistanceToNowStrict(this.props.time, { addSuffix: true })

  switchChange = () => {
    this.setState((state) => {
      return {
        isEditing: !state.isEditing,
      }
    })
  }

  completeTask = () => {
    this.props.completeTask(this.props.isCompleted)
  }

  removeTask = () => {
    this.props.removeTask()
  }

  // changeTask
  questOnChange = (e) => {
    if (e.target.value.trim() !== '') {
      this.props.changeTask(e.target.value)
    }
    this.setState({
      quest: e.target.value,
    })
  }
  questOnKeyUp = (e) => {
    if (e.key === 'Enter') {
      this.switchChange()
      this.setState({
        quest: '',
      })
    }
  }

  render() {
    return (
      <li className={this.taskStyleClass()}>
        <div className="view">
          <input className="toggle" type="checkbox" checked={this.props.isCompleted} onChange={this.completeTask} />
          <label>
            <span className="description">{this.props.quest}</span>
            <span className="created">{this.timeString}</span>
          </label>
          <button className="icon icon-edit" onClick={this.switchChange}></button>
          <button className="icon icon-destroy" onClick={this.removeTask}></button>
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
    )
  }
}
