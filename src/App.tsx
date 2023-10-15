import React from 'react'
import WordScramble from './pages/word-scramble'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {
  

  return (
      <React.Fragment>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<WordScramble />}/>
          </Routes>
        </BrowserRouter>
        
      </React.Fragment>
  
  )
}

export default App
