import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";


export default function Edit({auth,user}) {

    const {data, setData, post, errors, reset} = useForm({
        name:user.data.name || "",
        email: user.data.email || "",
        password: "",
        password_confirmation:"",
        _method: "PUT",
    });

    const onSubmit = (e) => {
        e.preventDefault();

        post(route("user.update",user.data.id));
    };
  return (
    <AuthenticatedLayout
    header={
      
        <h2 className="text-xl font-semibold leading-tight text-gray-800">
                Update User "{user.data.name}"
        </h2>
    }>
    <Head title="New Projcet" />
    <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                
                    <form onSubmit={onSubmit} className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                                            <div className="mt-4">
                                                <InputLabel htmlFor="user_name" value="User Name"/>
                                                <TextInput 
                                                    id="user_name" type="text" name="name" value={data.name}
                                                    className="mt-1 block w-full"                 
                                                    onChange={e => setData("name" , e.target.value)}
                                                />
                                                <InputError message={errors.name} className="mt-2"/>
                                            </div>
                                            <div className="mt-4">
                                                <InputLabel htmlFor="user_email" value="User Email"/>
                                                <TextInput
                                                    id="user_description" name="email" value={data.email}
                                                    className="mt-1 block w-full"
                                                    onChange={e => setData("email" , e.target.value)}
                                                />
                                                <InputError message={errors.email} className="mt-2"/>
                                            </div>
                                            <div className="mt-4">
                                                <InputLabel htmlFor="user_password" value="Password"/>
                                                <TextInput 
                                                    id="user_password" type="password" name="password" value={data.password}
                                                    className="mt-1 block w-full"                 
                                                    onChange={e => setData("password" , e.target.value)}
                                                />
                                                <InputError message={errors.password} className="mt-2"/>
                                            </div>
                                            <div className="mt-4">
                                                <InputLabel htmlFor="user_password_confirmation" value="Confirm Password"/>
                                                <TextInput 
                                                    id="user_password_confirmation" type="password" name="password_confirmation" value={data.password_confirmation}
                                                    className="mt-1 block w-full"                 
                                                    onChange={e => setData("password_confirmation" , e.target.value)}
                                                />
                                                <InputError message={errors.password_confirmation} className="mt-2"/>
                                            </div>
                                            <div className="mt-4 text-right">
                                            <Link 
                                                href={route("user.index")}
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
