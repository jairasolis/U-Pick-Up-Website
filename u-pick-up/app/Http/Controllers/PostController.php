<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{

    public function index()
    {
        $posts = Post::all();
        return response()->json($posts);
    }


    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'post_content' => 'required|string'
            // Add any other validation rules as needed
        ]);

        // Create a new post instance with validated data
        $post = Post::create($validatedData);
        return response()->json($post, 201);
    }
    public function show($id)
    {
        try {
            // Find the book by ID
            $posts = Post::findOrFail($id);

            return response()->json(['book' => $posts], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Post not found.'], 404);
        }
    }

    public function update(Request $request, string $id)
    {
        $validatedData = $request->validate([
            'post_content' => 'required|string'
        ]);
        $post = Post::findOrFail($id);
        $post->update($validatedData);
        return response()->json($post);
    }

    public function destroy(string $id)
    {
        $post = Post::findOrFail($id);
        $post->delete();
        return response()->json(['message' => 'Post deleted successfully']);
    }

    public function like(Request $request, string $id)
    {
        $post = Post::findOrFail($id);
        $post->likes++;

        // Save the updated post
        $post->save();
        return response()->json($post);
    }
}

