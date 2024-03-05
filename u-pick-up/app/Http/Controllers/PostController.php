<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;
use App\Models\Post;
use App\Models\Likes;
use App\Models\Student;
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

    public function update(Request $request, string $id)
    {
        $validatedData = $request->validate([
            'post_content' => 'required|string'
        ]);
        $post = Post::findOrFail($id);
        $post->update($validatedData);
        return response()->json($post);
    }

    public function destroy($id)
    {
        $post = Post::findOrFail($id);
        $post->delete();
        return response()->json(['message' => 'Post deleted successfully']);
    }

    // public function like(Request $request, $id)
    // {
    //     $post = Post::findOrFail($id);
    //     $post->likes_count++;

    //     // Save the updated post
    //     $post->save();
    //     return response()->json($post);
    // }


//     public function like(Request $request, $id)
// {
//     $user = Auth::user();
//     $post = Post::findOrFail($id);
    
//     // Check if the user has already liked the post
//     if ($post->likes()->where('user_id', $user->id)->exists()) {
//         return response()->json(['error' => 'You have already liked this post.'], 400);
//     }

//     // Create a new like record
//     $like = new Likes();
//     $like->user_id = $user->id;
//     $post->likes()->save($like);

//     // Increment the likes count for the post
//     $post->likes_count++;

//     // Save the updated post
//     $post->save();

//     return response()->json($post);
// }

public function like(Request $request, $id)
{
    $post = Post::find($id);

    $userId = $request->input('Id'); 
    $user = Student::find($userId); 

    if (!$user) {
        return response()->json(['error' => 'User not found.'], 404);
    }

    if (!$post) {
        return response()->json(['error' => 'Post not found.'], 404);
    }
    
    if ($post->likes()->where('user_id', $user->id)->exists()) {
        return response()->json(['error' => 'You have already liked this post.'], 400);
    }

    $like = new Likes(); 
    $like->user_id = $user->id;
    $post->likes()->save($like);

    $post->likes_count++;

    $post->save();

    return response()->json($post);
}


}

