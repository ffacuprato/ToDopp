import React , {useState} from 'react';
import './App.css';
import TaskInput from './components/TaskInput';
import { ToDo } from './model';
import ToDoList from './components/ToDoList';
import { DropResult } from 'react-beautiful-dnd'
import { DragDropContext } from 'react-beautiful-dnd';

const App: React.FC = () => {
  
  const [toDo,setToDo]= useState<string>("");
  const [toDos,setToDos]=useState<ToDo[]>([]);
  const [completedToDos,setCompletedToDos]=useState<ToDo[]>([ ])

  const handleAdd = (e:React.FormEvent) => {

    e.preventDefault();

    if(toDo){
      setToDos([...toDos,{id:Date.now(),todo:toDo,isDone:false}]);
      setToDo("");
    }
  }

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    console.log(result);
  
    if (!destination) {
      return;
    }
  
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }
  
    let add;
    let active = toDos;
    let complete = completedToDos;
  
    if (source.droppableId === "TodosList") {
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }
  
    if (destination.droppableId === "TodosList") {
      active.splice(destination.index, 0, add);
    } else {
      complete.splice(destination.index, 0, add);
    }
  
    setCompletedToDos(complete);
    setToDos(active);
  };
  

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
      <span className='header'>To-dopp</span>
      <TaskInput toDo={toDo} setToDo={setToDo} handleAdd={handleAdd}/>
      <ToDoList toDos={toDos} setToDos={setToDos} completedToDos={completedToDos} setCompletedToDos={setCompletedToDos}/>
    </div>
    </DragDropContext>
  );
}

export default App;
