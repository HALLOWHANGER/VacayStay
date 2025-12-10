import React, { useEffect } from 'react'
import Navbar from '../../components/admin/Navbar'
import Sidebar from '../../components/admin/Sidebar'
import { Outlet } from 'react-router-dom'
import { useAppContext } from '../../context/AppContext'

const Layout = () => {

    const { isAdmin, navigate } = useAppContext()

    useEffect(() => {
        if (!isAdmin) {
            navigate('/')
        }
    }, [isAdmin])

    return (
                <div className='flex flex-col min-h-screen'>

            <Navbar />
                        <div className='flex flex-1 overflow-hidden'>

                <Sidebar />
                                <div className='flex-1 p-4 pt-16 md:px-10 overflow-y-auto'>

                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Layout