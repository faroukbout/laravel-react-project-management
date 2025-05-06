import { TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP } from "@/Constants";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import TasksTable from "../Task/TasksTable";


export default function Show({auth,task,tasks,queryParams}) {
  return (
    <AuthenticatedLayout
    header={
      
      <h2 className="text-xl font-semibold leading-tight text-gray-800">
            {`Task ${task.name}`}
        </h2>
        
      
    }>
         <Head title="Task" />

         <div className="pt-12 ">
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                  {task.image_path && (
                    <div>
                           <img src={task.image_path} alt="" className="w-full object-cover h-52" />
                    </div>
                  )}
                
                    <div className="p-6 text-gray-900">
                      <div className="grid gap-1 grid-cols-2">
                        <div>
                  
                          <div>
                            <label className="font-bold text-lg">Task Id </label>
                            <p className="mt-1 text-cyan-950">{task.id}</p>
                          </div>
                          <div className="mt-4">
                            <label className="font-bold text-lg">Task Name </label>
                            <p className="mt-1 text-cyan-950">{task.name}</p>
                          </div>
                          <div className="mt-4">
                            <label className="font-bold text-lg">Task Status  </label>
                            <p className="mt-1">
                              <span className={"px-2 py-1 rounded text-white " +
                                TASK_STATUS_CLASS_MAP[task.status]
                                 }
                                 >{TASK_STATUS_TEXT_MAP[task.status]}</span>
                            </p>
                          </div>
                          <div className="mt-4">
                            <label className="font-bold text-lg">Created By </label>
                            <p className="mt-1 text-cyan-950">{task.createdBy.name}</p>
                          </div>
                        </div>
                        <div>
                          <div className="mt-4">
                            <label className="font-bold text-lg">Due Date </label>
                            <p className="mt-1 text-cyan-950">{task.due_date}</p>
                          </div>
                          <div className="mt-4">
                            <label className="font-bold text-lg">created At </label>
                            <p className="mt-1 text-cyan-950">{task.created_at}</p>
                          </div>
                          <div className="mt-4">
                            <label className="font-bold text-lg">Updated By </label>
                            <p className="mt-1 text-cyan-950">{task.updatedBy.name}</p>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4">
                            <label className="font-bold text-lg">Task Description </label>
                            <p className="mt-1 text-cyan-950">{task.description}</p>
                          </div>
                    </div>
                </div>
            </div>
         </div>
         <div className="py-12">
                     <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                         <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                             <div className="p-6 text-gray-900">
         
                                   <TasksTable tasks={tasks} queryParams={queryParams} showTaskName={false}/>
                                 
                             </div>
                         </div>
                     </div>
          </div>
    </AuthenticatedLayout>
  )
}
