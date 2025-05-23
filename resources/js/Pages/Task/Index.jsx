
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, Link} from '@inertiajs/react'
import React from 'react'

import TasksTable from './TasksTable'
export default function Index({auth,tasks,queryParams = null}) {
    

  return (
    <AuthenticatedLayout
    header={
        <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold leading-tight text-gray-800">
            Tasks
        </h2>
        <Link href={route("task.create")} className="bg-emerald-700 py-1 px-3 text-white rounded shadow transition-all hover:bg-green-900">New Task</Link>
        </div>

    }>
        <Head title="Tasks" />

        <div className="py-12">
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                    <div className="p-6 text-gray-900">

                          <TasksTable tasks={tasks} queryParams={queryParams}/>
                        
                    </div>
                </div>
            </div>
        </div>

    </AuthenticatedLayout>
  )
}
