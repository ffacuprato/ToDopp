import React, { useRef } from 'react'
import '../styles.css'

interface Props{
  toDo:string;
  setToDo:React.Dispatch<React.SetStateAction<string>>;
  handleAdd: ( e:React.FormEvent )=> void;

}

const  TaskInput:React.FC<Props> = ({toDo,setToDo,handleAdd}) => {
  
  const InputRef = useRef<HTMLInputElement>(null);
  
  return (
    <form className='input' onSubmit={(e) => {handleAdd(e);
    InputRef.current?.blur();
    }}>
        <input 
        ref={InputRef}
        type='input' 
        placeholder='Ingrese una tarea' 
        className='input_box'
        value={toDo}
        onChange={e => setToDo(e.target.value)}
        />
        <button className='input_submit' type='submit'>ADD</button>
    </form>
  )
}

export default TaskInput;
