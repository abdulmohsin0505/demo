import { useEffect, useState } from 'react'

import './App.css'

function App() {
  const [text,setText] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("demo-ashy-phi.vercel.app/")
      const data = await res.text()
      console.log(data)
      setText(data)
    }
    fetchData()
  },[])
  return (
    <>
      <h1>{text}</h1>
    </>
  )
}

export default App
