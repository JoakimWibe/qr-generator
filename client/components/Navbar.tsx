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


const Navbar = async () => { 
  const session = await auth();
  
  return (
    <header className='px-5 py-3 shadow-sm'>
        <nav className='flex justify-between items-center'>
            <Link className='text-2xl font-bold' href='/'>QR Generator</Link>


            <div className='flex items-center gap-5 text-black'>
            <ModeToggle />    
            {session && session?.expires ? (
                <>
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <User />
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
                                <Link href={`/user/${session?.user?.id}`}>
                                    My Account
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Link href={`/saved-qr-codes`}>
                                    Saved QR codes
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <form action={async () => {
                                    "use server"
                        
                                    await signOut({redirectTo: '/'})
                                }}>
                                    <button className='flex items-center gap-2' type='submit'><LogOut/>Sign out</button>
                                </form>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </>
            ) : (
                <DropdownMenu>
                    <DropdownMenuTrigger className='justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 flex gap-2 items-center h-9 px-4 py-2 bg-primary text-primary-foreground shadow hover:bg-primary/90'>
                      <LogIn/>Sign in
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>
                            Providers
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <form action={async () => {
                                "use server"

                                await signIn('google')
                                }}>
                                <button className='flex gap-2 items-center' type='submit'>
                                    <FaGoogle />
                                    Google
                                </button>
                            </form>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <form action={async () => {
                                "use server"

                                await signIn('github')
                                }}>
                               <button className='flex gap-2 items-center' type='submit'>
                                    <FaGithub />
                                    GitHub
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