<?php

namespace App\Http\Controllers;

use App\Models\RatingItem;
use Illuminate\Http\Request;

class StatisticsController extends Controller
{
public function statistics()
{
    $user = auth()->user();
    if (!$user) {
        return response()->json(['message' => 'Unauthorized'], 401);
    }

    // Fetch user statistics
    $totalReviews = $user->reviews()->count();

    // Load all review ratings once (avoid repeated queries)
    $allRatings = $user->reviews()
        ->with('reviewRatings.ratingItem')
        ->get()
        ->flatMap(function ($review) {
            return $review->reviewRatings;
        });

    // Calculate average rating
    $averageRating = $allRatings->avg('rating') ?? 0;

    // Get top rated items
    $topRatedItems = $allRatings
        ->groupBy('rating_item_id')
        ->map(function ($ratings, $itemId) {
            $ratingItem = $ratings->first()->ratingItem;
            return [
                'id' => $itemId,
                'name' => $ratingItem->name,
                'average_rating' => round($ratings->avg('rating'), 2),
                'total_ratings' => $ratings->count()
            ];
        })
        ->sortByDesc('average_rating')
        ->take(5)
        ->values();

    // Get rating distribution (1-5 stars)
    $ratingDistribution = collect(range(1, 5))->map(function ($rating) use ($allRatings, $totalReviews) {
        $count = $allRatings->where('rating', $rating)->count();

        return [
            'star' => $rating,
            'count' => $count,
            'percentage' => $totalReviews > 0 ? round(($count / $totalReviews) * 100, 2) : 0
        ];
    })->sortByDesc('star')->values();

    // Get recent reviews activity (last 30 days)
    $recentActivity = $user->reviews()
        ->where('created_at', '>=', now()->subDays(30))
        ->selectRaw('DATE(created_at) as date, COUNT(*) as count')
        ->groupBy('date')
        ->orderBy('date')
        ->get()
        ->map(function ($item) {
            return [
                'date' => $item->date,
                'count' => $item->count
            ];
        });

    // Get weekly reviews data for current year
    $currentYear = date('Y');
    // Get monthly reviews data for current year
  $monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// Get reviews grouped by month for current year
$reviewsData = $user->reviews()
    ->whereYear('created_at', $currentYear)
    ->selectRaw('YEAR(created_at) as year, MONTH(created_at) as month, COUNT(*) as count')
    ->groupBy('year', 'month')
    ->orderBy('month')
    ->get();

// Map to full 12-month array
$monthlyReviews = collect(range(1, 12))->map(function ($month) use ($reviewsData, $monthNames, $currentYear) {
    // Find if we have data for this month
    $item = $reviewsData->firstWhere('month', $month);

    return [
        'year' => $currentYear,
        'month' => $month,
        'count' => $item->count ?? 0,
        'label' => $monthNames[$month - 1] ?? 'Unknown',
    ];
});


    // Get available years for filtering
    $availableYears = $user->reviews()
        ->selectRaw('YEAR(created_at) as year')
        ->groupBy('year')
        ->orderBy('year', 'desc')
        ->pluck('year');

    return response()->json([
        'total_reviews' => $totalReviews,
        'average_rating' => round($averageRating, 2),
        'top_rated_items' => $topRatedItems,
        'rating_distribution' => $ratingDistribution,
        'recent_activity' => $recentActivity,
        'monthly_reviews' => $monthlyReviews,
        'available_years' => $availableYears,
        'current_year' => $currentYear,
        'summary' => [
            'excellent_ratings' => $ratingDistribution->firstWhere('star', 5)['count'] ?? 0,
            'good_ratings' => $ratingDistribution->firstWhere('star', 4)['count'] ?? 0,
            'average_ratings' => $ratingDistribution->firstWhere('star', 3)['count'] ?? 0,
            'poor_ratings' => $ratingDistribution->whereIn('star', [1, 2])->sum('count')
        ]
    ]);
}


}