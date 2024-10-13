import { bottombarLinks } from '@/constants';
import { Link, useLocation } from 'react-router-dom'
const Bottombar = () => {
  const { pathname } = useLocation();

  return (
    <section className="bottom-bar">
       {bottombarLinks.map((link) => {
            const isActive = pathname == link.route;
            return (
                <Link to={link.route}
                  key={link.label}
                  className={`flex gap-4 items-center p-6 group  ${isActive && 'bg-primary-500 rounded-tr-[25px] rounded-bl-[40px] rounded-tl-[7px] '
                  } flex-center flex-col tracking-wide gap-1 py-4 transition `}
                >

                  <img
                    src={link.imgURL}
                    alt="link-label"
                    height={20}
                    width={30}

                    className={`group-hover:invert-white ${isActive && 'invert-white'
                      }`}
                  />
                  <p className='tiny-medium text-light-2'>{link.label}</p>
                </Link>
            )

          })}

    </section>
  )
}

export default Bottombar