import React, { useState } from 'react'
import { formatDistanceToNowStrict } from 'date-fns'
import './Task.css'

const Task = (props) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editingQuest, setEditingQuest] = useState(props.quest)

  const taskStyleClass = () => {
    let res = []
    if (props.isCompleted) res.push('completed')
    if (isEditing) res.push('editing')
    return res.join(' ')
  }

  const switchChange = () => {
    setIsEditing((s) => !s)
  }

  // changeTask
  const questOnChange = (e) => {
    setEditingQuest(e.target.value)
  }
  const questOnKeyUp = (e) => {
    if (e.key === 'Enter') {
      const editedQuestTrim = editingQuest.trim()
      if (editedQuestTrim !== '') {
        props.changeTask(editedQuestTrim)
        switchChange()
        setEditingQuest(editedQuestTrim)
      } else {
        setEditingQuest(props.quest)
      }
    }
  }

  // time
  const getCreationDataString = () => {
    return 'created ' + formatDistanceToNowStrict(props.creationData, { addSuffix: true })
  }
  const getSecTimerString = () => {
    let res = ''
    let rem = props.secTimer
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

  return (
    <li className={taskStyleClass()}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={props.isCompleted}
          onChange={() => {
            props.completeTask(!props.isCompleted)
          }}
        />
        <label>
          <span className="title">{props.quest}</span>
          <span className="description">
            <button
              className="icon icon-play"
              onClick={() => {
                props.countTask(true)
              }}
              disabled={props.secTimer === 0}
            ></button>
            <button
              className="icon icon-pause"
              onClick={() => {
                props.countTask(false)
              }}
              disabled={props.secTimer === 0}
            ></button>
            {getSecTimerString()}
          </span>
          <span className="description">{getCreationDataString()}</span>
        </label>
        <button className="icon icon-edit" onClick={switchChange}></button>
        <button className="icon icon-destroy" onClick={props.removeTask}></button>
      </div>
      <input
        type="text"
        className="edit"
        placeholder="Editing task"
        value={editingQuest}
        onChange={questOnChange}
        onKeyUp={questOnKeyUp}
      />
    </li>
  )
}

Task.defaultProps = {
  quest: '',
  creationData: new Date(),
  secTimer: 0,
  isCompleted: false,
  countTask: () => {},
  completeTask: () => {},
  changeTask: () => {},
  removeTask: () => {},
}
Task.propTypes = {
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

export default Task
