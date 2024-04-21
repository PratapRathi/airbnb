"use client"
import Container from '@/app/components/Container'
import Logo from '@/app/components/navbar/Logo'
import Search from '@/app/components/navbar/Search'
import UserMenu from './UserMenu'
import { User } from '@prisma/client'
import Categories from '@/app/components/navbar/Categories'
import { Suspense } from 'react'

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
            <Suspense>
              <Search />
            </Suspense>
            <UserMenu currentUser={currentUser} />
          </div>
        </Container>
      </div>
      <hr />
      <Suspense>
        <Categories />
      </Suspense>
    </div>
  )
}

export default Navbar
