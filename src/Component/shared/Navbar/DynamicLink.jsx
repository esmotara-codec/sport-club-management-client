import { NavLink } from 'react-router';

const DynamicLink = ({route}) => {
    return (
        <div>
            
            <li className='px-3 p-2'>
                <NavLink to={route.path}
                    className={({ isActive }) =>
                        `block px-2 py-1 rounded transition-colors hover:bg-gray-200 ${isActive ? "font-bold text-[#24ab63]" : " "
                        }`
                    }
                >{route.name}</NavLink>
            </li>
            
        </div>
    );
};

export default DynamicLink;