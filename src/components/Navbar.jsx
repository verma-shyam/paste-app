import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <div className='border-black dark:border-gray-600 border-solid border-2 rounded min-w-[700px] h-[2.5rem] bg-amber-200 dark:bg-gray-800 transition-colors duration-300'>
      
      <div className='flex flex-row gap-4 place-content-evenly mt-1 bg-amber-200 dark:bg-gray-800'>

        <NavLink
          className="text-red-500 dark:text-gray-200 font-bold transition-all duration-300 hover:scale-110 hover:text-gray-500"
          to="/"
        >
          Home
        </NavLink>

        <NavLink
          className="text-red-500 dark:text-gray-200 font-bold transition-all duration-300 hover:scale-110 hover:text-gray-500"
          to="/pastes"
        >
          Pastes
        </NavLink>

      </div>
    </div>
  )
}

export default Navbar
