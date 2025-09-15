<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UserRatingItemsController extends Controller
{
public function index()
    {
      $user = auth()->user();

    // Load rating items already selected by user
    $user->load('userRatingItems');
    $selectedIds = $user->userRatingItems->pluck('id')->toArray();

    // Get all rating items for the user's type
    $typeRatingItems = $user->type->typeRatingItems()->get(); // assuming User has relation 'type'

    // Map and add is_checked key
    $result = $typeRatingItems->map(function ($item) use ($selectedIds) {
        return [
            'id' => $item->id,
            'name' => $item->name,
            'is_checked' => in_array($item->id, $selectedIds)
        ];
    });

    return response()->json($result);
}

    public function store(Request $request)
    {
        $user= auth()->user();
        $validatedData = $request->validate([
            'rating_item_ids' => 'required|array',
            'rating_item_ids.*' => 'integer|exists:rating_items,id',
        ]);

        $ratingItemsCount = $user->userRatingItems()->count();

        if ($ratingItemsCount > 3){
            return response()->json(['message' => 'A user can have a maximum of 3 rating items'], 400);
        }


        $user->userRatingItems()->detach();
        $user->userRatingItems()->attach($validatedData['rating_item_ids']);
       
        return response()->json(['message' => 'User rating items updated successfully']);
    }
}
