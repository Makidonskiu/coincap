import React from 'react'
import { Outlet } from 'react-router-dom'
//Components
import { Header } from '../header'

export const Layout = () => {
  return (
    <>
        <Header/>
        <Outlet/>
    </>
  )
}
