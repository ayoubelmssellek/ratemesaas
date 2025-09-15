<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\RatingItem;

class RatingItemController extends Controller
{
    public function index()
    {
        $ratingItems = RatingItem::all();
        return response()->json($ratingItems);
    }


    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',

        ]);

        $ratingItem = RatingItem::create($validatedData);
        return response()->json($ratingItem, 201);
    }

    public function update(Request $request, $id)
    {
        $ratingItem = RatingItem::find($id);
        if (!$ratingItem) {
            return response()->json(['message' => 'Rating item not found'], 404);
        }

        $validatedData = $request->validate([
            'name' => 'required|string|max:255'
        ]);

        $ratingItem->update($validatedData);
        return response()->json($ratingItem);
    }

    public function destroy($id)
    {
        $ratingItem = RatingItem::find($id);
        if (!$ratingItem) {
            return response()->json(['message' => 'Rating item not found'], 404);
        }

        $ratingItem->delete();
        return response()->json(['message' => 'Rating item deleted successfully']);
    }
}
