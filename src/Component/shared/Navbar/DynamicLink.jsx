import { NavLink } from 'react-router';

const DynamicLink = ({ route }) => {
    return (
        <li className="px-3 p-2">
            <NavLink
                to={route.path}
                className={({ isActive }) =>
                    `block px-2 py-1 rounded transition-colors ${
                        isActive
                            ? "font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#108ac2] to-[#0d6fa0]"
                            : "text-transparent bg-clip-text bg-gradient-to-r from-[#108ac2] to-[#0d6fa0] hover:opacity-80"
                    }`
                }
            >
                {route.name}
            </NavLink>
        </li>
    );
};

export default DynamicLink;
