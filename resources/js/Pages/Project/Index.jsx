import Pagination from '@/Components/Pagination'
import { PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP } from '@/Constants'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, Link } from '@inertiajs/react'
import React from 'react'

export default function Index({auth,projects}) {
    
  return (
    <AuthenticatedLayout
    header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800">
            Projects
        </h2>
    }>
        <Head title="Projects" />

        <div className="py-12">
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                    <div className="p-6 text-gray-900">
                        
                        <table className='w-full text-sm text-left rtl:text-right '>
                            <thead className='text-xs  uppercase bg-gray-100  border-b-2'>
                                <tr className='text-nowrap'>
                                    <th className='px-3 py-3 text-gray-700'>Id</th>
                                    <th className='px-3 py-3 text-gray-700'>Image</th>
                                    <th className='px-3 py-3 text-gray-700'>Name</th>
                                    <th className='px-3 py-3 text-gray-700'>Status</th>
                                    <th className='px-3 py-3 text-gray-700'>Created</th>
                                    <th className='px-3 py-3 text-gray-700'>Due Date</th>
                                    <th className='px-3 py-3 text-gray-700'>Created By</th>
                                    <th className='px-3 py-3 text-gray-700 text-center'>Actions</th>
                                </tr>
                            </thead>
                            <tbody className='bg-white'>
                                {projects.data.map((project) => (
                                    <tr className='hover:bg-gray-50 transition ' key={project.id}>
                                        <td className='px-3 py-3 text-gray-800'>{project.id}</td> 
                                        <td className='px-3 py-3 text-gray-800'><img src={project.id} /></td>
                                        <td className='px-3 py-3 text-gray-800'>{project.name}</td>
                                        <td className='px-3 py-3 text-gray-800'>
                                        <span
                                            className={
                                            "px-2 py-1 rounded text-white " +
                                            PROJECT_STATUS_CLASS_MAP[project.status]
                                            }
                                        >{PROJECT_STATUS_TEXT_MAP[project.status]}</span>
                                        </td>
                                        <td className='px-3 py-3 text-gray-800'>{project.created_at}</td>
                                        <td className='px-3 py-3 text-gray-800'>{project.due_date}</td>
                                        <td className='px-3 py-3 text-gray-800'>{project.createdBy.name}</td>
                                        <td className='px-3 py-3 text-gray-800'>
                                            <Link href={route("project.edit",project.id)} className='font-medium text-blue-700 hover:underline mx-1'>Edit</Link>
                                            <Link href={route("project.destroy",project.id)} className='font-medium text-red-700 hover:underline mx-1'>Delete</Link>
                                        </td>
                                    </tr>
                                ))}                               
                            </tbody>
                        </table>   
                        <Pagination links={projects.meta.links}></Pagination>
                    </div>
                </div>
            </div>
        </div>

    </AuthenticatedLayout>
  )
}
