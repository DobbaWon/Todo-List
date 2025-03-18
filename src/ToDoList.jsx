import React, { useState } from 'react'

function ToDoList(){
    const [tasks, setTasks] = useState([
        { text: 'Eat Breakfast', dueDate: '2024-03-19T08:00' },
        { text: 'Go to the gym', dueDate: '2024-03-19T10:00' },
        { text: 'Do laundry', dueDate: '2024-03-19T14:00' }
    ]);
    const [finishedTasks, setFinishedTasks] = useState([]);
    
    const [newTask, setNewTask] = useState('');
    const [newDueDate, setNewDueDate] = useState('');

    function handleInputChange(event){
        setNewTask(event.target.value);
    }

    function handleDateChange(event) {
        setNewDueDate(event.target.value);
    }

    function addTask(){
        if (newTask.trim() === '' || newDueDate === '') return;

        const newTaskObject = {
            text: newTask,
            dueDate: newDueDate
        };
        setTasks([...tasks, newTaskObject]);
        setNewTask('');
        setNewDueDate('');
    }

    function deleteTask(index){
        const newTasks = tasks.filter((_, i) => i !== index);
        setTasks(newTasks);
    }

    function moveTaskUp(index){
        if(index === 0){
            return;
        }
        const newTasks = [...tasks];
        const temp = newTasks[index];
        newTasks[index] = newTasks[index - 1];
        newTasks[index - 1] = temp;
        setTasks(newTasks);
    }  

    function moveTaskDown(index){
        if(index === tasks.length - 1){
            return;
        }
        const newTasks = [...tasks];
        const temp = newTasks[index];
        newTasks[index] = newTasks[index + 1];
        newTasks[index + 1] = temp;
        setTasks(newTasks);
    }

    function finishTask(index) {
        const taskToMove = tasks[index];
        setTasks(tasks.filter((_, i) => i !== index));
        setFinishedTasks([...finishedTasks, taskToMove]); 
    }
    
    function recallTask(index){
        const taskToMove = finishedTasks[index];
        setFinishedTasks(finishedTasks.filter((_, i) => i !== index));
        setTasks([...tasks, taskToMove]);
    }

    function deleteFinishedTask(index){
        const newFinishedTasks = finishedTasks.filter((_, i) => i !== index);
        setFinishedTasks(newFinishedTasks);
    }
    
    return (
    <div className='to-do-list'>
        <h1>To-Do-List</h1>

        <div>
            <input 
                type="text"
                placeholder='Enter a new task'
                value={newTask}
                onChange={handleInputChange}
            ></input>

            <input 
                type="datetime-local"
                placeholder='Enter a due date'
                value={newDueDate}
                onChange={handleDateChange}
            ></input>

            <button className='add-button'
                onClick={addTask}>
                Add
            </button>
        </div>

        <div
            className='tasks'>
            Incomplete Tasks:
        </div>

        <ol>
            {tasks.map((task, index) => 
                <li key={index}>
                    <button
                        className='done-button'
                        onClick={() => finishTask(index)}>
                        Done
                    </button>

                    <span className='text'>
                        {task.text} - Due: {new Date(task.dueDate).toLocaleString()}
                    </span>
                    
                    <button
                        className='delete-button'
                        onClick ={() => deleteTask(index)}>
                        Delete
                    </button>

                    <button
                        className='move-button'
                        onClick ={() => moveTaskUp(index)}>
                        Move Up
                    </button>

                    <button
                        className='move-button'
                        onClick ={() => moveTaskDown(index)}>
                        Move Down
                    </button>
                </li>
            )}
        </ol>

        <div
            className='tasks'>
            Completed Tasks:
        </div>

        <ol>
            {finishedTasks.map((task, index) => 
                <li key={index}>
                    <button
                        className='recall-button'
                        onClick={() => recallTask(index)}>
                        Recall
                    </button>

                    <span className='text'>
                        {task.text} - Due: {new Date(task.dueDate).toLocaleString()}
                    </span>

                    <button
                        className='delete-button'
                        onClick ={() => deleteFinishedTask(index)}>
                        Delete
                    </button>
                </li>
            )}
        </ol>
    </div>
    );
}
export default ToDoList