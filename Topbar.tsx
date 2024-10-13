import  { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../button'
import { useSignOutAccount } from '@/lib/react-query/queriesAndMutations'
import { useUserContext } from '@/context/AuthContext'

// const Topbar = () => {
//   const { mutate: signOut, isSuccess } = useSignOutAccount();
//   const navigate = useNavigate();
//   const { user } = useUserContext();

//   useEffect( () => {
//     if (isSuccess) navigate(0) ;
//   }, [isSuccess])

//   return (

//     <section className='topbar m-2 rounded-tl-[20px] rounded-tr-[150px] rounded-br-[150px] rounded-bl-[190px]'>
//         <div
//          className='flex-between py-4 px-5 w-screen h-23 mt-10 '
//         >
//             <Link to='/' className='visible flex gap-3 items-center '>
//                 <img 
//                 src="public/assets/images/logo-small.png"
//                 alt="logo"
//                  width= {130}
//                  height={325}
//                 />
//             </Link>

//             <div className="flex gap-4 mr-5">
//               <Button variant='ghost' className='shad-button_ghost' onClick={ () => signOut}>
//                 <img src="/assets/icons/logout.svg" alt="logout" width={50} />
//               </Button>
//               <Link to={`/profile/${user.id}` } className="flex-center gap-3">
//                   <img 
//                   src={user.imageUrl || '/assets/icons/profile-placeholder.svg'} 
//                   alt="profile-placeholder"
//                   className='h-12 w-12 mr-4 rounded-full'
//                   />
//               </Link>
//             </div>
//         </div>
//     </section>
//   )
// }

// export default Topbar

const Topbar = () => {
  const { mutate: signOut, isSuccess } = useSignOutAccount();

  const navigate = useNavigate();
  const { user } = useUserContext();

  useEffect(() => {
    if (isSuccess) {
      navigate(0);
    }
  }, [isSuccess]);

  return (
    <section className="topbar">
      <div className="flex-between py-4 px-5">
        <Link to="/" className="flex gap-3 items-center">
          <img 
            src="/public/assets/images/logo-small.png"
            alt="logo"
            width={130}
            height={325} 
          />
        </Link>
        <div className='flex-between py-4 px-5'>
        <Link to="/" className="flex gap-3 items-center">
          <img 
            src="/public/assets/icons/logo-topbar.png"
            alt="logo"
            width={130}
            height={325} 
          />
        </Link>
        </div>

        <div className="flex gap-4">
          <Button
            variant="ghost"
            className="shad-button_ghost"
            onClick={() => signOut()}
          >
            <img src="/assets/icons/logout.svg" alt="logout" />
          </Button>
          <Link to={`/profile/${user.id}`} className="flex-center gap-3">
            <img
              src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
              alt="profile"
              className="h-8 w-8 rounded-full"
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Topbar;
