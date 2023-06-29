import React, { useState } from 'react';
import { list } from '../../Components/lists/List';
import MyMaps from '../../Components/myMaps/MyMaps';


const MainPage = () => {

  const [tasks, setTasks] = useState(list);
  const [newTask, setNewTask] = useState('');
  const [checkCount, setCheckCount] = useState(0);


  //Submit new task
  const submitHandler = (e) => {
    e.preventDefault();

    //get the id of last task in the tasks list
    let lastTaskId = (tasks[tasks.length - 1]).id;
    setTasks([...tasks, {
      id: lastTaskId + 1,
      label: newTask,
      checked: false
    }]);

    //clear input field
    e.target.reset();
  }



  //check if clicked box is checked or not and update counter accordingly
  const changeHandler = (x, y) => {
    if (x.target.checked) {
      y.checked = true;
      setCheckCount(checkCount + 1);
    } else {
      setCheckCount(checkCount - 1);
    }
  }


  //delete task
  const onDeleteClick = (e, taskDeleted) => {
    e.preventDefault();

    //if task to be deleted had been checked, reduce counter
    if (taskDeleted.checked === true) setCheckCount(checkCount - 1);

    const result = tasks.filter((task) => {
      return task.id !== taskDeleted.id;
    });
    setTasks(result);
  }


  return (
    <>
      <div className='mainBody'>
        <h3>THINGS TO DO:</h3>
        <div className='checkBoxDiv'>

          <MyMaps tasks={tasks}
            onDeleteClick={onDeleteClick}
            changeHandler={changeHandler}
          />

        </div>
        <p><b>DONE: {checkCount}</b></p>


        {/* add new task */}
        <form className='flexBody addTask' onSubmit={submitHandler}>
          <input onChange={(e) => setNewTask(e.target.value)}
            type='text' id='task' placeholder='add task' required>
          </input>
          <button className='cursor'>Add Task</button>
        </form>
      </div >
    </>
  );
}
export default MainPage;