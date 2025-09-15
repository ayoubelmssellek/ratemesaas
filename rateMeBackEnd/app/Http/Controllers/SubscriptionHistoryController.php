<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\SubscriptionHistory;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class SubscriptionHistoryController extends Controller
{
    public function index (){
        $subscriptionHistories = SubscriptionHistory::with('user:id,name' )->get()->map(function($item) {
            return [
                'id' => $item->id,
                'user_id' => $item->user_id,
                'user_name' => $item->user->name,
                'started_at' => $item->started_at,
                'ends_at' => $item->ends_at,
                'is_active' => $item->is_active,
                'price' => $item->price,
            ];
        } );
        return response()->json($subscriptionHistories);
    }

    public function store (Request $request){
        $validatedData = $request->validate([
            'user_id' => 'required|integer|exists:users,id',
            'duration' => 'required|integer|min:1',
           
        ]);
        $price = 200 * $validatedData['duration'];

       $started_at = Carbon::now(); 
       $ends_at = $started_at->copy()->addMonths($validatedData['duration']); // Assuming 30 days in a month
        DB::beginTransaction();
        try {   
        SubscriptionHistory::where('user_id', $validatedData['user_id'])
            ->where('is_active', true)
            ->update(['is_active' => false]);

        $subscriptionHistory = new SubscriptionHistory();
        $subscriptionHistory->user_id = $validatedData['user_id'];
        $subscriptionHistory->started_at = $started_at;
        $subscriptionHistory->ends_at = $ends_at;
        $subscriptionHistory->is_active = true;
        $subscriptionHistory->price = $price;
        $subscriptionHistory->save();
        DB::commit();
        return response()->json($subscriptionHistory, 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Failed to create subscription history', 'error' => $e->getMessage()], 500);
        }

       
    }

    public function update ($id){
        $subscriptionHistory = SubscriptionHistory::find($id);
        if (!$subscriptionHistory) {
            return response()->json(['message' => 'Subscription history not found'], 404);
        }

        if (!$subscriptionHistory->is_active) {
            return response()->json(['message' => 'Cannot reactivate a subscription history once it is inactive'], 400);
        }

        $subscriptionHistory->is_active = false;

        $subscriptionHistory->save();

        return response()->json($subscriptionHistory);
    }
}
