import React from 'react'
import Link from 'next/link'

const Header = () => {
  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
            <h1 className="text-2xl font-bold">Bulletin Board</h1>
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link href="/" className="hover:text-gray-300">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-gray-300">
                About
              </Link>
            </li>
            <li>
              <Link 
                href="/bbs-posts/create" 
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              >
                Create Post
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header
