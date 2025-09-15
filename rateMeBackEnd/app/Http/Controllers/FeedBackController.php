<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\FeedBack;

class FeedBackController extends Controller
{
    public function index()
    {
        $feedBacks = FeedBack::with('user')->get()->map(function($feedback) {
           return [
            'id' => $feedback->id,
            'description' => $feedback->description,
            'rating' => $feedback->rating,
            'is_showen' => $feedback->is_showen,

            'user_id' => $feedback->user->id,
            'user_name' => $feedback->user->name,
            'user_email' => $feedback->user->email,
            
           ];
        });
        return response()->json($feedBacks);
    }

    public function getShownFeedbacks()
    {
        $feedBacks = FeedBack::with('user')->where('is_showen', true)->get();
        return response()->json( $feedBacks);
    }

    public function store(Request $request)
    {
        $user_id = auth()->user()->id;
        $validatedData = $request->validate([
            'description' => 'required|string',
            'rating' => 'required|integer|min:1|max:5',
        ]);

        $feedBack = FeedBack::create(array_merge($validatedData, ['user_id' => $user_id]));
        return response()->json($feedBack, 201);
    }

    public function update( $id)
    {
        $feedBack = FeedBack::find($id);
        if (!$feedBack) {
            return response()->json(['message' => 'FeedBack not found'], 404);
        }


        $feedBack->update(['is_showen' => !$feedBack->is_showen]);
        return response()->json($feedBack);
    }

    
    
}
