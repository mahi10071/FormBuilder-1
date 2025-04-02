import React from 'react'
import { Forms } from '../components/Forms'
import FormBuilder from '../components/FormBuilder'
import { Routes, Route} from 'react-router-dom'

const ScreenRouter = () => {
  return (
    <Routes> 
        <Route
        path="/"
        element={
            <Forms/>
        }></Route>
        <Route
        path="/buildform/:id"
        element={
            <FormBuilder/>
        }></Route>
    </Routes>
  )
}

export default ScreenRouter
