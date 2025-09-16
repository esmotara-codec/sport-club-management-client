import { useContext, useState } from 'react';
import logo from './../../../assets/sportclub-logo.jpg';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router';
import DynamicLink from './DynamicLink';
import Container from '../../layout/Container';
import { AuthContext } from '../../Context/AuthContext';


const navigationData = [
    {
        id: 1,
        name: "Home",
        path: "/",
    },
    {
        id: 2,
        name: "Courts",
        path: "/c",
    },
  
];

const Nav = () => {
    const { user, signOutUser}= useContext(AuthContext);
    const [showDropdown, setShowDropdown] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const links = navigationData.map((route) => <DynamicLink key={route.id} route={route} />)



     const handleSignOut = () => {
        signOutUser()
            .then(() => {
                console.log("Sign out successfully");
            })
            .catch((error) => {
                console.log(error);
            })
    }
   
    return (
        <div className='bg-white text-[#108ac2] relative shadow-md'>
            <Container>
                <nav className='flex items-center justify-between py-2'>
                    {/* Left Section: Mobile Menu + Logo */}
                    <div className='flex items-center gap-3'>
                        {/* Mobile Menu Toggle */}
                        <div className='lg:hidden' onClick={() => setMenuOpen(!menuOpen)}>
                            {menuOpen ? 
                                <X className='text-[#108ac2] cursor-pointer' size={24} /> :
                                <Menu className='text-[#108ac2] cursor-pointer' size={24} />
                            }
                        </div>

                        {/* Logo */}
                        <Link to="/" className='flex items-center gap-2'>
                            <img 
                                src={logo}
                                alt="sportclub-Logo"
                                className='w-10 h-10 md:w-12 md:h-12 object-cover' 
                            />
                            <h3 className='font-bold text-lg md:text-xl text-black'>SportClub</h3>
                        </Link>
                    </div>

                    {/* Center Section: Desktop Navigation */}
                    <ul className='hidden lg:flex items-center gap-8'>
                        {links}
                        

                    </ul>

                    {/* Right Section: Auth Buttons */}
                    <div className='hidden md:flex items-center gap-2'>
                       { !user ? (
                        <div className='flex gap-2'>
                             <Link to="/login">
                            <button className='bg-[#108ac2] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#0e7aa8] transition-colors cursor-pointer'>
                                Login
                            </button>
                        </Link>
                        <Link to="/sign-up">
                            <button className='bg-[#108ac2] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#0e7aa8] transition-colors'>
                                Sign Up
                            </button>
                        </Link>
                        </div>
                       ) 
                       : (
                         <div className='relative'>
                                        <div className='flex items-center gap-3'>
                                            <div
                                                className='relative cursor-pointer'
                                                onClick={() => setShowDropdown(!showDropdown)}
                                            >
                                                <img
                                                    src={user.photoURL || '/default-avatar.png'}
                                                    alt="User Avatar"
                                                    className='w-8 h-8 md:w-10 md:h-10 rounded-full object-cover'
                                                    title={user.displayName || user.name || 'User'}
                                                />
                                            </div>
                                            
                                        </div>

                                        {/* DropDown box */}
                                        {showDropdown && (
                                            <div className='absolute top-12 right-0 bg-white border border-gray-200 rounded-lg shadow-lg p-4 w-[300px] z-10'>
                                                <div className='text-sm text-gray-600  mb-2'>
                                                    <strong>User Email:</strong>
                                                </div>
                                                <div className='text-sm text-gray-800 mb-3'>
                                                    {user.email}
                                                </div>
                                                <button
                                                    onClick={() => {
                                                        setShowDropdown(false);
                                                        handleSignOut();
                                                    }}
                                                    className='w-full btn border border-none bg-[#108ac2] text-white text-sm py-2 px-3 rounded-lg  transition-colors'
                                                >
                                                    Logout
                                                </button>
                                            </div>
                                        )}
                                    </div>

                       )
                       }

                    </div>

                    {/* Mobile Navigation Menu */}
                    <ul className={`lg:hidden absolute top-full left-0 right-0 bg-[#108ac2] text-white font-semibold shadow-lg z-50 transition-all duration-300 ${
                        menuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                    }`}>
                        <div className='pt-4 '>
                            {links}
                        </div>
                        <div className='p-1 py-2'>
                             <Link to="/login">
                            <button className='bg-[#108ac2] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#0e7aa8] transition-colors'>
                                Login
                            </button>
                        </Link>
                        </div>
                    </ul>
                </nav>
            </Container>
        </div>
    );
};

export default Nav;