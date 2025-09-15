<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\SocialMediaPlatform;

class SocialMediaPlatformController extends Controller
{
    public function index()
    {
        $socialMediaPlatforms = SocialMediaPlatform::all();
        return response()->json($socialMediaPlatforms);
    }

    public function show($id)
    {
        $platform = SocialMediaPlatform::find($id);
        if (!$platform) {
            return response()->json(['message' => 'Platform not found'], 404);
        }
        return response()->json($platform);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255|unique:social_media_platforms,name'
        ]);

        $platform = SocialMediaPlatform::create($validatedData);
        return response()->json($platform, 201);
    }
    public function update(Request $request, $id)
    {
        $platform = SocialMediaPlatform::find($id);
        if (!$platform) {
            return response()->json(['message' => 'Platform not found'], 404);
        }

        $validatedData = $request->validate([
            'name' => 'required|string|max:255|unique:social_media_platforms,name,' . $id
        ]);

        $platform->update($validatedData);
        return response()->json($platform);
    }

    public function destroy($id)
    {
        $platform = SocialMediaPlatform::find($id);
        if (!$platform) {
            return response()->json(['message' => 'Platform not found'], 404);
        }

        $platform->delete();
        return response()->json(['message' => 'Platform deleted successfully']);
    }
}
