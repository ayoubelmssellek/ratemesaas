<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\EmailVerification;
use Illuminate\Support\Facades\Mail;

class UserController extends Controller
{
    public function register (Request $request){
        // Validate the incoming request data
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'type_id' => 'required|integer|exists:types,id',
            

        ]);

        $user = User::create([
            'name' => $validatedData['name'],
            'email' => $validatedData['email'],
            'password' => Hash::make($validatedData['password']),
            'type_id' => $validatedData['type_id'],
            'role_id'=>1,
            'status'=>'pending',
            'email_verified_at'=>null
        ]);
        $code = rand(100000, 999999);
    

            EmailVerification::create([
                'user_id' => $user->id,
                'code' => $code,
                'purpose' => 'registration',
                'expires_at' => now()->addMinutes(15),
            ]);

            Mail::raw("هاد هو الكود ديالك للتفعيل: $code", function ($message) use ($request) {
                $message->to($request->email)
                        ->subject('Verification Code');
            });


        // Return pending_id to React (store internally, not user input)
        return response()->json([
            'message' => 'Verification code sent to email',
            'user_id' => $user->id
        ]);



 

    }
 

   // ✅ Login
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (!$token = auth()->attempt($credentials)) {
            return response()->json(['error' => 'Invalid credentials'], 401);
        }

        $user = auth()->user();

        // Check email verified
        if (!$user->email_verified_at){
            return response()->json(['error' => 'Email not verified'], 403);
        }

        $ttlMinutes = config('jwt.ttl', 43200); // Default 1 day
        return response()->json([
        'message' => 'Login successful',
        'expires_in_minutes' => $ttlMinutes
    ])->cookie(
        'token',
        $token,
        $ttlMinutes,
        '/',
        '127.0.0.1', 
        false,     
        true,        
        false,
        'None'        
    );

        }
        
      // ✅ Get current user
        public function me()
        {
            $user = auth()->user();
            return response()->json($user);
        }

        // ✅ Logout
        public function logout(Request $request)
        {
            auth()->logout();
            $cookie = cookie()->forget('token');
            return response()->json(['message' => 'Logged out'])->withCookie($cookie);
        }


       
        // ✅ update user info
    public function update_user_info(Request $request)
    {
        $user = auth()->user();

        // قواعد التحقق
        $rules = [
            'name' => 'sometimes|string|max:255',
            'email' => 'sometimes|email|unique:users,email,' . $user->id,
        ];

        $validatedData = $request->validate($rules);

        // تحديث المعلومات العادية
        $user->fill($validatedData);


        $user->save();

        return response()->json([
            'message' => 'تم تحديث المعلومات بنجاح',
        ]);
    }

    public function change_password(Request $request)
    {
        $user = auth()->user();

        $validatedData = $request->validate([
            'current_password' => 'required|string',
            'new_password' => 'required|string|min:8|confirmed',
        ]);

        // تحقق من كلمة المرور الحالية
        if (!Hash::check($validatedData['current_password'], $user->password)) {
            return response()->json(['error' => 'كلمة المرور الحالية غير صحيحة'], 400);
        }

        // تحديث كلمة المرور
        $user->password = Hash::make($validatedData['new_password']);
        $user->save();

        return response()->json(['message' => 'تم تغيير كلمة المرور بنجاح']);
    }

    public function forgot_password(Request $request)
    {
        $validatedData = $request->validate([
            'email' => 'required|email|exists:users,email',
        ]);

        $user = User::where('email', $validatedData['email'])->first();
        if (!$user) {
            return response()->json(['error' => 'البريد الإلكتروني غير موجود'], 404);
        }

        $code = rand(100000, 999999);

        EmailVerification::create([
            'user_id' => $user->id,
            'code' => $code,
            'purpose' => 'password_reset',
            'expires_at' => now()->addMinutes(15),
        ]);

        Mail::raw("هاد هو الكود ديالك باش تبدل كلمة السر: $code", function ($message) use ($request) {
            $message->to($request->email)
                    ->subject('Password Reset Code');
        });

        return response()->json(['message' => 'تم إرسال كود استعادة كلمة المرور إلى بريدك الإلكتروني']);
    }

    public function reset_password(Request $request)
    {
        $validatedData = $request->validate([
            'user_id' => 'required|integer|exists:users,id',
            'new_password' => 'required|string|min:8|confirmed',
        ]);


        $user = User::find($validatedData['user_id']);
        if ($user) {
            $user->password = Hash::make($validatedData['new_password']);
            $user->save();
        }



        return response()->json(['message' => 'تم إعادة تعيين كلمة المرور بنجاح']);
    }

    public function get_all_users()
    {
        $users = User::all();
        return response()->json($users);
    }

    public function changeStatus(Request $request, $id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }

        $validatedData = $request->validate([
            'status' => 'required|in:active,inactive',
        ]);

        $user->status = $validatedData['status'];
        $user->save();

        return response()->json(['message' => 'User status updated successfully', 'user' => $user]);
    }



     


}
