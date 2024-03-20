import React from 'react'
// import ReactDOM from 'react-dom/client'

import './TaskList.css'

import Task from '../Task/Task'

// export default class extends React.Component{
//     // state={
//     //     taskDataList:this.props.taskDataList
//     // }
//     // update=()=>{
//     //     this.setState({
//     //         taskDataList:this.props.taskDataList
//     //     })
//     // }
//
//     taskElemList=this.state.taskDataList.map((val)=>{
//         const {id,...taskDataWithoutId}=val
//         return(
//             <Task
//                 key={id}
//                 {...taskDataWithoutId}
//                 completeTask={(isCompleted)=>this.props.completeTask(id,isCompleted)}
//                 changeTask={(newQuest)=>this.props.changeTask(id,newQuest)}
//                 removeTask={()=>this.props.removeTask(id)}
//                 // update={this.update}
//             />
//         )
//     })
//
//     render() {return(
//         <ul className="todo-list">
//             {this.taskElemList}
//         </ul>
//     )}
// }

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
  completeTask: () => {},
  changeTask: () => {},
  removeTask: () => {},
}
TaskList.propTypes = {
  taskDataList: (props, propName, componentName) => {
    if (Array.isArray(props[propName])) return null
    return new TypeError(`${componentName}: ${propName} must be array`)
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
