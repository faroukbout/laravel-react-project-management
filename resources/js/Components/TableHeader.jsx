import { ChevronUpDownIcon } from '@heroicons/react/24/solid'
import { Children } from 'react'

export default function TableHeader({name , children, sort_field = null,sort_direction = null, sortChanged = () =>{}}) {
    
  return (
    <th onClick={(e) => sortChanged(name)} className=''>
    <div className='px-3 py-3 text-gray-700 flex items-center justify-between cursor-pointer'>
    {children}
    <ChevronUpDownIcon className='size-6 w4'/>
    </div> 
    
</th>
  )
}
