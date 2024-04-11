"use client"
import Container from '@/app/components/Container'
import Logo from '@/app/components/navbar/Logo'
import Search from '@/app/components/navbar/Search'
import UserMenu from './UserMenu'
import { User } from '@prisma/client'

interface NavbarProps {
  currentUser?: User | null
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
  return (
    <div className='fixed w-full bg-white z-10 shadow-sm'>
      <div className="py-4 border-b-[1]">
        <Container>
          <div className='flex flex-row items-center justify-between gap-3 md:gap-0'>
            <Logo />
            <Search />
            <UserMenu currentUser={currentUser} />
          </div>
        </Container>
      </div>
    </div>
  )
}

export default Navbar
