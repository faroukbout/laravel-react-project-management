import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";


export default function Edit({auth,task}) {

    const {data, setData, post, errors, reset} = useForm({
        image: "",
        name:task.name || "",
        status: task.status || "",
        description: task.description || "",
        due_date: task.due_date || "",
        _method: "PUT",
    });

    const onSubmit = (e) => {
        e.preventDefault();

        post(route("task.update",task.id));
    };
  return (
    <AuthenticatedLayout
    header={
      
        <h2 className="text-xl font-semibold leading-tight text-gray-800">
                Update Task "{task.name}"
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
                        <div className="mt-4 text-right">
                        <Link 
                            href={route("task.index")}
                            className="inline-flex items-center justify-center bg-red-500 py-1 px-3 text-gray-200 rounded shadow 
                            transition-all hover:bg-red-900 mr-2"
                            >Cancel</Link>
                        <button className="inline-flex items-center justify-center bg-emerald-500 py-1 px-3 text-white rounded shadow 
                        transition-all hover:bg-emerald-600">Update</button>
                        </div>
                    </form>
                
            </div>
        </div>
    </div>

    </AuthenticatedLayout>
  )
}
