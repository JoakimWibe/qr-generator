'use client';

import Link from 'next/link';
import { ModeToggle } from './ui/ModeToggle';

const Navbar = () => { 
  
  return (
    <header className='px-5 py-3 shadow-sm'>
        <nav className='flex justify-between items-center'>
            <Link className='text-2xl font-bold theme-text theme-hover' href='/'>QR Generator</Link>

            <ModeToggle />    
        </nav>
    </header>
  )
}

export default Navbar