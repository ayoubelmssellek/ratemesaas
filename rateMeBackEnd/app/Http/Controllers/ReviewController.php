<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Review;
use App\Models\User;

;
use Illuminate\Support\Facades\DB ;

class ReviewController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        $reviews = $user->reviews()->with([ 'reviewRatings.ratingItem'])->get()->map(function($review) {
            return [
                'id' => $review->id,
                'description' => $review->description,
                'created_at' => $review->created_at,
                'ratings' => $review->reviewRatings->map(function($rating) {
                    return [
                        'rating_item' => $rating->ratingItem ? $rating->ratingItem->name : null,
                        'score' => $rating->rating,
                    ];
                }),
            ];
        });
        return response()->json($reviews);

    }

    public function store(Request $request, $id)
    {
        $validatedData = $request->validate([
            'description' => 'nullable|string',
            'ratings' => 'required|array',
            'ratings.*.rating_item_id' => 'required|integer|exists:rating_items,id',
            'ratings.*.score' => 'required|integer|min:1|max:5',
        ]);
        $user = User::find($id);
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }
        DB::beginTransaction();
        try {
            $review = Review::create([
                'user_id' => (int) $id,
                'description' => $validatedData['description'] ?? null,
        ]);

        foreach ($validatedData['ratings'] as $rating) {
            $review->reviewRatings()->create([
                'rating_item_id' => $rating['rating_item_id'],
                'rating' => $rating['score'],
            ]);
        }

   
        DB::commit();
        return response()->json(["message" => "Review created successfully"], 201);

    } catch (\Exception $e) {
        DB::rollBack();
        return response()->json(['message' => 'Failed to create review', 'error' => $e->getMessage()], 500);
    }
    }


    public function getRatingItems($id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        $ratingItems = $user->userRatingItems->map(function ($item) {
            return [
                'id' => $item->id,
                'name' => $item->name,
            ];
        });

        return response()->json($ratingItems);
    }

}
