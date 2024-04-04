import React from 'react'
// import ReactDOM from 'react-dom/client'
import { formatDistanceToNowStrict } from 'date-fns'

import './Task.css'

export default class Task extends React.Component {
  static defaultProps = {
    quest: '',
    creationData: new Date(),
    secTimer: 0,
    isCompleted: false,
    countTask: () => {},
    completeTask: () => {},
    changeTask: () => {},
    removeTask: () => {},
  }
  static propTypes = {
    quest: (props, propName, componentName) => {
      if (typeof props[propName] === 'string') return null
      return new TypeError(`${componentName}: ${propName} must be string`)
    },
    creationData: (props, propName, componentName) => {
      if (props[propName] instanceof Date) return null
      return new TypeError(`${componentName}: ${propName} must be Date`)
    },
    secTimer: (props, propName, componentName) => {
      if (typeof props[propName] === 'number') return null
      return new TypeError(`${componentName}: ${propName} must be number`)
    },
    isCompleted: (props, propName, componentName) => {
      if (typeof props[propName] === 'boolean') return null
      return new TypeError(`${componentName}: ${propName} must be boolean`)
    },
    countTask: (props, propName, componentName) => {
      if (typeof props[propName] === 'function') return null
      return new TypeError(`${componentName}: ${propName} must be function`)
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
    editingQuest: this.props.quest,
  }

  taskStyleClass = () => {
    let res = []
    if (this.props.isCompleted) res.push('completed')
    if (this.state.isEditing) res.push('editing')
    return res.join(' ')
  }

  switchChange = () => {
    this.setState((state) => {
      return {
        isEditing: !state.isEditing,
      }
    })
  }

  // countTask=(isCounting)=>{
  //     this.props.countTask(isCounting)
  // }

  // completeTask = () => {
  //   this.props.completeTask(!this.props.isCompleted)
  // }

  // removeTask = () => {
  //   this.props.removeTask()
  // }

  // changeTask
  questOnChange = (e) => {
    this.setState({
      editingQuest: e.target.value,
    })
  }
  questOnKeyUp = (e) => {
    if (e.key === 'Enter') {
      const editedQuest = this.state.editingQuest.trim()
      if (this.state.editingQuest.trim() !== '') {
        console.log(this.state.editingQuest.trim())
        this.props.changeTask(editedQuest)
        this.switchChange()
        this.setState({
          editingQuest: editedQuest,
        })
      } else {
        this.setState({
          editingQuest: this.props.quest,
        })
      }
    }
  }

  // time
  getCreationDataString = () => {
    return 'created ' + formatDistanceToNowStrict(this.props.creationData, { addSuffix: true })
  }
  getSecTimerString = () => {
    let res = ''
    let rem = this.props.secTimer
    res += Math.floor(rem / (10 * 60))
    rem = rem % (10 * 60)
    res += Math.floor(rem / 60)
    rem = rem % 60
    res += ':'
    res += Math.floor(rem / 10)
    rem = rem % 10
    res += rem
    return res
  }

  render() {
    return (
      <li className={this.taskStyleClass()}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={this.props.isCompleted}
            onChange={() => {
              this.props.completeTask(!this.props.isCompleted)
            }}
          />
          <label>
            <span className="title">{this.props.quest}</span>
            <span className="description">
              <button
                className="icon icon-play"
                onClick={() => {
                  this.props.countTask(true)
                }}
                disabled={this.props.secTimer === 0}
              ></button>
              <button
                className="icon icon-pause"
                onClick={() => {
                  this.props.countTask(false)
                }}
                disabled={this.props.secTimer === 0}
              ></button>
              {this.getSecTimerString()}
            </span>
            <span className="description">{this.getCreationDataString()}</span>
          </label>
          <button className="icon icon-edit" onClick={this.switchChange}></button>
          <button className="icon icon-destroy" onClick={this.props.removeTask}></button>
        </div>
        <input
          type="text"
          className="edit"
          placeholder="Editing task"
          value={this.state.editingQuest}
          onChange={this.questOnChange}
          onKeyUp={this.questOnKeyUp}
        />
      </li>
    )
  }
}
