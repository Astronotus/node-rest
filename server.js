const express = require ("express")
const app =express()

app.use(express.json())

app.use(logRequest)

function logRequest({method,url},res,next){
    console.log(`[${new Date().toISOString()}] ${method} ${url}`)
    next()
}
const tasks =[
    { id:1, name:"Get tasks", isComplated:false},
    { id:2 , name:"create task",isComplated:false}]

app.get("/tasks",(req,res)=>res.json(tasks))

app.post("/tasks", (req,res)=>{
    const task = req.body
    tasks.push(task)
    res.json(task)
})

app.patch("/tasks/:id",(req,res)=>{
    const taskId = parseInt(req.params.id)
    const task = tasks.find(task=>task.id===taskId)
    if(task) {
        Object.assign(task,req.body)
        res.json(task)
    }
    else {
        res.status(404).json({eror:"Task not found"})
    }
})

app.delete("/tasks/:id",(req,res)=>{
    const taskId = parseInt(req.params.id)
    const task = tasks.find(task=>task.id===taskId)
    if(task) {
        tasks.splise(tasks.indexOf(task),1) 
    }
    else {
        res.status(404).json({eror:"Task not found"})
    }
})

const port = 3000;
app.listen(port,()=>{
    console.log(`Server started at localhost:${port}`)
})