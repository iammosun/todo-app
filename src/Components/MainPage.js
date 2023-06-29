import React, { useState } from 'react';
import { list } from './List';

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


  return (
    <>
      <div className='mainBody'>
        <h3>THINGS TO DO:</h3>

        <div className='checkBoxDiv'>
          {tasks.map((x) => {
            return (
              <form className='flexBody' key={x.id} >
                <div>

                  {/* checkBox */}
                  <input className='checkBoxes' type='checkbox' id='checkBox' name={x.id}
                    onChange={(e) => changeHandler(e, x)}>
                  </input>
                  <label id='mainTask' htmlFor={x.id}>{x.label}</label>
                </div>

                {/* delete button */}
                <label htmlFor={x.id}><button className='cursor' onClick={(e) => {
                  e.preventDefault();
                  const result = tasks.filter((task) => {

                    //if task to be deleted had been checked, reduce counter
                    if (x.checked === true) setCheckCount(checkCount - 1);
                    return task.id !== x.id;
                  });

                  setTasks(result);
                }}>x</button></label>
              </form >
            );
          })}
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