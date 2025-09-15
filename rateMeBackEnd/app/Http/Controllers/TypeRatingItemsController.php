<?php

namespace App\Http\Controllers;

use App\Models\Type;
use Illuminate\Http\Request;
use App\Models\TypeRatingItems;

class TypeRatingItemsController extends Controller
{
    public function index()
    {

    $ratingItemsByType = Type::select('id', 'name')
    ->with(['typeRatingItems:id,name'])->get()->map(function ($type) {
        return [
            'id' => $type->id,
            'name' => $type->name,
            'rating_items' => $type->typeRatingItems->map(function ($item) {
                return [
                    'id' => $item->id,
                    'name' => $item->name,
                ];
            }),
        ];
    });
        return response()->json($ratingItemsByType);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
        'type_id' => 'required|integer|exists:types,id',
        'rating_item_ids' => 'required|array',
        'rating_item_ids.*' => 'integer|exists:rating_items,id', // validate each ID
    ]);
    $typeId = $validatedData['type_id'];
    $ratingItemIds = $validatedData['rating_item_ids'];

       foreach ($ratingItemIds as $itemId) {
        $typeRatingItem = TypeRatingItems::create([
            'type_id' => $typeId,
            'rating_item_id' => $itemId,
        ]);
       
        }
        return response()->json(["message" => "Type-Rating items created successfully"], 201);
    }


    public function destroy($id)
    {
        $typeRatingItem = TypeRatingItems::find($id);
        if (!$typeRatingItem) {
            return response()->json(['message' => 'Type-Rating item association not found'], 404);
        }

        $typeRatingItem->delete();
        return response()->json(['message' => 'Type-Rating item association deleted successfully']);
    }
}
