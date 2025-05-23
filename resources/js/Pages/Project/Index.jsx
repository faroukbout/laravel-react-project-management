import Pagination from '@/Components/Pagination'
import SelectInput from '@/Components/SelectInput'
import TextInput from '@/Components/TextInput'
import { PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP } from '@/Constants'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, Link, router } from '@inertiajs/react'
import React from 'react'
import { ChevronUpDownIcon } from '@heroicons/react/24/solid'
import TableHeader from '@/Components/TableHeader'


export default function Index({auth,projects,queryParams = null, success}) {
    queryParams = queryParams || {};
    const searchFieldChanged = (name,value) =>{
        if(value){
            queryParams[name] = value;
        }else{
            delete queryParams[name];
        }

        router.get(route("project.index"),queryParams);
    };

    const onKeyPress = (name,e) => {
        if(e.key !== "Enter") return;
        searchFieldChanged(name,e.target.value);
    }

    const sortChanged = (name) => {
        if(name === queryParams.sort_field) {
            if(queryParams.sort_direction ==="asc"){
                queryParams.sort_direction = "desc";
            }else{
                queryParams.sort_direction = "asc";
            }
        }else{
            queryParams.sort_field = name;
            queryParams.sort_direction = "asc";
        }
        router.get(route("project.index", queryParams));
    }

    const deleteProject = (project) => {
        if(!window.confirm("Delete the project !")){
            return;
        }
        router.delete(route("project.destroy",project.id));
    }

  return (
    <AuthenticatedLayout
    header={
        <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Projects
        </h2>
        <Link href={route("project.create")} className="bg-emerald-700 py-1 px-3 text-white rounded shadow transition-all hover:bg-green-900">New Project</Link>
        </div>
        
    }>
        <Head title="Projects" />
        {success && (<div className='bg-emerald-700 py-2 px-4 text-white rounded text-center'> {success}</div>)}
        <div className="py-12">
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                    <div className="p-6 text-gray-900">
                        <div className="overflow-auto">
                            <table className='w-full text-sm text-left rtl:text-right '>
                        
                            <thead className='text-xs  uppercase bg-gray-100  border-b-2'>
                                <tr className='text-nowrap'>
                                    <th className='px-3 py-3 text-gray-700'>Id</th>
                                    <th className='px-3 py-3 text-gray-700'>Image</th>
                                    <TableHeader 
                                        name="name"
                                        sort_field={queryParams.sort_field}
                                        sort_direction={queryParams.sort_direction}
                                        sortChanged={sortChanged}>Name</TableHeader>
                                    <TableHeader
                                        name="status"
                                        sort_field={queryParams.sort_field}
                                        sort_direction={queryParams.sort_direction}
                                        sortChanged={sortChanged}>Status</TableHeader>
                                    <TableHeader
                                        name="created_at"
                                        sort_field={queryParams.sort_field}
                                        sort_direction={queryParams.sort_direction}
                                        sortChanged={sortChanged}>Created</TableHeader>
                                    <TableHeader 
                                        name="due_date"
                                        sort_field={queryParams.sort_field}
                                        sort_direction={queryParams.sort_direction}
                                        sortChanged={sortChanged}>Due Date</TableHeader>
                                    <th className='px-3 py-3 text-gray-700'>Created By</th>
                                    <th className='px-3 py-3 text-gray-700 text-center'>Actions</th>
                                </tr>
                            </thead>
                            <thead className='text-xs  uppercase bg-gray-100  border-b-2'>
                                <tr className='text-nowrap'>
                                    <th className='px-3 py-3 text-gray-700'></th>
                                    <th className='px-3 py-3 text-gray-700'></th>
                                    <th className='px-3 py-3 text-gray-700'>
                                        <TextInput 
                                        className="w-full"
                                        placeholder="Project Name"
                                        defaultValue={queryParams.name}
                                        onBlur={e => searchFieldChanged('name', e.target.value)
                                        }
                                        onKeyPress={e => onKeyPress('name',e)}
                                        />
                                    </th>
                                    <th className='px-3 py-3 text-gray-700'>
                                        <SelectInput className="w-full"
                                        defaultValue={queryParams.status}
                                        onChange={e => searchFieldChanged('status',e.target.value)}
                                        >
                                            <option value="">Status</option>
                                            <option value="pending">Pending</option>
                                            <option value="in_progress">In Progress</option>
                                            <option value="completed">Completed</option>
                                        </SelectInput>
                                    </th>
                                    <th className='px-3 py-3 text-gray-700'>
                                    </th>
                                    <th className='px-3 py-3 text-gray-700'></th>
                                    <th className='px-3 py-3 text-gray-700'></th>
                                    <th className='px-3 py-3 text-gray-700 text-center'></th>
                                </tr>
                            </thead>
                            <tbody className='bg-white'>
                                {projects.data.map((project) => (
                                    <tr className='hover:bg-gray-50 transition ' key={project.id}>
                                        <td className='px-3 py-3 text-gray-800'>{project.id}</td> 
                                        <td className='px-3 py-3 text-gray-800'><img src={project.image_path} style={{ width: 50 }}/></td>
                                        <th className='px-3 py-3 text-gray-900 text-nowrap hover:underline'>
                                            <Link href={route("project.show", project.id)}>{project.name}</Link></th>
                                        <td className='px-3 py-3 text-gray-800'>
                                        <span
                                            className={
                                            "px-2 py-1 rounded text-white " +
                                            PROJECT_STATUS_CLASS_MAP[project.status]
                                            }
                                        >{PROJECT_STATUS_TEXT_MAP[project.status]}</span>
                                        </td>
                                        <td className='px-3 py-3 text-gray-800 text-nowrap'>{project.created_at}</td>
                                        <td className='px-3 py-3 text-gray-800'>{project.due_date}</td>
                                        <td className='px-3 py-3 text-gray-800'>{project.createdBy.name}</td>
                                        <td className='px-3 py-3 text-gray-800'>
                                            <Link href={route("project.edit",project.id)} className='font-medium text-blue-700 hover:underline mx-1'>Edit</Link>
                                            <button onClick={(e) => deleteProject(project)} className='font-medium text-red-700 hover:underline mx-1'>Delete</button>
                                        </td>
                                    </tr>
                                ))}                               
                            </tbody>
                        </table> 
                        </div>
                          
                        <Pagination links={projects.meta.links}></Pagination>
                    </div>
                </div>
            </div>
        </div>

    </AuthenticatedLayout>
  )
}
