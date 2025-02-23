import React from 'react'
import useMobile from '../hooks/useMobile'

import Search from './Search'
const Header = () => {
  const [isMobile] = useMobile()
  const isSearchPage = location.pathname === "/search"
  return (
    <header className='h-24 lg:h-20 lg:shadow-md sticky top-0 flex flex-col  justify-center gap-1 bg-white'>


      {
        !(isSearchPage && isMobile) && (
          <div className='container mx-auto flex items-center px-2  justify-between'></div>
        )
      }
      <div className='hidden lg:block'>
        <Search />
      </div>

    </header>
  )
}

export default Header