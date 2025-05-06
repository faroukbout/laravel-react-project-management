import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";


export default function Create({auth}) {

    const {data, setData, post, errors, reset} = useForm({
        image:"",
        name:"",
        status:"",
        description:"",
        due_date:""
    });

    const onSubmit = (e) => {
        e.preventDefault();

        post(route("task.store"));
    };
  return (
    <AuthenticatedLayout
    header={
      
        <h2 className="text-xl font-semibold leading-tight text-gray-800">
                New Task
        </h2>
    }>
    <Head title="New Projcet" />

    <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                
                    <form onSubmit={onSubmit} className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <div className="mt-4">
                            <InputLabel htmlFor="task_image_path" value="Task Image"/>
                            <TextInput 
                                id="task_image_path" type="file" name="image"
                                className="mt-1 block w-full"
                                onChange={e => setData("image" , e.target.files[0])}
                            />
                            <InputError message={errors.image} className="mt-2"/>
                        </div>
                        <div className="mt-4">
                            <InputLabel htmlFor="task_name" value="Task Name"/>
                            <TextInput 
                                id="task_name" type="text" name="name" value={data.name}
                                className="mt-1 block w-full"                 
                                onChange={e => setData("name" , e.target.value)}
                            />
                            <InputError message={errors.name} className="mt-2"/>
                        </div>
                        <div className="mt-4">
                            <InputLabel htmlFor="task_description" value="Task description"/>
                            <TextAreaInput
                                id="task_description" name="description" value={data.description}
                                className="mt-1 block w-full"
                                onChange={e => setData("description" , e.target.value)}
                            />
                            <InputError message={errors.description} className="mt-2"/>
                        </div>
                        <div className="mt-4">
                            <InputLabel htmlFor="task_due_date" value="Task Deadline"/>
                            <TextInput 
                                id="task_due_date" type="date" name="due_date" value={data.due_date}
                                className="mt-1 block w-full"                 
                                onChange={e => setData("due_date" , e.target.value)}
                            />
                            <InputError message={errors.due_date} className="mt-2"/>
                        </div>
                        <div className="mt-4">
                            <InputLabel htmlFor="task_status" value="Task status"/>
                            <SelectInput 
                                id="task_status" name="status" value={data.status}
                                className="mt-1 block w-full"                 
                                onChange={e => setData("status" , e.target.value)}
                            >
                                <option value="">Select Status</option>
                                <option value="pending">Pending</option>
                                <option value="in_progress">In Progress</option>
                                <option value="completed">Completed</option>

                            </SelectInput>
                            <InputError message={errors.status} className="mt-2"/>
                        </div>
                        <div className="mt-4">
                            <InputLabel htmlFor="task_priority" value="Task Priority"/>
                            <SelectInput 
                                id="task_priority" name="priority" value={data.priority}
                                className="mt-1 block w-full"                 
                                onChange={e => setData("priority" , e.target.value)}
                            >
                                <option value="">Select Priority</option>
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>

                            </SelectInput>
                            <InputError message={errors.priority} className="mt-2"/>
                        </div>
                        <div className="mt-4">
                            <InputLabel htmlFor="task_assigned_user" value="Task Assigned User"/>
                            <SelectInput 
                                id="task_assigned_user" name="assigned_user" 
                                className="mt-1 block w-full"                 
                                onChange={e => setData("assigned_user_id" , e.target.value)}
                            >
                                <option value="">Select User</option>
                                <option value="">user1</option>
                            </SelectInput>
                            <InputError message={errors.assigned_user_id} className="mt-2"/>
                        </div>
                        <div className="mt-4">
                            <InputLabel htmlFor="task_project_id" value="project"/>
                            <SelectInput 
                                id="task_project_id" name="project_id" 
                                className="mt-1 block w-full"                 
                                onChange={e => setData("project_id" , e.target.value)}
                            >
                                <option value="">Select Project</option>
                                <option value="">project1</option>
                            </SelectInput>
                            <InputError message={errors.project_id} className="mt-2"/>
                        </div>
                        <div className="mt-4 text-right">
                        <Link 
                            href={route("task.index")}
                            className="inline-flex items-center justify-center bg-red-500 py-1 px-3 text-gray-200 rounded shadow 
                            transition-all hover:bg-red-900 mr-2"
                            >Cancel</Link>
                        <button className="inline-flex items-center justify-center bg-emerald-500 py-1 px-3 text-white rounded shadow 
                        transition-all hover:bg-emerald-600">Create</button>
                        </div>
                    </form>
                
            </div>
        </div>
    </div>

    </AuthenticatedLayout>
  )
}
