<?php

namespace App\Http\Controllers;
use App\Models\Admin;

use Illuminate\Http\Request;

class AdminController extends Controller
{

    protected $admin;

    public function __construct(){
        $this->admin = new Admin();
    }

    public function index()
    {
        return $this->admin->all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        return $this->admin->create($request->all());
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return $admin = $this->admin->find($id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $admin = $this->admin->find($id);
        $admin->update($request->all());
        return $admin;    
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $admin = $this->admin->find($id);
        return $admin->delete();    }
}
