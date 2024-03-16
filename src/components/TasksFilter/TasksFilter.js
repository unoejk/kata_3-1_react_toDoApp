import React from 'react'
// import ReactDOM from 'react-dom/client'

import './TasksFilter.css'

export default class TasksFilter extends React.Component {
  static defaultProps = {
    btnName: '',
    isSelected: false,
    changeFilter: () => {},
  }
  static propTypes = {
    btnName: (props, propName, componentName) => {
      if (typeof props[propName] === 'string') return null
      return new TypeError(`${componentName}: ${propName} must be string`)
    },
    isSelected: (props, propName, componentName) => {
      if (typeof props[propName] === 'boolean') return null
      return new TypeError(`${componentName}: ${propName} must be boolean`)
    },
    changeFilter: (props, propName, componentName) => {
      if (typeof props[propName] === 'function') return null
      return new TypeError(`${componentName}: ${propName} must be function`)
    },
  }

  render() {
    return (
      <li>
        <button className={this.props.isSelected ? 'selected' : null} onClick={this.props.changeFilter}>
          {this.props.btnName}
        </button>
      </li>
    )
  }
}
