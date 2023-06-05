import React, { useContext, useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import Header from './Components/Header'
import Sidebar from './Components/Sidebar'
import Feed from './Components/Feed'
import Widget from './Components/Widget'
import { AuthContext } from './Auth'

const Home = () => {
    const { currentUser } = useContext(AuthContext)
    const navigatTo = useNavigate();
    useEffect(() => {
        if (!currentUser) {
            navigatTo("/login");
        }
    })
    return (
        <>
            {currentUser ?
                <div className="Home">
                    <Header />
                    <section className="app__body">
                        <Sidebar />
                        <Feed />
                        <Widget />
                    </section>
                </div>
                :
                <h1>Sign in</h1>}
        </>
    )
}

export default Home