import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { BiChevronDown } from 'react-icons/bi';
import Image from 'next/image';
import classnames from 'classnames';

interface DropdownItemProps {
  path: string;
  label: string;
  white?: boolean;
}

function DropdownItem({ path, label, white }: DropdownItemProps) {
  return (
    <li className={classnames('px-4 py-2', !white ? 'bg-white text-blue-500' : 'bg-blue-400 text-white')}>
      <a href={path} className={classnames('hover:border-b-4', !white ? 'hover:border-blue-500' : 'hover:border-white')}>
        {label}
      </a>
    </li>
  );
}

interface DropdownProps {
  name: string;
  options: DropdownItemProps[];
  white?: boolean;
  fix?: boolean;
}

function Dropdown({ name, options, white, fix }: DropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [position, setPosition] = useState({ left: 0, top: 0 });
  
    const toggleDropdown = () => {
      setIsOpen(!isOpen);
    };
  
    const handleMouseEnter = (e: any) => {
      const rect = e.target.getBoundingClientRect();
      setPosition({
        left: rect.left,
        top: rect.bottom, // Ganti ke rect.bottom agar dropdown muncul di bawah tombol
      });
      toggleDropdown();
    };
  
    const handleMouseLeave = () => {
      setIsOpen(false);
    };
  
    return (
      <div className="relative">
        <button
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={classnames(
            'px-4 py-8 focus:outline-none flex flex-row items-center',
            white ? 'text-black' : 'text-white'
          )}
        >
          {name}
          <BiChevronDown size={20} className={classnames({ 'rotate-180': isOpen })} />
        </button>
        {isOpen && (
          <div
            className={classnames(
              'absolute flex flex-col',
              !white ? 'bg-white' : 'bg-blue-400',
              'py-4 shadow-xl'
            )}
            style={{ left: position.left, top: position.top }} // Ganti ke position.top agar dropdown muncul di bawah tombol
            onMouseEnter={toggleDropdown}
            onMouseLeave={toggleDropdown}
          >
            <ul>
              {options.map((option, index) => (
                <DropdownItem key={index} path={option.path} label={option.label} white={white} />
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }
  
interface NavbarProps {
  className: string;
}

function Navbar({ className }: NavbarProps) {
  const [fix, setFix] = useState(false);
  const [white, setWhite] = useState(false);

  const handleScroll = () => {
    const isScrolled = window.scrollY > 560;
    setFix(isScrolled);
    setWhite(isScrolled);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
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

  return (
    <div>
      <div className={classnames('w-full px-10 items-center bg-white', 'py-8 opacity-0')}>
        <h1>navbar</h1>
      </div>
      <div
        className={classnames(
          'fixed z-[9999] top-0 flex justify-between flex-row w-full px-10 items-center',
          fix ? 'bg-white shadow-lg' : 'bg-blue-400 shadow-sm',
          white ? 'bg-white' : 'text-white'
        )}
      >
        {/* Logo dan judul */}
        <Link href="/" className="flex flex-row gap-[calc(1/4*50px)] items-center justify-center">
          <Image
            width={50}
            height={50}
            className="w-[50px] h-[50px]"
            src={white ? '/logo-aeli.png' : '/logo-aeli-putih.png'}
            alt=""
          />
          <div>
            <h1 className={classnames('text-[calc(1/4*50px)]', white ? 'text-black' : 'text-white')}>
              Asosiasi<br />Experiential Learning<br /> Indonesia
            </h1>
          </div>
        </Link>

        {/* Dropdown menu dan tautan Blog */}
        <div className={classnames('flex flex-row gap-4 items-center', fix ? 'text-black' : 'text-white')}>
          {dropdowns.map((dropdown, index) => (
            <Dropdown key={index} name={dropdown.name} options={dropdown.options} white={white} fix={fix} />
          ))}
          <li>
            <Link href="blog">Blog</Link>
          </li>
        </div>

        {/* Tautan Sign In */}
        <li>
          <Link
            href=""
            className={classnames('py-2 px-3', white ? 'text-white bg-blue-500' : 'text-black bg-white')}>
            Sign In
          </Link>
        </li>
      </div>
    </div>
  );
}

interface NavbarContainerProps {
  className: string;
}

function NavbarContainer({ className }: NavbarContainerProps) {
  return (
    <div>
      <div className={`w-full text-black px-10 items-center bg-white py-8 opacity-0 ${className}`}>
        <h1>navbar</h1>
      </div>
      <Navbar className={className} />
    </div>
  );
}

export default NavbarContainer;

         
