<?php

namespace App\Http\Controllers;
use App\Models\Post;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;

class PostController extends Controller
{

    // public function index()
    // {
    //     $posts = Post::all();
    //     return response()->json($posts);
    // }

    public function index(Request $request)
    {
        // Get the student ID from the request
        $studentId = $request->input('Id'); 
    
        // Fetch posts with information about whether they have been liked by the current user
        $posts = Post::select('posts.*', DB::raw('IFNULL(l.student_id, 0) AS liked_by_user'))
            ->leftJoin('post_student as l', function($join) use ($studentId) {
                $join->on('posts.id', '=', 'l.post_id')
                    ->where('l.student_id', '=', $studentId);
            })
            ->get();

        $posts->transform(function ($post) {
            $post->liked_by_user = $post->liked_by_user ? 'like' : 'unlike';
            return $post;
        });
    
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

public function like(Request $request, $postId)
{
    try {
        DB::beginTransaction();

        $post = Post::findOrFail($postId);
        $studentId = $request->input('Id'); 

        // Check if the student has already liked the post
        if ($post->students()->where('post_student.student_id', $studentId)->exists()) {
            // If the student has already liked the post, unlike it
            $post->students()->detach($studentId);
            $post->decrement('likes_count'); // Decrement likes_count
            // Return response indicating unlike action
            DB::commit();
            return response()->json(['message' => 'Post unliked successfully', 'action' => 'unlike', 'likes_count' => $post->likes_count]);
        } else {
            // If the student hasn't liked the post yet, like it ayii
            $post->students()->attach($studentId);
            $post->increment('likes_count'); // Increment likes_count
            // Return response indicating like action
            DB::commit();
            return response()->json(['message' => 'Post liked successfully', 'action' => 'like', 'likes_count' => $post->likes_count]);
        }
    } catch (ModelNotFoundException $e) {
        DB::rollBack();
        return response()->json(['message' => 'Post not found'], 404);
    } catch (\Exception $e) {
        DB::rollBack();
        return response()->json(['message' => 'Error occurred while processing the request'], 500);
    }
}


}

