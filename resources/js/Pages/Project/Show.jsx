import { PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP } from "@/Constants";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import TasksTable from "../Task/TasksTable";


export default function Show({auth,project,tasks,queryParams}) {
  return (
    <AuthenticatedLayout
    header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800">
            {`Project ${project.name}`}
        </h2>
    }>
         <Head title="Project" />

         <div className="pt-12 ">
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                    <div className="p-6 text-gray-900">
                      <div className="grid gap-1 grid-cols-2">
                        <div>
                          <div>
                            <label className="font-bold text-lg">Project Id </label>
                            <p className="mt-1 text-cyan-950">{project.id}</p>
                          </div>
                          <div className="mt-4">
                            <label className="font-bold text-lg">Project Name </label>
                            <p className="mt-1 text-cyan-950">{project.name}</p>
                          </div>
                          <div className="mt-4">
                            <label className="font-bold text-lg">Project Status  </label>
                            <p className="mt-1">
                              <span className={"px-2 py-1 rounded text-white " +
                                PROJECT_STATUS_CLASS_MAP[project.status]
                                 }
                                 >{PROJECT_STATUS_TEXT_MAP[project.status]}</span>
                            </p>
                          </div>
                          <div className="mt-4">
                            <label className="font-bold text-lg">Created By </label>
                            <p className="mt-1 text-cyan-950">{project.createdBy.name}</p>
                          </div>
                        </div>
                        <div>
                          <div className="mt-4">
                            <label className="font-bold text-lg">Due Date </label>
                            <p className="mt-1 text-cyan-950">{project.due_date}</p>
                          </div>
                          <div className="mt-4">
                            <label className="font-bold text-lg">created At </label>
                            <p className="mt-1 text-cyan-950">{project.created_at}</p>
                          </div>
                          <div className="mt-4">
                            <label className="font-bold text-lg">Updated By </label>
                            <p className="mt-1 text-cyan-950">{project.updatedBy.name}</p>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4">
                            <label className="font-bold text-lg">Project Description </label>
                            <p className="mt-1 text-cyan-950">{project.description}</p>
                          </div>
                    </div>
                </div>
            </div>
         </div>
         <div className="py-12">
                     <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                         <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                             <div className="p-6 text-gray-900">
         
                                   <TasksTable tasks={tasks} queryParams={queryParams} showProjectName={false}/>
                                 
                             </div>
                         </div>
                     </div>
          </div>
    </AuthenticatedLayout>
  )
}
