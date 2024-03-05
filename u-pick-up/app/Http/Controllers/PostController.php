<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;
use App\Models\Post;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use App\Models\Likes;
use App\Models\Student;
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
    // Get the current user
    $studentId = $request->input('Id'); 

    // Fetch posts with information about whether they have been liked by the current user
    $posts = Post::select('posts.*', DB::raw('IFNULL(l.student_id, 0) AS liked_by_user'))
        ->leftJoin('likes as l', function($join) use ($studentId) {
            $join->on('posts.id', '=', 'l.post_id')
                ->where('l.student_id', '=', $studentId->id);
        })
        ->get();

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

//     public function like(Request $request, $postId)
// {
//     $post = Post::findOrFail($postId);

//     $studentId = $request->input('Id'); 


//     // Check if the student has already liked the post
//     if (!$post->students()->where('student_id', $studentId)->exists()) {
//         $post->students()->attach($studentId);
//         $post->likes_count++;
//         $post->save();

//         return response()->json(['message' => 'Post liked successfully']);
//     } else {
//         return response()->json(['message' => 'Post already liked by this student'], 400);
//     }
// }


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
            // If the student hasn't liked the post yet, like it
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

// public function like(Request $request, $id)
// {
//     $post = Post::find($id);

//     $userId = $request->input('Id'); 
//     $user = Student::find($userId); 

//     if (!$user) {
//         return response()->json(['error' => 'User not found.'], 404);
//     }

//     if (!$post) {
//         return response()->json(['error' => 'Post not found.'], 404);
//     }
    
//     if ($post->likes()->where('student_id', $user->id)->exists()) {
//         return response()->json(['error' => 'You have already liked this post.'], 400);
//     }

//     $like = new Likes(); 
//     $like->user_id = $user->id;
//     $post->likes()->save($like);

//     $post->likes_count++;

//     $post->save();

//     return response()->json($post);
// }


}

