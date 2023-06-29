import React from 'react';


const MyMaps = ({ tasks, onDeleteClick, changeHandler }) => {

  return (
    <>
      {tasks.map((x) => {
        return (
          <form className='flexBody' key={x.id} >
            <div>

              {/* checkBox */}
              <input className='checkBoxes' type='checkbox' id='checkBox' name={x.id}
                onChange={(e) => changeHandler(e, x)}>
              </input>
              <label id='mainTask' htmlFor={x.id}>{x.label}</label>
            </div >

            {/* delete button */}
            < label htmlFor={x.id} > <button className='cursor' onClick=
              {(e) => onDeleteClick(e, x)}
            >x</button></label >
          </form >
        );
      })}
    </>
  );
}
export default MyMaps;