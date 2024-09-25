import React from 'react'
import "./App.css"
import List_page from './Pages/List_page'
import Navbar from './Components/Navbar/Navbar'
import { FormProvider } from '../src/Components/FormContext.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Adminmain from './Pages/Adminmain.jsx';


export default function App() {
  return (
    <FormProvider>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path='/' element={<List_page />} />
          <Route path='/admin' element={<Adminmain />} />
        </Routes>
      </BrowserRouter>
    </FormProvider>
  )
}
