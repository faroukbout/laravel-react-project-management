import { PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP } from "@/Constants";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";


export default function Show({auth,project}) {
  return (
    <AuthenticatedLayout
    header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800">
            {`Project ${project.name}`}
        </h2>
    }>
         <Head title="Project" />

         <div className="py-12">
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
                        </div>
                        <div></div>
                      </div>
                    </div>
                </div>
            </div>
         </div>
    </AuthenticatedLayout>
  )
}
