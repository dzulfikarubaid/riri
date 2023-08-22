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
    <li className={`px-4 py-2 ${!white ? ' text-blue-500' : ' text-white'}`}>
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
    const handleMouseEnter = (e: any) => {
      const rect = e.target.getBoundingClientRect();
      const dropdownHeight = 100;
      setPosition({
        left: rect.left - 20,
        top: rect.bottom - dropdownHeight, // Ganti ke rect.bottom dan tambahkan window.scrollY
      });
      toggleDropdown();
    };
    
  
    return (
      <div className="">
        <button
          onMouseEnter={handleMouseEnter}
          onMouseLeave={toggleDropdown}
          className={`py-8 focus:outline-none flex flex-row items-center ${white ? 'text-black' : 'text-white'}`}
        >
          {name}
          <BiChevronDown size={20} className={`${isOpen && 'rotate-180'}`} />
        </button>
        {isOpen && (
          <div className={`w-full absolute flex flex-col ${!white? 'bg-white' : 'bg-blue-400'} left-0 py-4 shadow-xl` }
          onMouseEnter={toggleDropdown}
          onMouseLeave={toggleDropdown}>
            <div className="relative" style={{ left: position.left, top: position.top }}>
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
        { label: 'Experiential Learning', path: '/el' },
        { label: 'Dewan Pengurus Pusat', path: '/dpp' },
        { label: 'Dewan Perwakilan Daerah', path:'/dpd'}

      ],
    },
    {
      name: 'Network',
      options: [
        { label: '#', path: '/about' },
        { label: '#', path: '/a' },
        { label: '#', path: '/a' },
        { label: '#', path: '/a' },
      ],
    },
    {
        name: 'Activities',
        options: [
          { label: '#', path: '/a' },
          { label: '#', path: '/a' },
        ],
      },
  ];

function Navbar(props:any){
  const [fix, setFix] = useState(false);
  const [white, setWhite] = useState(false);
  const {className} = props
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
        
        <div className={`fixed ${className} z-[9999] top-0 flex justify-between flex-row w-full text-black  px-10  items-center
        ${fix ? '' : 'bg-blue-400'}
        ${white ? 'bg-white shadow-sm' : 'shadow-sm '}`} >
            <Link href="/" className=' flex flex-row gap-[calc(1/4*50px)] items-center justify-center'>
                {!white ? <Image width={50} height={50} className='w-[50px] h-[50px]' src="/logo-aeli-putih.png" alt="" /> : <Image width={50} height={50} className='w-[50px] h-[50px]' src="/logo-aeli.png" alt="" />}
                <div>
                  <h1 className={`text-[calc(1/4*50px)] ${!white ? 'text-white' : 'text-black'}`}>Asosiasi<br/>Experiential Learning<br/> Indonesia</h1>

                </div>
            </Link>
            <div className={`flex flex-row gap-8 items-center ${!fix ? 'text-white' : 'text-black'}`}>
            {dropdowns.map((dropdown, index) => (
              <Dropdown key={index} name={dropdown.name} options={dropdown.options} white={white} fix={fix}/>
            ))}
              <Link href="/articles">Articles</Link>
              <Link href="/news">News</Link>
            </div>
            
            <li><Link href="/signin" className={` py-2 px-3 ${!white ? 'text-black bg-white hover:bg-gray-100' : 'text-white bg-blue-500 hover:bg-blue-600'}`}>Sign In</Link></li>
            
        </div>
        
      </div>
        
        
    )
}
export default Navbar;
