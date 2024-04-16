import React, { useState, useEffect } from 'react'

import './App.css'
import TaskList from '../TaskList/TaskList'
import NewTaskForm from '../NewTaskForm/NewTaskForm'
import Footer from '../Footer/Footer'

const App = () => {
  const [nextId, setNextId] = useState(4)

  const genExTime = (ms) => {
    // делает дату на заданное количество ms позже
    return new Date(new Date().getTime() - ms)
  }

  const createTask = (quest, secTimer, msPassed, id) => {
    let newId = id
    if (!newId) {
      // console.log('newId')
      newId = nextId
      setNextId((s) => s + 1)
    }
    return {
      id: newId,
      quest: quest,
      creationData: msPassed ? genExTime(msPassed) : new Date(),
      secTimer: secTimer ? secTimer : 0,
      isCompleted: false,
      isCounting: false,
    }
  }

  const [taskDataList, setTaskDataList] = useState([
    createTask('fw', 2, 1000 * 17, 1),
    createTask('fw', 0, 1000 * 60 * 5, 2),
    createTask('fw', 12 * 60 + 25, 1000 * 60 * 5, 3),
  ])
  const [activeFilter, setActiveFilter] = useState('All')

  // ---------------- timer

  const updateTimer = () => {
    // console.log(taskDataList[2])
    const newTaskDataList = taskDataList.slice()
    newTaskDataList.map((val) => {
      if (val.isCounting) {
        val.secTimer--
        if (val.secTimer === 0) val.isCounting = false
      }
      return val
    })
    setTaskDataList(newTaskDataList)
  }

  useEffect(() => {
    // console.log('hi')
    const interval = setInterval(updateTimer, 1000)
    return () => clearInterval(interval)
  }, [taskDataList.length])

  // ---------------- forNewTaskForm

  const addTask = (quest, secTimer) => {
    const newTask = createTask(quest, secTimer)
    const newTaskDataList = [...taskDataList, newTask]
    setTaskDataList(newTaskDataList)
  }

  // ---------------- forTaskList

  const countTask = (id, isCounting) => {
    const newTaskDataList = taskDataList.slice()
    const taskPosition = taskDataList.findIndex((val) => val.id === id)
    newTaskDataList[taskPosition].isCounting = isCounting
    setTaskDataList(newTaskDataList)
  }

  const completeTask = (id, isCompleted) => {
    const newTaskDataList = taskDataList.slice()
    const taskPosition = taskDataList.findIndex((val) => val.id === id)
    newTaskDataList[taskPosition].isCompleted = isCompleted
    setTaskDataList(newTaskDataList)
  }

  const changeTask = (id, newQuest) => {
    const newTaskDataList = taskDataList.slice()
    const taskPosition = taskDataList.findIndex((val) => val.id === id)
    newTaskDataList[taskPosition].quest = newQuest
    setTaskDataList(newTaskDataList)
  }

  const removeTask = (id) => {
    const taskPosition = taskDataList.findIndex((val) => val.id === id)
    const before = taskDataList.slice(0, taskPosition)
    const after = taskDataList.slice(taskPosition + 1)
    const newTaskDataList = [...before, ...after]
    setTaskDataList(newTaskDataList)
  }

  // ---------------- forFooter

  const calcActiveTasks = () => {
    return taskDataList.filter((val) => !val.isCompleted).length
  }

  const changeFilter = (newFilter) => {
    setActiveFilter(newFilter)
  }

  const clearCompletedTasks = () => {
    setTaskDataList(taskDataList.filter((val) => !val.isCompleted))
    setActiveFilter(activeFilter)
  }

  // ---------------- go-go

  return (
    <section className="todoapp">
      <NewTaskForm addTask={addTask} />
      <section className="main">
        <TaskList
          taskDataList={taskDataList}
          activeFilter={activeFilter}
          countTask={countTask}
          completeTask={completeTask}
          changeTask={changeTask}
          removeTask={removeTask}
        />
        <Footer
          countActiveTasks={calcActiveTasks()}
          activeFilter={activeFilter}
          changeFilter={changeFilter}
          clearCompletedTasks={clearCompletedTasks}
        />
      </section>
    </section>
  )
}

export default App
