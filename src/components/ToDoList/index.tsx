import React from 'react';
import {ToDo} from '../../model';
import '../styles.css'
import SingleToDo from '../SingleToDo';
import {} from 'react-beautiful-dnd'
import { Droppable } from 'react-beautiful-dnd';

interface Props {
    toDos: ToDo[];
    setToDos: React.Dispatch<React.SetStateAction<ToDo[]>>;
    completedToDos: ToDo[];
    setCompletedToDos: React.Dispatch<React.SetStateAction<ToDo[]>>;
}

const ToDoList: React.FC<Props> = ({toDos,setToDos,completedToDos,setCompletedToDos}:Props) => {
    return (
        <div className="container">

            <Droppable droppableId="TodosList">
               {(provided ) => ( <div className='toDos' ref={provided.innerRef} {...provided.droppableProps}>

                    <span className="toDos__heading">Active Tasks</span>
                    {toDos.map((toDo,index) => <>

                        <SingleToDo 
                            index={index}
                            toDo={toDo} 
                            key={toDo.id} 
                            toDos={toDos} 
                            setToDos={setToDos}
                            setCompletedToDos={setCompletedToDos}
                        />

                    </>)}

                    {provided.placeholder}

                </div>
                )}
            </Droppable>
            <Droppable droppableId="ToDosRemove">
                {(provided) => (<div className="toDos doneToDos" ref={provided.innerRef} {...provided.droppableProps}>
                    <span className="toDos__heading">Completed Tasks</span>
                    {completedToDos?.map((toDo,index) => <>
                        <SingleToDo 
                            index={index}
                            toDo={toDo} 
                            key={toDo.id}
                            toDos={toDos}
                            setToDos={setToDos}
                            setCompletedToDos={setCompletedToDos}
                        />
                    </>)}
                </div>)}
            </Droppable>
        </div>
    );
};

export default ToDoList;