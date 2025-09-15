<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Symfony\Component\HttpKernel\Profiler\Profile;
use App\Models\ProfileWifiInfo;

class ProfileWifiInfoController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        if (!$user) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        return response()->json($user->profileWifiInfo);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'password' => 'nullable|string|max:255',
        ]);

        $user = $request->user();
        if (!$user) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        ProfileWifiInfo::create([
            'user_id' => $user->id,
            'name' => $validatedData['name'],
            'password' => $validatedData['password'] ?? null,
        ]);

        return response()->json(['message' => 'Profile WiFi info saved successfully'], 200);
    }

    public function update(Request $request,$id)
    {
        $validatedData = $request->validate([
            'name' => 'sometimes|string|max:255',
            'password' => 'sometimes|nullable|string|max:255',
        ]);

        $user = $request->user();
        if (!$user) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        ProfileWifiInfo::where('id', $id)->where('user_id', $user->id)->update($validatedData);

        return response()->json(['message' => 'Profile WiFi info updated successfully'], 200);
    }

    public function destroy(Request $request, $id)
    {
        $user = $request->user();
        if (!$user) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        ProfileWifiInfo::where('id', $id)->where('user_id', $user->id)->delete();

        return response()->json(['message' => 'Profile WiFi info deleted successfully'], 200);
    }

}
