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
    public function show($id)
    {
        try {
            // Find the book by ID
            $events = Event::findOrFail($id);

            return response()->json(['event' => $events], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Event not found.'], 404);
        }
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
    public function destroy($id)
    {
        $books = Event::find($id);
        if(!$books){
          return response()->json([
             'message'=>'Event Not Found.'
          ],404);
        }
         
        // Delete book
        $books->delete();
       
        return response()->json([
            'message' => "Event successfully deleted."
        ],200);
    }
}
