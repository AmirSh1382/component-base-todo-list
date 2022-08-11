import * as funcs from "../../../Js/script.js"

const template = document.createElement("template")
template.innerHTML = `
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.9.1/font/bootstrap-icons.css">
    <link rel="stylesheet" href="./BootStrap/Css/bootstrap.min.css">
    <link rel="stylesheet" href="./Components/todo-generator/Css/todo-generator.css">

    <div class="todo d-flex justify-content-between align-items-center mt-3">
    <slot name="todo-title"></slot>
        <button class="btn btn-danger remove-btn me-2"><i class="bi bi-x-lg"></i></button>
    </div>`

class NewTodoGenrator extends HTMLElement{
    constructor() {
        super()

        this.attachShadow({mode : "open"})
        this.shadowRoot.appendChild(template.content.cloneNode(true))
    }

    connectedCallback(){
        let todoTitle = this.innerText
        let removeBtn = this.shadowRoot.querySelector(".remove-btn")

        removeBtn.addEventListener("click" , () => {
            let mainIndex = funcs.Todos.findIndex(todo => todo === todoTitle)

            funcs.Todos.splice(mainIndex , 1)

            funcs.setTodosInToLocalStorage(funcs.Todos)

            this.remove()
        })
    }
}

export {NewTodoGenrator}