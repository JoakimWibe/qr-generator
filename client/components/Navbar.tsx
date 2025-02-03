import { auth, signIn, signOut } from '@/auth';
import Link from 'next/link';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogIn, LogOut, User } from 'lucide-react';
import { FaGoogle, FaGithub } from "react-icons/fa";
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { ModeToggle } from './ui/ModeToggle';
import { Button } from './ui/button';

const Navbar = async () => { 
  const session = await auth();
  
  return (
    <header className='px-5 py-3 shadow-sm'>
        <nav className='flex justify-between items-center'>
            <Link className='text-2xl font-bold theme-text theme-hover' href='/'>QR Generator</Link>

            <div className='flex items-center gap-5'>
                <ModeToggle />    
                {session && session?.expires ? (
                    <>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="theme-icon">
                                    <User className="h-6 w-6" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuLabel className='flex items-center gap-3'>
                                    {session?.user?.name}
                                    <Avatar className='h-7 w-auto'>
                                        <AvatarImage src={session?.user?.image ?? undefined} alt={`Avatar for ${session?.user?.name}`} />
                                    </Avatar>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <Link href={`/saved-qr-codes`}>
                                        Saved QR codes
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <form action={async () => {
                                        'use server'
                                        await signOut()
                                    }}>
                                        <button className='w-full flex items-center gap-2'>
                                        <LogOut className="h-5 w-5 theme-icon" />
                                        Sign Out
                                    </button>
                                    </form>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </>
                ) : (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="theme-icon">
                                <LogIn className="h-6 w-6" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>Sign In</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <form action={async () => {
                                    'use server'
                                    await signIn('google')
                                }} className='w-full'>
                                    <button className='w-full flex items-center gap-2'>
                                    <FaGoogle className="h-5 w-5 theme-icon" />
                                    Sign in with Google
                                </button>
                                </form>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <form action={async () => {
                                    'use server'
                                    await signIn('github')
                                }} className='w-full'>
                                    <button className='w-full flex items-center gap-2'>
                                    <FaGithub className="h-5 w-5 theme-icon" />
                                    Sign in with Github
                                </button>
                                </form>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )}
            </div>
        </nav>
    </header>
  )
}

export default Navbar