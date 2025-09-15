<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\EmailVerification;
use App\Models\User;

class EmailVerificationController extends Controller
{
    public function verifyEmail (Request $request){
    
        $validatedData = $request->validate([
            'user_id' => 'required|integer|exists:users,id',
            'code' => 'required|string|max:6',
        ]);

        $verification = EmailVerification::where('user_id', $validatedData['user_id'])
            ->where('code', $validatedData['code'])
            ->where('expires_at', '>', now())
            ->first();

        if (!$verification) {
            return response()->json(['message' => 'Invalid or expired verification code'], 400);
        }

        $user = User::find($validatedData['user_id']);
        if ($user) {
            $user->email_verified_at = now();
            if($user->status === 'pending') {
                $user->status = 'inactive';
            }
            $user->save();
        }

        // Optionally, delete the verification record after successful verification
        $verification->delete();

        return response()->json(['message' => 'Email verified successfully'], 200);
    }
}
