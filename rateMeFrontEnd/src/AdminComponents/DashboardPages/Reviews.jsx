// pages/dashboard/Reviews.jsx
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/cart/card';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select/select';
import { Search, Filter, Star, Download, MessageSquare, Calendar, Hash, BarChart3 } from 'lucide-react';
import { Skeleton } from '../../ui/skeleton';
import { useQuery } from '@tanstack/react-query';
import { myReviews } from '../../API/reviews';

const ReviewCard = ({ review, loading }) => {
  const { t } = useTranslation();

  if (loading) {
    return (
      <div className="border border-border/40 rounded-xl p-5 space-y-4 bg-card/50 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <Skeleton className="h-5 w-32 rounded-full" />
          <Skeleton className="h-6 w-16 rounded-full" />
        </div>
        <Skeleton className="h-4 w-full rounded" />
        <Skeleton className="h-4 w-3/4 rounded" />
        <div className="flex justify-between">
          <Skeleton className="h-3 w-20 rounded-full" />
          <Skeleton className="h-3 w-24 rounded-full" />
        </div>
      </div>
    );
  }

  // Calculate average rating from all rating items
  const averageRating = review.ratings && review.ratings.length > 0 
    ? review.ratings.reduce((sum, rating) => sum + rating.score, 0) / review.ratings.length 
    : 0;

  return (
    <div className="border border-border/40 rounded-xl p-5 bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300 hover:border-primary/20 group">
      {/* Header with ID and Date */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
            <Hash className="w-3.5 h-3.5 text-primary" />
          </div>
          <span className="text-sm font-medium text-muted-foreground">#{review.id}</span>
        </div>
        
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Calendar className="w-3.5 h-3.5" />
          <span>{review.created_at ? new Date(review.created_at).toLocaleDateString() : 'No date'}</span>
        </div>
      </div>

      {/* Average Rating */}
      <div className="flex items-center justify-between mb-4 p-3 bg-muted/30 rounded-lg">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium">Overall Rating</span>
        </div>
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 transition-transform ${
                i < Math.round(averageRating)
                  ? "text-yellow-400 fill-yellow-400 group-hover:scale-110"
                  : "text-muted-foreground"
              }`}
            />
          ))}
          <span className="ml-1 text-sm font-semibold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            {averageRating.toFixed(1)}
          </span>
        </div>
      </div>
      
      {/* Description */}
      <div className="mb-4">
        <p className="text-sm text-foreground/80 leading-relaxed bg-muted/20 p-3 rounded-lg border border-border/20">
          {review.description || "No description provided"}
        </p>
      </div>
      
      {/* Individual Ratings */}
      {review.ratings && review.ratings.length > 0 && (
        <div className="space-y-3 mb-4">
          <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Rating Details</h4>
          {review.ratings.map((rating, index) => (
            <div key={index} className="flex items-center justify-between p-2 bg-muted/10 rounded-lg hover:bg-muted/20 transition-colors">
              <span className="text-xs font-medium capitalize text-foreground/70">{rating.rating_item.toLowerCase()}</span>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3 h-3 ${
                      i < rating.score
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-muted-foreground/50"
                    }`}
                  />
                ))}
                <span className="ml-1 text-xs font-semibold text-primary">({rating.score})</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default function Reviews() {
  const { t } = useTranslation();

  const [filters, setFilters] = useState({
    rating: 'all',
    search: '',
    period: 'all'
  });
  
  const { data: reviews, isLoading, error } = useQuery({
    queryKey: ['reviews', filters],
    queryFn: myReviews,
    keepPreviousData: true,
  });
  
  console.log("reviews data:", reviews);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  // Filter reviews based on selected filters
  const filteredReviews = reviews?.filter(review => {
    // Search filter
    if (filters.search && !review.description?.toLowerCase().includes(filters.search.toLowerCase())) {
      return false;
    }
    
    // Rating filter
    if (filters.rating !== 'all') {
      const averageRating = review.ratings && review.ratings.length > 0 
        ? review.ratings.reduce((sum, rating) => sum + rating.score, 0) / review.ratings.length 
        : 0;
      
      if (Math.round(averageRating) !== parseInt(filters.rating)) {
        return false;
      }
    }
    
    // Period filter
    if (filters.period !== 'all' && review.created_at) {
      const reviewDate = new Date(review.created_at);
      const now = new Date();
      
      switch (filters.period) {
        case 'week':
          const oneWeekAgo = new Date(now.setDate(now.getDate() - 7));
          return reviewDate >= oneWeekAgo;
        case 'month':
          const oneMonthAgo = new Date(now.setMonth(now.getMonth() - 1));
          return reviewDate >= oneMonthAgo;
        case 'year':
          const oneYearAgo = new Date(now.setFullYear(now.getFullYear() - 1));
          return reviewDate >= oneYearAgo;
        default:
          return true;
      }
    }
    
    return true;
  });

  return (
    <div className="space-y-6 p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 p-4 bg-gradient-to-r from-card to-card/50 rounded-2xl border border-border/30">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            {t('reviewsPage.title')}
          </h1>
          <p className="text-muted-foreground text-sm md:text-base">{t('reviewsPage.subtitle')}</p>
        </div>
        <Button className="gap-2 bg-primary hover:bg-primary/90 transition-all duration-300 transform hover:scale-105">
          <Download className="w-4 h-4" />
          {t('reviewsPage.export')}
        </Button>
      </div>

      {/* Filters */}
      <Card className="border-border/30 bg-card/50 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <CardTitle className="text-lg flex items-center gap-2">
              <Filter className="w-5 h-5 text-primary" />
              {t('reviewsPage.filters')}
            </CardTitle>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>{t('reviewsPage.filterBy')}</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder={t('reviewsPage.searchPlaceholder')}
                className="pl-10 pr-4 py-2 rounded-lg border-border/50 focus:border-primary/50 transition-colors"
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              {/* Filter by Rating */}
              <Select value={filters.rating} onValueChange={(value) => handleFilterChange('rating', value)}>
                <SelectTrigger className="w-full sm:w-[160px] rounded-lg border-border/50">
                  <SelectValue placeholder={t('reviewsPage.rating')} />
                </SelectTrigger>
                <SelectContent className="rounded-lg border-border/30">
                  <SelectItem value="all">{t('reviewsPage.allRatings')}</SelectItem>
                  <SelectItem value="5">5 {t('reviewsPage.stars')}</SelectItem>
                  <SelectItem value="4">4 {t('reviewsPage.stars')}</SelectItem>
                  <SelectItem value="3">3 {t('reviewsPage.stars')}</SelectItem>
                  <SelectItem value="2">2 {t('reviewsPage.stars')}</SelectItem>
                  <SelectItem value="1">1 {t('reviewsPage.star')}</SelectItem>
                </SelectContent>
              </Select>

              {/* Filter by Period */}
              <Select value={filters.period} onValueChange={(value) => handleFilterChange('period', value)}>
                <SelectTrigger className="w-full sm:w-[160px] rounded-lg border-border/50">
                  <SelectValue placeholder={t('reviewsPage.period')} />
                </SelectTrigger>
                <SelectContent className="rounded-lg border-border/30">
                  <SelectItem value="all">{t('reviewsPage.allTime')}</SelectItem>
                  <SelectItem value="week">{t('reviewsPage.thisWeek')}</SelectItem>
                  <SelectItem value="month">{t('reviewsPage.thisMonth')}</SelectItem>
                  <SelectItem value="year">{t('reviewsPage.thisYear')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Count */}
      {!isLoading && !error && (
        <div className="flex items-center justify-between px-2">
          <span className="text-sm text-muted-foreground">
            Showing {filteredReviews?.length || 0} of {reviews?.length || 0} reviews
          </span>
          {filters.rating !== 'all' || filters.period !== 'all' || filters.search ? (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setFilters({ rating: 'all', search: '', period: 'all' })}
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              Clear filters
            </Button>
          ) : null}
        </div>
      )}

      {/* Reviews Grid */}
      {error ? (
        <Card className="border-border/30 bg-card/50 backdrop-blur-sm">
          <CardContent className="flex items-center justify-center h-64">
            <div className="text-center space-y-4">
              <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto opacity-60" />
              <h3 className="text-lg font-medium text-foreground/80">{t('reviewsPage.errorTitle')}</h3>
              <p className="text-muted-foreground text-sm">{t('reviewsPage.errorDesc')}</p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {isLoading
            ? Array.from({ length: 6 }).map((_, i) => <ReviewCard key={i} loading={true} />)
            : filteredReviews?.map((review) => <ReviewCard key={review.id} review={review} />)
          }
        </div>
      )}

      {!isLoading && filteredReviews?.length === 0 && (
        <Card className="border-border/30 bg-card/50 backdrop-blur-sm">
          <CardContent className="flex items-center justify-center h-64">
            <div className="text-center space-y-4">
              <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto opacity-60" />
              <h3 className="text-lg font-medium text-foreground/80">
                {reviews?.length === 0 ? t('reviewsPage.noReviewsTitle') : t('reviewsPage.noFilteredReviewsTitle')}
              </h3>
              <p className="text-muted-foreground text-sm">
                {reviews?.length === 0 ? t('reviewsPage.noReviewsDesc') : t('reviewsPage.noFilteredReviewsDesc')}
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}