import React from 'react'
// import ReactDOM from 'react-dom/client'

import './App.css'

import TaskList from '../TaskList/TaskList'
import NewTaskForm from '../NewTaskForm/NewTaskForm'
import Footer from '../Footer/Footer'

export default class App extends React.Component {
  lastId = 0

  genExTime = (ms) => {
    // делает дату на заданное количество ms позже
    return new Date(new Date().getTime() - ms)
  }

  createTask = (quest, secTimer, msPassed) => {
    return {
      id: this.lastId++,
      quest: quest,
      creationData: msPassed ? this.genExTime(msPassed) : new Date(),
      secTimer: secTimer ? secTimer : 0,
      isCompleted: false,
      isCounting: false,
    }
  }

  state = {
    taskDataList: [
      this.createTask('fw', 2, 1000 * 17),
      this.createTask('fw', 0, 1000 * 60 * 5),
      this.createTask('fw', 12 * 60 + 25, 1000 * 60 * 5),
      // this.createTask('Completed task', 1000 * 17),
      // this.createTask('Editing task', 1000 * 60 * 5),
      // this.createTask('Active task', 1000 * 60 * 5),
    ],
    activeFilter: 'All',
    // updateFlag: 0,
  }

  // ---------------- timer

  componentDidMount() {
    this.interval = setInterval(this.updateTimer, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  updateTimer = () => {
    const newTaskDataList = this.state.taskDataList.slice()
    newTaskDataList.map((val) => {
      if (val.isCounting) {
        val.secTimer--
        if (val.secTimer === 0) val.isCounting = false
      }
      return val
    })
    this.setState({
      taskDataList: newTaskDataList,
      // updateFlag: this.state.updateFlag + 1,
    })
  }

  // ---------------- forNewTaskForm

  addTask = (quest, secTimer) => {
    const newTask = this.createTask(quest, secTimer)
    const newTaskDataList = [...this.state.taskDataList, newTask]
    this.setState({
      taskDataList: newTaskDataList,
    })
  }

  // ---------------- forTaskList

  countTask = (id, isCounting) => {
    const newTaskDataList = this.state.taskDataList.slice()
    const taskPosition = this.state.taskDataList.findIndex((val) => val.id === id)
    newTaskDataList[taskPosition].isCounting = isCounting
    this.setState({
      taskDataList: newTaskDataList,
    })
  }

  completeTask = (id, isCompleted) => {
    const newTaskDataList = this.state.taskDataList.slice()
    const taskPosition = this.state.taskDataList.findIndex((val) => val.id === id)
    newTaskDataList[taskPosition].isCompleted = isCompleted
    this.setState({
      taskDataList: newTaskDataList,
    })
  }

  changeTask = (id, newQuest) => {
    const newTaskDataList = this.state.taskDataList.slice()
    const taskPosition = this.state.taskDataList.findIndex((val) => val.id === id)
    newTaskDataList[taskPosition].quest = newQuest
    this.setState({
      taskDataList: newTaskDataList,
    })
  }

  removeTask = (id) => {
    const taskPosition = this.state.taskDataList.findIndex((val) => val.id === id)
    const before = this.state.taskDataList.slice(0, taskPosition)
    const after = this.state.taskDataList.slice(taskPosition + 1)
    const newTaskDataList = [...before, ...after]
    this.setState({
      taskDataList: newTaskDataList,
    })
  }

  // ---------------- forFooter

  calcActiveTasks = () => {
    return this.state.taskDataList.filter((val) => !val.isCompleted).length
  }

  changeFilter = (newFilter) => {
    this.setState({
      activeFilter: newFilter,
    })
  }

  clearCompletedTasks = () => {
    this.setState({
      taskDataList: this.state.taskDataList.filter((val) => !val.isCompleted),
      activeFilter: this.state.activeFilter,
    })
  }

  // ---------------- go-go

  render() {
    return (
      <section className="todoapp">
        <NewTaskForm addTask={this.addTask} />
        <section className="main">
          <TaskList
            taskDataList={this.state.taskDataList}
            activeFilter={this.state.activeFilter}
            countTask={this.countTask}
            completeTask={this.completeTask}
            changeTask={this.changeTask}
            removeTask={this.removeTask}
          />
          <Footer
            countActiveTasks={this.calcActiveTasks()}
            activeFilter={this.state.activeFilter}
            changeFilter={this.changeFilter}
            clearCompletedTasks={this.clearCompletedTasks}
          />
        </section>
      </section>
    )
  }
}
