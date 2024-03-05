<?php

namespace App\Http\Controllers;
use App\Models\Post;
use App\Models\Likes;
use Illuminate\Http\Request;

class LikesController extends Controller
{
    public function like(Request $request, Post $post)
    {
        $user = $request->user();

        if ($post->likes()->where('user_id', $user->id)->exists()) {
            return response()->json(['message' => 'You have already liked this post.'], 400);
        }

        $like = new Likes();
        $like->user_id = $user->id;
        $post->likes()->save($like);

        return response()->json(['message' => 'Post liked successfully.']);
    }

    public function unlike(Request $request, Post $post)
    {
        $user = $request->user();

        $like = $post->likes()->where('user_id', $user->id)->first();

        if ($like) {
            $like->delete();
            return response()->json(['message' => 'Post unliked successfully.']);
        }

        return response()->json(['message' => 'You have not liked this post.'], 400);
    }
}
