import React from 'react'
import { NavLink } from 'react-router-dom'

const links = [
    {url: '/search', text:'🔎 All'},
    {url: '/news', text:'📰 News'},
    // {url: '/images', text:'📷 Images'},
]

const Links = () => {
  return (
    <div className='flex sm:justify-around justify-between items-center mt-4'>
        {links.map((items, index) => (
            <NavLink key={index} to={items.url} activeClassName="text-blue-700 border-b-2 dark:text-blue-300 border-blue-700 pb-2" className='pl-2 pr-4 mb-0'>
                {items.text}
            </NavLink>
        ))}
    </div>
  )
}

export default Links
