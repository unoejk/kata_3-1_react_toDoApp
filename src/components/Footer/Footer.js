import React from 'react'
// import ReactDOM from 'react-dom/client'

import './Footer.css'

import TasksFilter from '../TasksFilter/TasksFilter'

const Footer = (props) => {
  const tasksFilterElemList = props.filters.map((val) => {
    return (
      <TasksFilter
        key={val}
        btnName={val}
        isSelected={props.activeFilter === val}
        changeFilter={() => props.changeFilter(val)}
      />
    )
  })

  return (
    <footer className="footer">
      <span className="todo-count">{props.countActiveTasks} items left</span>
      <ul className="filters">{tasksFilterElemList}</ul>
      <button className="clear-completed" onClick={props.clearCompletedTasks}>
        Clear completed
      </button>
    </footer>
  )
}

Footer.defaultProps = {
  countActiveTasks: 0,
  filters: [],
  activeFilter: '',
  changeFilter: () => {},
  clearCompletedTasks: () => {},
}
Footer.propTypes = {
  countActiveTasks: (props, propName, componentName) => {
    if (typeof props[propName] === 'number') return null
    return new TypeError(`${componentName}: ${propName} must be number`)
  },
  filters: (props, propName, componentName) => {
    if (Array.isArray(props[propName])) return null
    return new TypeError(`${componentName}: ${propName} must be array`)
  },
  activeFilter: (props, propName, componentName) => {
    if (typeof props[propName] === 'string') return null
    return new TypeError(`${componentName}: ${propName} must be string`)
  },
  changeFilter: (props, propName, componentName) => {
    if (typeof props[propName] === 'function') return null
    return new TypeError(`${componentName}: ${propName} must be function`)
  },
  clearCompletedTasks: (props, propName, componentName) => {
    if (typeof props[propName] === 'function') return null
    return new TypeError(`${componentName}: ${propName} must be function`)
  },
}

export default Footer
