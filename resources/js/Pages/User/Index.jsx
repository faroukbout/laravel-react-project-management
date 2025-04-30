import Pagination from '@/Components/Pagination'
import SelectInput from '@/Components/SelectInput'
import TextInput from '@/Components/TextInput'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, Link, router } from '@inertiajs/react'
import React from 'react'
import { ChevronUpDownIcon } from '@heroicons/react/24/solid'
import TableHeader from '@/Components/TableHeader'


export default function Index({auth,users,queryParams = null, success}) {
    queryParams = queryParams || {};
    const searchFieldChanged = (name,value) =>{
        if(value){
            queryParams[name] = value;
        }else{
            delete queryParams[name];
        }

        router.get(route("user.index"),queryParams);
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
        router.get(route("user.index", queryParams));
    }

    const deleteUser = (user) => {
        if(!window.confirm("Delete the user !")){
            return;
        }
        router.delete(route("user.destroy",user.id));
    }

  return (
    <AuthenticatedLayout
    header={
        <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Users
        </h2>
        <Link href={route("user.create")} className="bg-emerald-700 py-1 px-3 text-white rounded shadow transition-all hover:bg-green-900">New User</Link>
        </div>
        
    }>
        <Head title="Users" />
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
                                    <TableHeader 
                                        name="name"
                                        sort_field={queryParams.sort_field}
                                        sort_direction={queryParams.sort_direction}
                                        sortChanged={sortChanged}>Name</TableHeader>
                                    <TableHeader
                                        name="email"
                                        sort_field={queryParams.sort_field}
                                        sort_direction={queryParams.sort_direction}
                                        sortChanged={sortChanged}>Email</TableHeader>
                                    <TableHeader
                                        name="created_at"
                                        sort_field={queryParams.sort_field}
                                        sort_direction={queryParams.sort_direction}
                                        sortChanged={sortChanged}>Created</TableHeader>
                                    <th className='px-3 py-3 text-gray-700 text-center'>Actions</th>
                                </tr>
                            </thead>
                            <thead className='text-xs  uppercase bg-gray-100  border-b-2'>
                                <tr className='text-nowrap'>
                                    <th className='px-3 py-3 text-gray-700'></th>
                                    <th className='px-3 py-3 text-gray-700'>
                                        <TextInput 
                                        className="w-full"
                                        placeholder="User Name"
                                        defaultValue={queryParams.name}
                                        onBlur={e => searchFieldChanged('name', e.target.value)
                                        }
                                        onKeyPress={e => onKeyPress('name',e)}
                                        />
                                    </th>
                                    <th className='px-3 py-3 text-gray-700'>
                                    <TextInput 
                                        className="w-full"
                                        placeholder="Email"
                                        defaultValue={queryParams.email}
                                        onBlur={e => searchFieldChanged('email', e.target.value)
                                        }
                                        onKeyPress={e => onKeyPress('email',e)}
                                        />
                                    </th>
                                    <th className='px-3 py-3 text-gray-700'>
                                    </th>
                                    <th className='px-3 py-3 text-gray-700 text-center'></th>
                                </tr>
                            </thead>
                            <tbody className='bg-white'>
                                {users.data.map((user) => (
                                    <tr className='hover:bg-gray-50 transition ' key={user.id}>
                                        <td className='px-3 py-3 text-gray-800'>{user.id}</td> 
                                        <th className='px-3 py-3 text-gray-900 text-nowrap '>
                                            {user.name}</th>
                                        <td className='px-3 py-3 text-gray-800'>
                                            {user.email}
                                        </td>
                                        <td className='px-3 py-3 text-gray-800 text-nowrap'>{user.created_at}</td>
                                        <td className='px-3 py-3 text-gray-800 text-center  '>
                                            <Link href={route("user.edit",user.id)} className='font-medium text-blue-700 hover:underline mx-1'>Edit</Link>
                                            <button onClick={(e) => deleteUser(user)} className='font-medium text-red-700 hover:underline mx-1'>Delete</button>
                                        </td>
                                    </tr>
                                ))}                               
                            </tbody>
                        </table> 
                        </div>
                          
                        <Pagination links={users.meta.links}></Pagination>
                    </div>
                </div>
            </div>
        </div>

    </AuthenticatedLayout>
  )
}
