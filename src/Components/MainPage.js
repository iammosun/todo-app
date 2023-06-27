import React, { useEffect, useState } from 'react';
import { list } from './List';

const MainPage = () => {

  const [tasks, setTasks] = useState(list);
  const [newTask, setNewTask] = useState('');
  const [checkCount, setCheckCount] = useState(0);

  useEffect(() => {

    const checkBoxes = document.getElementsByClassName('checkBoxes');
    let arrayBoxes = Array.from(checkBoxes);
    let count = 0;
    arrayBoxes.map((e) => {
      if (e.checked) count++;
      return true;
    })

    setCheckCount(count);

  }, [tasks])

  const submitHandler = (e) => {
    e.preventDefault();
    let lastTask = tasks[tasks.length - 1];

    setTasks([...tasks, {
      id: lastTask.id + 1,
      label: newTask,
      checked: false
    }]);
    e.target.reset();
  }

  const handleChange = (e) => {
    const checkBoxes = document.getElementsByClassName('checkBoxes');
    let arrayBoxes = Array.from(checkBoxes);
    let count = 0;
    arrayBoxes.map((e) => {
      if (e.checked) count++;
      return true;
    })

    setCheckCount(count);
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
                  <input className='checkBoxes' type='checkbox' id='checkBox' name={x.id} onChange={handleChange}></input>
                  <label id='mainTask' htmlFor={x.id}>{x.label}</label>
                </div>

                <label htmlFor={x.id}><button className='cursor' onClick={(e) => {
                  e.preventDefault();
                  const result = tasks.filter((task) => {
                    return task.id !== x.id;
                  });
                  setTasks(result);
                }}>x</button></label>
              </form >
            );
          })}
        </div>
        <p>{checkCount}</p>

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