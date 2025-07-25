import React, { useState } from 'react'
import {Settings, Feather, Sun, Moon} from 'lucide-react'

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [lightMode, setLightMode] = useState(true);
  return (
    <div  className=' h-40 m-[5px] mb-[0px] py-[2px] flex justify-between align-middle relative bg-[#a3f3e3] rounded-[5px]'>
        {/*<div onClick={() => setIsOpen(!isOpen)}>
            <Settings className='cursor-pointer'/>
        </div>

        {
            isOpen && (
                <div className='absolute top-full left-0'>
                    <ul className=' bg-white shadow-lg rounded-lg'>
                        <li>Profile</li>
                        <li>Settings</li>
                        <li>Logout</li>
                    </ul>
                </div>
            )
        }
        */}
        <div onClick={() => setIsOpen(!isOpen)} className="flex self-center cursor-pointer p-[5px]">
            <Settings />
        </div>

       { /* Dropdown Menu */}
      {isOpen && (
        <div className=" flex flex-col absolute left-[10px] top-full bg-[red] "> {// absolute top-full bg-[red] z-50 }
            <>
            <a href="/profile" className="text-[black] hover:text-[white] hover:bg-[black] px-[8px] py-[5px] border-[0.5px]  decoration-transparent">Profile</a>
            <a href="/logout" className="text-[black] hover:text-[white] hover:bg-[black] px-[8px] py-[5px] decoration-transparent">Logout</a>
            </>
            
}         {/*<ul className="absolute w-fit left-[0px] top-full list-none flex flex-col gap-4">
            <li className="bg-[black] text-[white] hover:bg-[white] hover:text-[black] cursor-pointer border"><a href='/profile'>Profile</a></li>
            <li className=" bg-[black] text-[white] hover:bg-[white] hover:text-[black] cursor-pointer border">Settings</li>
            <li className=" bg-[black] text-[white] hover:bg-[white] hover:text-[black] cursor-pointer border">Logout</li>
          </ul>*/}
        </div>
      )}
        <div>
            <Feather className='flex self-center cursor-pointer p-[5px] ' />
        </div>
        <div  className='cursor-pointer'>
            {lightMode ? (
                <Sun onClick={() => setLightMode(false)} className='flex self-center cursor-pointer p-[5px] ' />
            ): (
                <Moon onClick={() => setLightMode(true)} className='flex self-center cursor-pointer p-[5px] ' />
            )}
        </div>
        
    </div>
  )
}

export default Navbar