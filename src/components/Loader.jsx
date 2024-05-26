import '@/../css/loader.css';
const Loader = () => {
    return (
        <div className='bg-transparent z-50 flex items-center justify-center absolute left-0 right-0'>
            <span className="loader"></span>
        </div>
    );
};

export default Loader;