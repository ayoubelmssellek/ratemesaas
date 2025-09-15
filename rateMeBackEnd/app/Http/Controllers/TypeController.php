<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Type;
class TypeController extends Controller
{
    public function index()
    {
        $types = Type::all();
        return response()->json( $types);
    }



    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255'
        ]);

        $type = Type::create($validatedData);
        return response()->json($type, 201);
    }

    public function update(Request $request, $id)
    {
        $type = Type::find($id);
        if (!$type) {
            return response()->json(['message' => 'Type not found'], 404);
        }

        $validatedData = $request->validate([
            'name' => 'required|string|max:255'
        ]);

        $type->update($validatedData);
        return response()->json($type);
    }

    public function destroy($id)
    {
        $type = Type::find($id);
        if (!$type) {
            return response()->json(['message' => 'Type not found'], 404);
        }

        $type->delete();
        return response()->json(['message' => 'Type deleted successfully']);
    }
}
