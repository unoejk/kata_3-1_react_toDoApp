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
    placeholder: 'What needs to be done?',
  }

  // addTask
  onChange = (e) => {
    this.setState({
      quest: e.target.value,
    })
  }
  onKeyUp = (e) => {
    if (e.key === 'Enter') {
      if (this.state.quest.trim() === '') {
        this.setState({
          quest: '',
          placeholder: 'Require to write task',
        })
      } else {
        this.props.addTask(this.state.quest)
        this.setState({
          quest: '',
          placeholder: 'What needs to be done?',
        })
      }
    }
  }

  render() {
    return (
      <header className="header">
        <h1>Enter = Submit</h1>
        <input
          className="new-todo"
          placeholder={this.state.placeholder}
          autoFocus
          value={this.state.quest}
          onChange={this.onChange}
          onKeyUp={this.onKeyUp}
        />
      </header>
    )
  }
}
