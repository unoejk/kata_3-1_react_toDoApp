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
    quest: this.props.quest,
    secTimerBalance: this.props.secTimer,
    isEditing: false,
    isCounting: false,
    updateFlag: 0,
  }

  componentDidMount() {
    this.interval = setInterval(this.updateComp, 1000)
  }
  componentWillUnmount() {
    clearInterval(this.interval)
  }

  updateComp = () => {
    if (this.state.isCounting) {
      this.updateSecTimerBalance()
    } else {
      // чтобы created ... ago обновлялось посекундно, когда таймер выключен
      this.setState({
        updateFlag: this.state.updateFlag + 1,
      })
    }
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

  // time
  getCreationDataString = () => {
    return 'created ' + formatDistanceToNowStrict(this.props.creationData, { addSuffix: true })
  }
  getSecTimerString = () => {
    let res = ''
    let rem = this.state.secTimerBalance
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
  updateSecTimerBalance = () => {
    if (this.state.secTimerBalance === 1) {
      this.setState({
        isCounting: false,
        secTimerBalance: this.state.secTimerBalance - 1,
      })
    } else {
      this.setState({
        secTimerBalance: this.state.secTimerBalance - 1,
      })
    }
  }
  switchTimer = (bool) => {
    this.setState(() => {
      return {
        isCounting: bool,
      }
    })
  }

  render() {
    return (
      <li className={this.taskStyleClass()}>
        <div className="view">
          <input className="toggle" type="checkbox" checked={this.props.isCompleted} onChange={this.completeTask} />
          <label>
            <span className="title">{this.props.quest}</span>
            <span className="description">
              <button
                className="icon icon-play"
                onClick={() => {
                  this.switchTimer(true)
                }}
                disabled={this.state.secTimerBalance === 0}
              ></button>
              <button
                className="icon icon-pause"
                onClick={() => {
                  this.switchTimer(false)
                }}
                disabled={this.state.secTimerBalance === 0}
              ></button>
              {this.getSecTimerString()}
            </span>
            <span className="description">{this.getCreationDataString()}</span>
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
