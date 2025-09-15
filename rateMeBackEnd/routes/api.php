<?php 

use App\Http\Controllers\FeedBackController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EmailVerificationController;
use App\Http\Controllers\UserController;

Route::post('/register', [UserController::class, 'register']);
Route::post('/verify-email', [EmailVerificationController::class, 'verifyEmail']);
Route::post('/login', [UserController::class, 'login']);
Route::post('/forgot-password', [UserController::class, 'forgot_password']);
Route::post('/reset-password', [UserController::class, 'reset_password']);
Route::get('/shownFeedbacks',[FeedBackController::class , 'getShownFeedbacks']);
Route::post('/review/{id}', [\App\Http\Controllers\ReviewController::class, 'store']);
Route::get('/review/{id}', [\App\Http\Controllers\ReviewController::class, 'getRatingItems']);

Route::middleware([ 'jwt', 'role:admin'])->group(function () {
    Route::apiResource('/profile-wifi-info', \App\Http\Controllers\ProfileWifiInfoController::class);
    Route::apiResource('/social-media-usernames', \App\Http\Controllers\SocialMediaUserNameController::class);
    Route::post('/addFeedBack',[FeedBackController::class , 'store']);
    Route::get('/myReviews', [\App\Http\Controllers\ReviewController::class, 'index']);
    Route::apiResource('/userRatingItems', \App\Http\Controllers\UserRatingItemsController::class);
    Route::get('/statistics', [\App\Http\Controllers\StatisticsController::class, 'statistics']);
});


 Route::middleware([ 'jwt','auth:api'])->group(function () {
    Route::post('/change-password', [UserController::class, 'change_password']);
    Route::post('/logout', [UserController::class, 'logout']);
    Route::get('/me', [UserController::class, 'me']);
    Route::post('/update-profile', [UserController::class, 'update_user_info']);

});


Route::middleware([ 'jwt', 'role:super_admin'])->group(function () {
    Route::get('/feedBacks',[FeedBackController::class , 'index']);
    Route::patch('/feedBacks/{id}',[FeedBackController::class , 'update']);
    Route::apiResource('/types', \App\Http\Controllers\TypeController::class);
    Route::apiResource('/roles', \App\Http\Controllers\RoleController::class);
    Route::apiResource('/social-media-platforms', \App\Http\Controllers\SocialMediaPlatformController::class);
    Route::apiResource('/type-rating-items', \App\Http\Controllers\TypeRatingItemsController::class);
    Route::apiResource('/rating-items', \App\Http\Controllers\RatingItemController::class);
    Route::apiResource('subscription-histories', \App\Http\Controllers\SubscriptionHistoryController::class);
    Route::patch('/users/{id}/status', [UserController::class, 'changeStatus']);
    Route::get('/users', [UserController::class, 'get_all_users']);
});

