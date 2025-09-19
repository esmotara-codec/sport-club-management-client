
import { Link } from 'react-router';

const ErrorElement = () => {
    return (
        <div className='bg-white min-h-screen text-black'> 
            <div className=' container mx-auto  md:p-10 py-3  text-center items-center '>
                <div className='flex flex-col justify-center items-center  gap-3'>
                    <img src="" alt="" />
                    <h1 className='text-red-400 text-2xl md:text-3xl font-bold '>404 Page Not Found</h1>
                    <p className='text-gray-600 px-3'>Opps the page you are looking for doesn't exits.</p>
                    <Link to={'/'}> <button className='btn bg-[#2596be] text-white border border-[#0EA106]/20 text-center  md:text-xl font-semibold px-5 md:px-10 py-2 rounded-s-md shadow-none '>Go Back Home</button>

                    </Link>
                </div>
            </div>


        </div>
    );
};

export default ErrorElement;