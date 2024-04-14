import React from 'react'

import './TaskList.css'
import Task from '../Task/Task'

const TaskList = (props) => {
  const taskElemList = props.taskDataList.map((val) => {
    const { id, ...taskDataWithoutId } = val
    if (
      props.activeFilter === 'All' ||
      (props.activeFilter === 'Active' && !taskDataWithoutId.isCompleted) ||
      (props.activeFilter === 'Completed' && taskDataWithoutId.isCompleted)
    ) {
      return (
        <Task
          key={id}
          {...taskDataWithoutId}
          countTask={(isCounting) => props.countTask(id, isCounting)}
          completeTask={(isCompleted) => props.completeTask(id, isCompleted)}
          changeTask={(newQuest) => props.changeTask(id, newQuest)}
          removeTask={() => props.removeTask(id)}
        />
      )
    }
  })

  return <ul className="todo-list">{taskElemList}</ul>
}

TaskList.defaultProps = {
  taskDataList: [],
  countTask: () => {},
  completeTask: () => {},
  changeTask: () => {},
  removeTask: () => {},
}
TaskList.propTypes = {
  taskDataList: (props, propName, componentName) => {
    if (Array.isArray(props[propName])) return null
    return new TypeError(`${componentName}: ${propName} must be array`)
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

export default TaskList
