import React, { useState } from 'react'
import './NewTaskForm.css'

const NewTaskForm = (props) => {
  const [placeholder, setPlaceholder] = useState('Task')
  const [quest, setQuest] = useState('')
  const [min, setMin] = useState('')
  const [sec, setSec] = useState('')

  const onChange = (e, setter) => {
    setter(e.target.value)
  }
  const onKeyUp = (e) => {
    if (e.key === 'Enter') {
      let minFloor = Math.floor(min)
      let secFloor = Math.floor(sec)
      if (quest.trim() === '') {
        setPlaceholder('Require to wright task')
      } else if (minFloor + secFloor === 0) {
        setPlaceholder('Require to set time')
      } else if (minFloor < 0 || secFloor < 0) {
        setPlaceholder('Wrong time')
      } else if (secFloor > 60 || minFloor > 60) {
        setPlaceholder('Max time - 59:59')
      } else {
        const secTimer = minFloor * 60 + secFloor
        props.addTask(quest, secTimer)
        setPlaceholder('Task')
      }
      setQuest('')
      setMin('')
      setSec('')
    }
  }

  return (
    <header className="header">
      <h1>Enter = Submit</h1>
      <form className="new-todo-form">
        <input
          className="new-todo"
          placeholder={placeholder}
          autoFocus
          value={quest}
          onChange={(e) => {
            onChange(e, setQuest)
          }}
          onKeyUp={onKeyUp}
        />
        <input
          className="new-todo-form__timer"
          placeholder="Min"
          // autoFocus
          value={min}
          onChange={(e) => {
            onChange(e, setMin)
          }}
          onKeyUp={onKeyUp}
          type={'number'}
          min={0}
          max={59}
          step={1}
        />
        <input
          className="new-todo-form__timer"
          placeholder="Sec"
          // autoFocus
          value={sec}
          onChange={(e) => {
            onChange(e, setSec)
          }}
          onKeyUp={onKeyUp}
          type={'number'}
          min={0}
          max={59}
          step={1}
        />
      </form>
    </header>
  )
}

NewTaskForm.defaultProps = {
  addTask: () => {},
}
NewTaskForm.propTypes = {
  addTask: (props, propName, componentName) => {
    if (typeof props[propName] === 'function') return null
    return new TypeError(`${componentName}: ${propName} must be function`)
  },
}

export default NewTaskForm
