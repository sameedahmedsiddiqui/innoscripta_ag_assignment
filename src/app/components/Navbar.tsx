import { NavLink } from "react-router-dom"

const routesData = [
  {
    url: '/',
    routeName: 'Home'
  },
  {
    url: 'feed',
    routeName: 'News Feed'
  },
  {
    url: 'settings',
    routeName: 'Settings'
  },
]

export const Navbar = () => {
  return (
    <div className='container py-10 flex px-5'>
      <nav className='flex justify-start w-full xs:gap-5 gap-10 xs:text-sm text-xl'>
        {routesData?.map((x) => (
          <NavLink to={x.url} >
          {({isActive}) => (
            <span className={`p-3 ${isActive ? 'bg-blue-600 rounded' : ''}`}>{x.routeName}</span>
          )}
          </NavLink>
        ))}
      </nav>
    </div>
  )
}