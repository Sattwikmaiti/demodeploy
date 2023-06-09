import { useEffect, useState } from "react";


import "./App.css"


import Comment from "./components/Comment.js"
// const api_base = "http://localhost:3001";





function App() {
  //all todos
 
  
  // on mountdidmount change effect
  //e.target.files is an array
  const [database,setDatabase]=useState([])
  const [newTodo,setNewTodo]=useState("");
  const [newAuthor,setNewAuthor]=useState("");

    
  useEffect(() => {
    getLeader();
    
  }, []);
const getLeader = async ()=>{
  const response =await fetch('https://demodeply.onrender.com/todos');
  const data=await response.json();
  setDatabase(data);
  console.log(database)
}
 

const addTodo = async () => {
  const data = await fetch("https://demodeply.onrender.com/todo/new", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text: newTodo,
      author:newAuthor
    }),
  }).then((res) => res.json());
  
  console.log(newAuthor)
  setDatabase([...database, data]);

  
  setNewTodo("");
  setNewAuthor("")
};

  return (
<div>


<input type="text" placeholder ="author" value={newAuthor}  onChange={(e)=>setNewAuthor(e.target.value)}/>
<input type="text" placeholder ="text"  value={newTodo}  onChange={(e)=>setNewTodo(e.target.value)}/>
<button onClick={addTodo}>Submits</button>
   
  {
    database.length>0 ? 
    
    database.map((e)=>{ return(<Comment author={e.author} postedOn={e.timestamp} comment={e.text}  /> )}):"NoComments"
  }

</div>
 
  );
}

export default App;