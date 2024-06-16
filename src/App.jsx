import { useCallback, useEffect, useRef, useState } from 'react';
import './App.css'

function App() {

  const [color,setColor] = useState("DarkCyan");
  const [length,setLength] = useState(8);
  const [password , setPassword] = useState("");
  const [numAllowed,setNumAllowed] = useState(false);
  const [charAllowed,setCharAllowed] =useState(false);

  const passwordRef = useRef(null);

  const GeneratePassword = useCallback(()=>{
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if(numAllowed){
      str += "0123456789";
    }
    if(charAllowed){
      str += "!@#$%^&*<>?/:+-_";
  }
   for (let i = 1; i <= length ; i++){
    let char = Math.floor(Math.random()*str.length +1);
    pass += str.charAt(char);
    }
    setPassword(pass);
},[length,numAllowed,charAllowed,setPassword])


  const copyToClipBoard = useCallback( () => {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password);
  },[password])

   useEffect(()=>{
      GeneratePassword();
   },[length,numAllowed,charAllowed,GeneratePassword])

  return (
   <>
   <div className='w-full h-screen px-0 py-0 '
   style={{backgroundColor: color}}>
       <div className='flex flex-wrap justify-center gap-4 '>
        <h1 className='text-4xl text-center mx-80 mt-3' style={{color:"cyan", paddingLeft:"120px"}}>Password Generator</h1>
        <div className='rounded-full mt-3' style={{backgroundColor:"lightblue"}}>
          <button className='outline-none text-white px-3 py-3'
                onClick={() => setColor(color==="black"?"DarkCyan":"black")}
                >
                 Dark Mode
          </button>
       </div>
      </div>

      <div className='w-full max-w-md mx-auto px-4 py-4 my-8 rounded-lg shadow-md text-orange-500 bg-gray-700'>
         <div className='flex shadow overflow-hidden mb-1 rounded-lg'>
          <input
             type="text"
            value={password}
            placeholder='password'
            className='outline-none px-1 py-1 w-full'
            readOnly
            ref={passwordRef}
            />
            <button className='outline-none px-3 py-2 ml-2 text-gray-600 rounded-full bg-cyan-200 shrink-0'
            onClick={copyToClipBoard}>Copy</button>
         </div>
         <div className='flex text-sm gap-x-2 mt-3'>
        <div className='flex gap-x-1 items-center'>
        <input
         type="range" 
         min={8}
         max={50}
         value={length}
         className='cursor-pointer '
         onChange={(e)=>{
            setLength(e.target.value)
         }} />
         <label htmlFor="">Length : {length}</label>
        </div>
      <div className='flex items-center gap-x-1'>
        <input 
        type="checkbox"
        id='numberInput'
        defaultChecked={numAllowed}
        onClick={()=>{
          setNumAllowed((prev)=> !prev)
        }} />
        <label htmlFor="numberInput">Number</label>
      </div>

      <div className='flex items-center gap-x-1'>
        <input 
        type="checkbox" 
        id='charInput'
        defaultChecked={charAllowed}
        onClick={()=>{
          setCharAllowed((prev)=> !prev)
        }} />
        <label htmlFor="charInput">Character</label>
      </div>
      </div>   
   </div>
   </div>
    
   </>
  )
}

export default App
