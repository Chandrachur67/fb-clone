import React, { useContext, useState, useEffect, useRef } from 'react'

import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import StorefrontIcon from '@mui/icons-material/Storefront';
import GroupsIcon from '@mui/icons-material/Groups';
import { Avatar } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { IconButton } from '@mui/material';

import fb from '/fb.png'
import { AuthContext } from '../Auth';
import { getAuth, signOut } from 'firebase/auth'

import "./Header.css"

function Header() {
    const auth = getAuth();
    const { currentUser } = useContext(AuthContext);
    const [open, setOpen] = useState(false);

    const handleLogout = () => {
        console.log("logging out");
        signOut(auth).then(() => {
            console.log("Sign-out successful.");
        }).catch((error) => {
            // An error happened.
        });
    }

    let menuRef = useRef();

    useEffect(() => {
        let handler = (e) => {
            if (!menuRef.current.contains(e.target)) {
                setOpen(false);
                console.log(menuRef.current);
            }
        };

        document.addEventListener("mousedown", handler);


        return () => {
            document.removeEventListener("mousedown", handler);
        }

    });
    return (
        <section className="header">

            <section className="header__left">
                <img className="header__left-img" src={fb} alt="facebook icon" />
                <section className="header__left-input">
                    <IconButton >
                        <SearchIcon />
                    </IconButton>
                    <input type="text" name="search-box" id="search-box" placeholder="Search Facebook" />
                </section>
            </section>

            <section className="header__center">
                <section className="header__center-option header__center-option--active">
                    <HomeIcon fontSize="large" />
                </section>
                <section className="header__center-option">
                    <PeopleAltIcon fontSize="large" />
                </section>
                <section className="header__center-option">
                    <OndemandVideoIcon fontSize="large" />
                </section>
                <section className="header__center-option">
                    <StorefrontIcon fontSize="large" />
                </section>
                <section className="header__center-option">
                    <GroupsIcon fontSize="large" />
                </section>

            </section>

            <section className="header__right">
                {/* <p id="displayName">{currentUser.displayName}</p> */}

                <IconButton >
                    <AddIcon />
                </IconButton>

                <IconButton >
                    <QuestionAnswerIcon />
                </IconButton>

                <IconButton >
                    <NotificationsActiveIcon />
                </IconButton>

                <Avatar
                    src={currentUser.photoURL}
                    sx={{ width: 50, height: 50 }}
                />

                <div className='menu-container' ref={menuRef}>
                    <div className='menu-trigger' onClick={() => { setOpen(!open) }}>
                        <IconButton >
                            {open ?
                                <KeyboardArrowUpIcon />
                                :
                                <KeyboardArrowDownIcon />
                            }
                        </IconButton>
                    </div>

                    <div className={`dropdown-menu ${open ? 'active' : 'inactive'}`} >
                        <ul>
                            <li className='dropdownItem'>
                                <Avatar src={currentUser.photoURL} sx={{ width: 40, height: 40 }}></Avatar>
                                <p> {currentUser.displayName} </p>
                            </li>

                            <li className='dropdownItem' onClick={handleLogout}>
                                <ExitToAppIcon />
                                <p> logout </p>
                            </li>
                        </ul>
                    </div>
                </div>


            </section>
        </section>
    )
}

function DropdownItem(props) {
    return (
        <li className='dropdownItem'>
            <Avatar src={props.img} sx={{ width: 40, height: 40 }}></Avatar>
            <p> {props.text} </p>
        </li>
    );
}

export default Header