const express = require("express")
const app = express()

app.use(express.json())

app.use(logRequest)

function logRequest({ method, url }, res, next) {
    console.log(`[${new Date().toISOString()}] ${method} ${url}`)
    next()
}
const tasks = []
const lists = []

const createTask =(data)=>{
    return {
        id:genIdTask(),
        name:data.name,
        isCompleted:false
    }
}

const createList =(data)=>{
    return {
        id:genIdList(),
        name:data.name
    }
}
const incTask=(init=0)=>()=>++init
const incList=(init=0)=>()=>++init

const genIdTask=incTask()
const genIdList=incList()

app.get("/lists", (req, res) => res.json(lists))

app.post("/lists", (req, res) => {
    const list =createList(req.body)
    tasks.push(list)
    res.json(list)
})

app.delete("/lists/:id", (req, res) => {
    const listId = parseInt(req.params.id)
    const listIndex = lists.findIndex(list => list.id === listId)
    if (listIndex !== -1) {
        lists.splice((listIndex), 1)
        res.json(listId)
    }
    else {
        res.status(404).json({ eror: "List not found" })
    }
})

app.get("/tasks", (req, res) => res.json(tasks))

app.post("/tasks", (req, res) => {
    const task =createTask(req.body)
    tasks.push(task)
    res.json(task)
})

app.patch("/tasks/:id", (req, res) => {
    const taskId = parseInt(req.params.id)
    const task = tasks.find(task => task.id === taskId)
    if (task) {
        Object.assign(task, req.body)
        res.json(task)
    }
    else {
        res.status(404).json({ eror: "Task not found" })
    }
})

app.delete("/tasks/:id", (req, res) => {
    const taskId = parseInt(req.params.id)
    const taskIndex = tasks.findIndex(task => task.id === taskId)
    if (taskIndex !== -1) {
        tasks.splice((taskIndex), 1)
        res.json(taskId)
    }
    else {
        res.status(404).json({ eror: "Task not found" })
    }
})



const port = 3000;
app.listen(port, () => {
    console.log(`Server started at localhost:${port}`)
})