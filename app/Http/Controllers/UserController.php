<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserResource;
use App\Http\Resources\TaskResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

use function Pest\Laravel\delete;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = User::query();

        //sorting fields 
        $sortField = request("sort_field","created_at");
        $sortDirection = request("sort_direction","desc");

        if(request('name')){
            $query->where("name","like","%".request("name")."%");
        }
        if(request("email")){
            $query->where("email","like","%".request("email")."%");
        }

        $users = $query->orderBy($sortField,$sortDirection)->paginate(8)->onEachSide(1);

        return inertia("User/Index",[
            "users" => UserResource::collection($users),
            "queryParams" =>request()->query() ?: null,
            'success' => session('success'),
        ]);
    }
 
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
       return inertia("User/Create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
        $data = $request->validated();
        $data['password'] = Hash::make($data['password']);
        $user = User::create($data);

        return to_route('user.index')->with('success','Created Successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        $query = $user->tasks();
        //sorting fields 
        $sortField = request("sort_field","created_at");
        $sortDirection = request("sort_direction","desc");

        if(request('name')){
            $query->where("name","like","%".request("name")."%");
        }
        if(request('email')){
            $query->where("email","like","%".request("email")."%");
        }
        

        $tasks = $query->orderBy($sortField,$sortDirection)->paginate(8)->onEachSide(1);

        return inertia("User/Show",
            ['user' => new UserResource($user),
            "tasks" => TaskResource::collection($tasks),
            "queryParams" =>request()->query() ?: null,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
       
        return inertia("User/Edit",[
            "user" => new UserResource($user)
            
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        $data = $request->validated();
        $password = $data['password'] ?? null;

        if ($password) {
            $data['password'] = Hash::make($password);
        } else {
            unset($data['password']);
        }
        $user->update($data);
        return to_route("user.index")->with("success","user $user->name Updated with succeess");

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        
        $user->delete();

        return to_route('user.index')->with('success','User Deleted Successfully');
    }
}
