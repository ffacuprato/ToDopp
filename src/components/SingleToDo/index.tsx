import React, { useEffect, useRef, useState } from 'react'
import '../styles.css'
import { ToDo } from '../../model'
import {AiFillEdit , AiFillDelete} from 'react-icons/ai'
import {MdDone} from 'react-icons/md'
import { Draggable } from 'react-beautiful-dnd'

type Props = {
    index: number;
    toDo:ToDo;
    toDos:ToDo[];
    setToDos:React.Dispatch<React.SetStateAction<ToDo[]>>;
    setCompletedToDos: React.Dispatch<React.SetStateAction<ToDo[]>>
}

const SingleToDo = ({toDo,toDos,setToDos,index,setCompletedToDos}:Props) => {

    const[edit,setEdit] = useState<boolean>(false);
    const[editToDo,setEditToDo] = useState<string>(toDo.todo);

    const handleDone = (id:number) => {
        setToDos(
            toDos.map((toDo)=> toDo.id===id?{...toDo , isDone: !toDo.isDone } : toDo)
            )
        setCompletedToDos(
                toDos.map((toDo)=> toDo.id===id?{...toDo , isDone: toDo.isDone } : toDo)
                )
    
        
    }
    const handleDelete = (id:number) => {
        setToDos(toDos.filter((todo)=> todo.id !== id))
    }
    const handleEdit = (e: React.FormEvent, id: number) => {
        e.preventDefault();
    
        setToDos(toDos.map((todo) => (todo.id === id ? { ...todo, todo: editToDo } : todo)));
    
        setEdit(false);
    };
    
    const inputRef = useRef<HTMLInputElement>(null); 

    useEffect(()=>{
        inputRef.current?.focus();
    },[edit]);

  return (<Draggable draggableId={toDo.id.toString()} index={index}>
                {(provided) => (
                    !toDo.isDone ? (
                    <form className='todos__single' onSubmit={(e) => handleEdit(e, toDo.id)} {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>                        {edit ? (
                            <input 
                            ref={inputRef}
                            value={editToDo} 
                            onChange={(e)=>{setEditToDo(e.target.value)}} className='todos__single--text'/>
                            ):(<>
                            <span className="todos__single--text">
                                {toDo.todo}
                            </span>
                            
                            </>
                                )
                            }
                            <div>
                                <span className="icon" onClick={()=>{
                                    if(!edit && !toDo.isDone){setEdit(!edit)}
                                }}><AiFillEdit /></span>
                                <span className="icon" onClick={()=>handleDelete(toDo.id)}><AiFillDelete /></span>
                                <span className="icon" onClick={()=>handleDone(toDo.id)}><MdDone /></span>
                            </div>
                    </form>):(<></>)
                )
                }
  </Draggable>)
  
}

export default SingleToDo
