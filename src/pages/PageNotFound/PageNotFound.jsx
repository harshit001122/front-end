import { Link } from 'react-router-dom';

const PagesNotfound = () => {
  return (
    <div className='min-h-screen flex flex-col justify-center items-center bg-gray-100 py-20'>
      <div className="text-center">
        <h1 className="mb-4 text-8xl font-bold text-gray-800">404</h1>
        <p className="mb-8 text-gray-600 text-xl">Oops! The page you're looking for doesn't exist.</p>
        <div className="animate-pulse">
          <svg className="mx-auto h-24 w-24 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
          </svg>
        </div>
        <p className="mt-8 text-gray-600 text-xl font-medium">Navigate back to 
          <Link to="/" className="ml-1 text-blue-500 hover:underline">home</Link>.
        </p>
      </div>
    </div>
  );
}

export default PagesNotfound;