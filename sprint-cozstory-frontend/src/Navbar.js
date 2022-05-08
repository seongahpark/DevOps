import { Link } from "react-router-dom";

export default function Navbar({ children }) {
  return <div className="sticky top-0 z-40 w-full backdrop-blur flex-none transition-colors duration-500 lg:z-50 lg:border-b lg:border-gray-900/10 dark:border-gray-50/[0.06] bg-white/90 supports-backdrop-blur:bg-white/95 dark:bg-gray-900/75">
    <div className="max-w-8xl mx-auto">
      <div className="py-4 border-b border-gray-900/10 lg:px-8 lg:border-0 dark:border-gray-300/10 px-4 lg:mx-0">
        <div className="relative flex items-center">
          <Link to="/" className="mr-3 flex-none overflow-hidden md:w-auto">
            <span className="sr-only">CozStory</span>
            <img src="/logo.svg" alt="CozStory" />
          </Link>
          <Link to="/">
            <span className="relative text-xl font-bold text-indigo-800">CozStory</span>
          </Link>
          <div className="relative lg:flex items-center ml-auto">
            <nav className="text-sm leading-6 font-semibold text-gray-700 dark:text-gray-200">
              {children}
            </nav>
          </div>
        </div>
      </div>
    </div>
  </div>
}