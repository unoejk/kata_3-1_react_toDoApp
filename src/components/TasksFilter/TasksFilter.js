import React from 'react'
import './TasksFilter.css'

const TasksFilter = (props) => {
  return (
    <li>
      <button className={props.isSelected ? 'selected' : null} onClick={props.changeFilter}>
        {props.btnName}
      </button>
    </li>
  )
}

TasksFilter.defaultProps = {
  btnName: '',
  isSelected: false,
  changeFilter: () => {},
}
TasksFilter.propTypes = {
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

export default TasksFilter
