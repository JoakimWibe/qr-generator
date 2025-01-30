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
import { User } from 'lucide-react';
import { FaGoogle, FaGithub } from "react-icons/fa";

const Navbar = async () => { 
  const session = await auth();

  return (
    <header className='px-5 py-3 bg-white shadow-sm'>
        <nav className='flex justify-between items-center'>
            <Link className='text-2xl font-bold' href='/'>QR Generator</Link>


            <div className='flex items-center gap-5 text-black'>
            {session && session?.expires ? (
                <>
                    <form action={async () => {
                        "use server"
                        
                        await signOut({redirectTo: '/'})
                    }}>
                        <button type='submit'>Logout</button>
                    </form>
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <User />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>{session?.user?.name}</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                            <Link href={`/user/${session?.user?.id}`}>
                                My Account
                            </Link>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </>
            ) : (
                <DropdownMenu>
                    <DropdownMenuTrigger>Sign in</DropdownMenuTrigger>
                    <DropdownMenuContent>
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