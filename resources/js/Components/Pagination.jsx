import { Link } from '@inertiajs/react'
import React from 'react'

export default function Pagination({links}) {
  return (
    <nav className='text-center mt-3'>
        {links.map(link => (
            <Link 
            preserveScroll
            href={link.url || ""}
            key={link.label}
            className={"inline-block py-2 px-3 rounded-lg text-gray-800 text-xs " + 
                (link.active ? "bg-gray-300 " : " ") +  (!link.url ? "!text-gray-500 cursor-not-allowed " : "hover:bg-gray-300")
            }
            dangerouslySetInnerHTML={{__html: link.label}}>
            
            </Link>
        ))}
    </nav>
  )
}
