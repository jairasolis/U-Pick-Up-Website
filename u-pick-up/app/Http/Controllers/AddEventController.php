<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;

class AddEventController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Event::all();
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'event_title' => 'required|string',
            'event_date' => 'required|date',
        ]);

        $event = Event::create([
            'event_title' => $request->input('event_title'),
            'event_date' => $request->input('event_date'),
        ]);

        return response()->json($event, 201);
    }


    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return $event;
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Event $event)
    {
        $request->validate([
            'event_title' => 'required|string',
            'event_date' => 'required|date',
        ]);

        $event->update([
            'event_title' => $request->input('event_title'),
            'event_date' => $request->input('event_date'),
        ]);

        return response()->json($event, 200);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $event->delete();
        return response()->json(null, 204);
        //
    }
}
