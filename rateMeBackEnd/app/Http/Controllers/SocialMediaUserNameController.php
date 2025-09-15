<?php

namespace App\Http\Controllers;

use App\Models\SocialMediaUserName;
use Illuminate\Http\Request;

class SocialMediaUserNameController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        if (!$user) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        return response()->json($user->socialMediaUserNames);
    }
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'social_media_platform_id' => 'required|string|max:255|exists:social_media_platforms,id',
            'username' => 'required|string|max:255',

        ]);

        $user = $request->user();
        if (!$user) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        SocialMediaUserName::updateOrCreate([
            'user_id' => $user->id,
            'social_media_platform_id' => $validatedData['social_media_platform_id'],
        ], [
            'username' => $validatedData['username'],
        ]);

        return response()->json(['message' => 'Social media usernames saved successfully'], 200);
    }
    public function update(Request $request,$id)
    {
        $validatedData = $request->validate([
            'social_media_platform_id' => 'sometimes|string|max:255|exists:social_media_platforms,id',
            'username' => 'sometimes|string|max:255',
        ]);

        $user = $request->user();
        if (!$user) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        SocialMediaUserName::where('id', $id)->where('user_id', $user->id)->update($validatedData);

        return response()->json(['message' => 'Social media usernames updated successfully'], 200);
    }

    public function destroy(Request $request, $id)
    {
        $user = $request->user();
        if (!$user) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        SocialMediaUserName::where('id', $id)->where('user_id', $user->id)->delete();

        return response()->json(['message' => 'Social media usernames deleted successfully'], 200);
    }
}
