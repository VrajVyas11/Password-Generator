import { useState,useCallback,useEffect,useRef } from 'react'


function App() {
  const [color, setColor] = useState('blue');
  const [length, setLength] = useState(4);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setpassword] = useState("");

  const passwordref=useRef(null)
  const passwordGenerator=useCallback(()=>{
    let pass=""
    let str=
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

    if(numberAllowed) str+="0123456789"
    if(charAllowed) str+="{}[];/?()@!#$~"

    for(let i=1;i<=length;i++)
    {
      let char =Math.floor(Math.random()*str.length+1)
      pass+=str.charAt(char)

    }

setpassword(pass)

  },[length,numberAllowed,charAllowed,setpassword])

  const copyPasswordToClipBoard=useCallback(()=>{
    passwordref.current?.select();
    
window.navigator.clipboard.writeText(password)
  },[password])



  useEffect(()=>{passwordGenerator()},[length,numberAllowed,charAllowed,passwordGenerator])
  return (
    <>
    <div className='w=full max-w-md mx-auto
    shadow-md rounded-lg py-3 px-4 my-8 
    text-orange-500 bg-gray-800'>
<h1 className='text-white text-center py-3'>password generator</h1>
       <div className='flex shadow rounded-lg 
       overflow-hidden mb-4'>

      <input type="text" 
      className=' outline px-4 rounded-lg w-full py-1 px-5'
      placeholder='password' 
      readOnly
      value={password}
      ref={passwordref}
      />
      <button 
      onClick={copyPasswordToClipBoard}
      className='outline-none bg-blue-700 text-white
       px-3 py-0,5 shrink-0'>copy</button>
      </div>

      <div className='flex text-sm gap-x-2'>
<div className='flex item-center gap-x-1'> 
<input 
type="range" 
min="6"
max="100" 
value={length} 
className='cursor-pointer'
onChange={(e)=>{setLength(e.target.value)}}
/>
<label>length:{length}</label>
</div>
<div className='flex item-center gap-x-1'>
<input 
type="checkbox" 
defaultChecked={numberAllowed}
id="numberInput"
onChange={()=>{
  setNumberAllowed((prev=>!prev))
}}/>
<label>Numbers</label>
</div>

<div className='flex item-center gap-x-1'>
<input 
type="checkbox" 
defaultChecked={charAllowed}
id="charInput"
onChange={()=>{
  setCharAllowed((prev=>!prev))
}}/>
<label>Characters</label>
</div>
      </div>  
      </div>  
      </>
  )
}

export default App
