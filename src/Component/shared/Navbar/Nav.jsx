import { useState } from 'react';
import logo from './../../../assets/sportclub-logo.jpg';
import DynamicLink from './DynamicLink';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router';
import Container from '../layout/Container/Container';
import { AuthContext } from '../context/AuthContext';


const navigationData = [
    {
        id: 1,
        name: "Home",
        path: "/",
    },
    {
        id: 2,
        name: "Add Food Items",
        path: "/add-food-items",
    },

    {
        id: 3,
        name: "Fridge",
        path: "/fridge",
    },
    {
        id: 4,
        name: "My Items",
        path: "/my-listing",
    },


];

const Nav = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const links = navigationData.map((route) => <DynamicLink key={route.id} route={route} />)
  
    

   

   
    return (
        <div className='bg-white text-[#24ab63]  relative shadow-md ' >
            <Container>
                <nav className='container mx-auto flex flex-row  justify-between md:gap-10 lg:gap-2  '>
                    <div className='relative flex gap-2 items-center p-3' onClick={() => setMenuOpen(!menuOpen)}>
                        {
                            menuOpen ?
                                <X className='lg:hidden text-[#24ab63] ' /> :
                                <Menu className='lg:hidden text-[#24ab63]' size={20} />
                        }
                        {/* Mobile Responsive */}
                        <ul className={`lg:hidden  absolute z-10  py-2 
                     ${menuOpen ? 'top-19 md:top-23 left-0' : '-top-80 mt-0'} bg-[#24ab63] text-white font-semibold `}>

                            <div className=''>
                                {links}
                            </div>
                        </ul>

                        {/* Logo */}

                        <div className='flex items-center justify-center gap-2 md:gap-3 '>
                             <img src={logo}
                                alt="sportclub-Logo"
                                className='w-[30px] md:w-[70px]' />
                           <Link to="/">
                            <h3 className='font-bold text-[16px] md:text-2xl text-black'>FoodExp.</h3>
                           </Link>
                        </div>
                    </div>
                    {/* NavLINK */}
                    <ul className='hidden lg:flex gap-3 md:gap-5 text-xl lg:text-[16px] items-center '>
                        {links}

                    </ul>
                    {/*Conditional  Login button */}
                    <div className='px-2 py-5 items-center'>
                          
                                <div className='flex gap-2 '>
                                    <Link to="/login">
                                        <button
                                            className='btn border border-none bg-[#24ab63] text-white text-sm md:text-xl lg:text-sm py-2 lg:py-2 px-3 md:px-5 rounded-lg '>
                                            Login</button>
                                    </Link>
                                    <Link to="/sign-up">
                                        <button
                                            className='btn border border-none bg-[#24ab63] text-white text-sm md:text-xl lg:text-sm py-2 lg:py-2 px-3 md:px-5 rounded-lg '>
                                            Sign Up</button>
                                    </Link>
                                </div>
                               
                    </div>
                </nav>
            </Container>

        </div>
    );
};

export default Nav;