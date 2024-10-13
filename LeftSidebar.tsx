
import { useEffect } from 'react'
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom'
import { Button } from '../button'
import { useSignOutAccount } from '@/lib/react-query/queriesAndMutations'
import { useUserContext } from '@/context/AuthContext'
import { sidebarLinks } from '@/constants'
import { INavLink } from '@/types'


const LeftSidebar = () => {
  const { mutate: signOut, isSuccess } = useSignOutAccount();
  const navigate = useNavigate();
  const { user } = useUserContext();
  const { pathname } = useLocation();

  useEffect(() => {
    if (isSuccess) navigate(0);
  }, [isSuccess])

  return (
    <nav className='ml-4 mb-2 mt-2 leftsidebar rounded-tl-[20px] rounded-tr-[180px] rounded-br-[30px] rounded-bl-[120px]'>
      <div className='flex flex-col gap-11'>
        <Link to='/' className='visible flex gap-3 items-center'>
          <img
            src="assets/images/logo.png"
            alt="logo"
            width={280}
            height={50}
          />
        </Link>

        <Link to={` /profile/${user.id}`} className='flex gap-3 items-center'>
          <img
            src={user.imageUrl || "/public/assets/icons/profile-placeholder.svg"}
            alt="profile"
            className='h-20 w-20 rounded-full'
          />

          <div className="flex flex-col">
            <p className='body-bold'>
              {user.name}
            </p>
            <p className='small-regular text-light-3'>
              @{user.username}
            </p>

          </div>
        </Link>
        <ul className='flex flex-col gap-6 '>
          {sidebarLinks.map((link: INavLink) => {
            const isActive = pathname == link.route;
            return (
              <li key={link.label}
                className={`leftsidebar-link group ${isActive && 'bg-primary-500 '
                  }`}>
                <NavLink to={link.route}
                  className='flex gap-4 items-center p-4 '
                >

                  <img
                    src={link.imgURL}
                    alt="link-label"
                    className={`group-hover:invert-white ${isActive && 'invert-white'
                      }`}
                  />
                  
                  {link.label}
                  
                </NavLink>
                
              </li>
              
            )

          })}
        </ul>
      </div>
      <Button variant='ghost' className='shad-button_ghost' onClick={() => signOut}>
        <img src="/assets/icons/logout.svg" alt="logout" width={35} />
        <p className="small-medium lg:base-medium">LogOut</p>
      </Button>

    </nav>
  )
}

export default LeftSidebar