"use strict"

import {NewTodoGenrator} from "../Components/todo-generator/Js/todo-generatore.js"

let $ = document

////////////////////////////////

// variables ///////////////////
const body = $.body
const formLabel = $.querySelector(".form-label")
const formInput = $.querySelector(".form-input")
const todosContainer = $.querySelector(".todos-container")
const addBtn = $.querySelector(".add-btn")
const clearBtn = $.querySelector(".clear-btn")

let Todos = []

// fucntions ////////////////////
function liveUserScreenHeight(){
    let userScreenHeight = visualViewport.height + "px"
    body.style.minHeight = userScreenHeight
}

(function setFormLabelAnimation(){
    formLabel.innerHTML = formLabel.innerHTML
                        .split("")
                        .map((letter , index) => `<span style="transition-delay: ${40 * index}ms;">${letter}</span>`) 
                        .join("")
})()

function getTodosFromLocalStorage(){
    let allTodos = JSON.parse(localStorage.getItem("todos"))

    if(allTodos){
        Todos = allTodos
        todoGenerator(Todos)
    }else{
        setTodosInToLocalStorage([])
    }
}

function setTodosInToLocalStorage(array){
    localStorage.setItem("todos" , JSON.stringify(array)) 
}

function showAniamtion(){
    formLabel.classList.add("aniamtion-show")
}

function removeAniamtion(){
    !formInput.value ? formLabel.classList.remove("aniamtion-show") : null
}


function addNewTodo(){

    let inputValue = formInput.value

    if(inputValue.trim()){
        Todos.push(inputValue)
    
        todoGenerator(Todos)
        setTodosInToLocalStorage(Todos)
    }

    formInput.value = ""
}

function todoGenerator(todosArray){
    let myFragment = document.createDocumentFragment()

    todosContainer.innerHTML = ""

    todosArray.forEach(todoTitle => {
        let newTodo = $.createElement("site-new-todo")
        newTodo.innerHTML = `<div class="ms-2" slot="todo-title">${todoTitle}</div>`

        myFragment.append(newTodo)
    })

    todosContainer.append(myFragment)
}

function deleteAllTodos(){
    let confirmation = confirm("all datas will be lost. are you sure?")

    if(confirmation){
        Todos = []

        setTodosInToLocalStorage(Todos)
        todoGenerator(Todos)
    }
}

// eventlisteners /////////////////
window.customElements.define("site-new-todo" , NewTodoGenrator)
window.addEventListener("load" , liveUserScreenHeight)
window.addEventListener("resize" , liveUserScreenHeight)
window.addEventListener("load" , getTodosFromLocalStorage)
formInput.addEventListener("focus" , showAniamtion)
formInput.addEventListener("blur" , removeAniamtion)
formInput.addEventListener("keydown" , (event) => event.key === "Enter" ? addNewTodo() : null)
addBtn.addEventListener("click" , addNewTodo)
clearBtn.addEventListener("click" , deleteAllTodos)

export {Todos , setTodosInToLocalStorage}