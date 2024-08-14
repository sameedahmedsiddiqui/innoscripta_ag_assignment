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
    <div className='container py-10 flex'>
      <nav className='flex justify-start w-full gap-10 text-xl'>
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