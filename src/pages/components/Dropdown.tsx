// components/Dropdown.tsx
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { BiChevronDown } from "react-icons/bi";
import Image from 'next/image';
interface DropdownItemProps {
    path: string;
    label: string;
    white?:boolean;
  }
function DropdownItem({ path, label, white}: DropdownItemProps) {
return (
    <li className={`px-4 py-2 ${!white ? 'bg-white text-blue-500' : 'bg-blue-400 text-white'}`}>
    <a href={path} className={`hover:border-b-4 ${!white ? ' hover:border-blue-500' : ' hover:border-white'}`}>{label}</a>
    </li>
);
}

interface DropdownProps {
name: string;
options: DropdownItemProps[];
white?: boolean;
fix?: boolean;
}
function Dropdown({ name, options, white, fix}: DropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [position, setPosition] = useState({ left: 0, top: 0 });
    const toggleDropdown = () => {
      
      setIsOpen((prevIsOpen) => !prevIsOpen);
    };
    const handleMouseEnter = (e:any) => {
      const rect = e.target.getBoundingClientRect();
      setPosition({
        left: rect.left,
        top: rect.top,
      });
      toggleDropdown();
    }
  
    return (
      <div className="">
        <button
          onMouseEnter={handleMouseEnter}
          onMouseLeave={toggleDropdown}
          className={`px-4 py-4 focus:outline-none flex flex-row items-center ${white ? 'text-black' : 'text-white'}`}
        >
          {name}
          <BiChevronDown size={20} className={`${isOpen && 'rotate-180'}`} />
        </button>
        {isOpen && (
          <div className={`w-full absolute flex flex-col ${!white? 'bg-white' : 'bg-blue-400'} left-0 pb-8 shadow-xl` }
          onMouseEnter={toggleDropdown}
            onMouseLeave={toggleDropdown}>
              <div className={`${!white ? '' : 'bg-white'} ${!fix ? 'bg-blue-400':'bg-blue-500'} h-4`}></div>
            <div
            className="relative"
            
            style={{ left: position.left, top: position.top }}
          >
            <ul className="">
              {options.map((option, index) => (
                <DropdownItem key={index} path={option.path} label={option.label} white={white} />
              ))}
            </ul>
          </div>

          </div>
          
        )}
      </div>
    );
  }
  const dropdowns: { name: string, options: DropdownItemProps[] }[] = [
    {
      name: 'About',
      options: [
        { label: 'AELI', path: '/aeli' },
        { label: 'Experiental Learning', path: '/el' },
        { label: 'Dewan Pengurus Pusat', path: '/dpp' },

      ],
    },
    {
      name: 'Services',
      options: [
        // Data dropdown untuk LAYANAN
        { label: '#', path: '/about' },
        { label: '#', path: '/a' },
        { label: '#', path: '/a' },
        { label: '#', path: '/a' },
      ],
    },
    {
        name: 'Community',
        options: [
          { label: 'Forum', path: '/forum' },
          { label: 'Diskusi', path: '/diskusi' },
          { label: '#', path: '/a' },
          { label: '#', path: '/a' },
        ],
      },
  ];

function Navbar(){
  const [fix, setFix] = useState(false);
  const [white, setWhite] = useState(false);
  function setWhited(){
    if(window.scrollY > 560){
      setWhite(true);
    }else{
      setWhite(false);
    }
  }
  function setFixed(){
   
      if(window.scrollY > 560){
        setFix(true);
      }else{
        setFix(false);
      }
  
    
   
  }
  useEffect(()=>{
    window.addEventListener('scroll', setFixed);
    window.addEventListener('scroll', setWhited);
  },[])
    return(
      <div className=''>
        <div className={`shadow-sm fixed z-[9999] flex justify-between flex-row w-full text-black  px-10 py-4 items-center
        ${fix ? 'bg-white' : 'bg-blue-400'}
        ${white ? 'bg-white' : ''}`} >
            <Link href="/" className=' flex flex-row gap-[calc(1/4*50px)] items-center justify-center'>
                {!white ? <Image width={50} height={50} className='w-[50px] h-[50px]' src="/logo-aeli-putih.png" alt="" /> : <Image width={50} height={50} className='w-[50px] h-[50px]' src="/logo-aeli.png" alt="" />}
                <div>
                  <h1 className={`text-[calc(1/4*50px)] ${!white ? 'text-white' : 'text-black'}`}>Asosiasi<br/>Experiental Learning<br/> Indonesia</h1>

                </div>
            </Link>
            <div className={`flex flex-row gap-4 items-center ${!fix ? 'text-white' : 'text-black'}`}>
            {dropdowns.map((dropdown, index) => (
            <Dropdown key={index} name={dropdown.name} options={dropdown.options} white={white} fix={fix}/>
            ))}
            <li>
              <Link href="">Blog</Link>
            </li>
            </div>
            
            <li><Link href="" className={` py-2 px-3 ${!white ? 'text-black bg-white' : 'text-white bg-blue-500'}`}>Sign In</Link></li>
            
        </div>
        
      </div>
        
        
    )
}
export default Navbar;
