import React from 'react'

const Todo = ({ todo, index, markTodo, removeTodo}) => {


    /*showOptionButtons function is used to show the add active and remove button of a todoitem whenever the checkbox is clicked*/ 
    const showOptionButtons = (ele) =>{
        let btnParent = document.getElementsByClassName('buttonPrnt')
        for(var i=0; i< btnParent.length; i ++){
          btnParent[i].classList.add("hide");
        } 
        let pNode = document.getElementById(ele.currentTarget.id)
        if(pNode.checked === true){
          pNode.parentElement.lastElementChild.classList.toggle("hide")
        }
        else{
          pNode.parentElement.lastElementChild.classList.add("hide")
        }
    }


    return (
      <div className={todo.completed ? "active isList" : "all isList"} key={todo.id}>
        <input type="checkbox" onClick={showOptionButtons} id={'check_'+index} className="checkTask"></input>
        <span style={{ textDecoration: todo.completed ? "line-through" : ""}}>{todo.taskName}</span>
        <div className='buttonPrnt hide' id={'buttons_'+index}>
          <button onClick={() => markTodo(todo.taskNAme,todo.id)}>Active</button>
          <button onClick={() => removeTodo(todo.id)}>Remove</button>
        </div>
      </div>
    );
  }

export default Todo
