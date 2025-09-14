const Container  = ({children ,className }) => {
    return (
        <div className={`w-full px-[18px] md:px-7 md:py-4 bg-white ${className || '' }`}>
            {children}
        </div>
    );
};

export default Container;
