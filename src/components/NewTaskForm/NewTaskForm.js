import React from 'react'
// import ReactDOM from 'react-dom/client'

import './NewTaskForm.css'

export default class NewTaskForm extends React.Component {
  static defaultProps = {
    addTask: () => {},
  }
  static propTypes = {
    addTask: (props, propName, componentName) => {
      if (typeof props[propName] === 'function') return null
      return new TypeError(`${componentName}: ${propName} must be function`)
    },
  }

  state = {
    quest: '',
    min: '',
    sec: '',
  }

  // addTask
  onChange = (e, name) => {
    this.setState({
      [name]: e.target.value,
    })
  }
  onKeyUp = (e) => {
    if (e.key === 'Enter') {
      if (this.state.quest.trim() !== '') {
        let secTimer = 0
        let min = Math.floor(this.state.min)
        let sec = Math.floor(this.state.sec)
        if (min >= 0 && sec >= 0 && sec <= 60 && min * 60 + sec <= 60 * 60) {
          secTimer = min * 60 + sec
        }
        this.props.addTask(this.state.quest, secTimer)
      }
      this.setState({
        quest: '',
        min: '',
        sec: '',
      })
    }
  }

  render() {
    return (
      <header className="header">
        <h1>Enter = Submit</h1>
        <form className="new-todo-form">
          <input
            className="new-todo"
            placeholder="Task"
            autoFocus
            value={this.state.quest}
            onChange={(e) => {
              this.onChange(e, 'quest')
            }}
            onKeyUp={this.onKeyUp}
          />
          <input
            className="new-todo-form__timer"
            placeholder="Min"
            // autoFocus
            value={this.state.min}
            onChange={(e) => {
              this.onChange(e, 'min')
            }}
            onKeyUp={this.onKeyUp}
            type={'number'}
            min={0}
            max={60}
            step={1}
          />
          <input
            className="new-todo-form__timer"
            placeholder="Sec"
            // autoFocus
            value={this.state.sec}
            onChange={(e) => {
              this.onChange(e, 'sec')
            }}
            onKeyUp={this.onKeyUp}
            type={'number'}
            min={0}
            max={60}
            step={1}
          />
        </form>
      </header>
    )
  }
}
