import { Link } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import { useContext, useEffect, useState } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init()
const Navbar = () => {
    const { user, logOut } = useContext(AuthContext)
    const [theme, setTheme] = useState('mytheme');

    useEffect(() => {
        document.body.setAttribute('data-theme', theme);
    }, [theme]);
    const handleThemeChange = (selectedTheme) => {
        // setTheme(selectedTheme);
        setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    };
    const navItems =
        <>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/instructors'>Instructors</Link></li>
            <li><Link to='/allClasses'>Classes</Link></li>
            {user &&  <li><Link to='/dashboard'>Dashboard</Link></li>}
            <div className="mt-1">

                <li className={`container ${theme} absolute w-[100px] `} >
                    <input type="checkbox" className="toggle toggle-error" checked={theme === 'dark'} onChange={handleThemeChange} />
                    {theme === 'light' ? (
                        <label className="btn theme-btn  hidden" onClick={handleThemeChange}>
                            Dark Theme
                        </label>
                    ) : (
                        <label className="btn theme-btn hidden " onClick={handleThemeChange}>
                            Light Theme
                        </label>
                    )}
                </li>
            </div>

        </>
    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(error => console.error(error))
    }

    return (
        <div data-aos="fade-down"
            data-aos-duration="2000"
        >
            <div className="navbar    bg-opacity-20  bg-base-100  font-bold "
            >
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3   p-2 shadow bg-base-100 rounded-box w-52">
                            {navItems}
                        </ul>
                    </div>
                    <Link className="btn btn-ghost normal-case text-xl ">
                        <img className="w-16 hidden md:block  " src="https://files.catbox.moe/w7zhy9.png" alt="" />
                        <h3 className="-ml-4">Creative Canvas</h3>
                    </Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navItems}
                    </ul>
                </div>
                <div className="navbar-end ">

                    {
                        user ?
                            <>
                                <label tabIndex={0} className="btn btn-ghost btn-circle avatar tooltip tooltip-bottom " data-tip={user?.displayName}>
                                    <div className="w-10 rounded-full">
                                        <img src={user?.photoURL} />
                                    </div>
                                </label>
                                <button onClick={handleLogOut} className="btn btn-xs rounded-none   bg-[#FF7777] text-white font-light hover:border-white ">Sign Out</button>
                            </> : <Link to='/login'> <button className="btn btn-sm  bg-[#FF7777] text-white 
                            font-light hover:border-white  ">Login</button></Link>
                    }


                </div>
            </div>
        </div>
    );
};

export default Navbar;