// pages/dashboard/Statistics.jsx
import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/cart/card';
import { Button } from '../../ui/button';
import { Skeleton } from '../../ui/skeleton';
import { 
  Star, TrendingUp, Download, BarChart3, 
  Users, MessageSquare, Calendar, Filter,
  ChevronLeft, ChevronRight, ArrowUp, ArrowDown,
  PieChart, Target, Crown, Sparkles, ThumbsUp
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { getDashboardData } from '../../API/statistics';
import BarChart from './BarChart';
import { useTranslation } from "react-i18next";

// Modern Metric Card Component
const MetricCard = ({ title, value, icon: Icon, color, loading, format, subtitle }) => {
  if (loading) {
    return (
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-5 h-full border border-gray-200 dark:border-gray-700 shadow-sm">
        <Skeleton className="w-10 h-10 rounded-xl mb-4" />
        <Skeleton className="h-7 w-16 mb-2" />
        <Skeleton className="h-4 w-24" />
      </div>
    );
  }

  const colorConfig = {
    blue: {
      bg: 'from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/20',
      icon: 'bg-blue-500',
      text: 'text-blue-700 dark:text-blue-300',
    },
    purple: {
      bg: 'from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/20',
      icon: 'bg-purple-500',
      text: 'text-purple-700 dark:text-purple-300',
    },
    green: {
      bg: 'from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/20',
      icon: 'bg-green-500',
      text: 'text-green-700 dark:text-green-300',
    },
    orange: {
      bg: 'from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/20',
      icon: 'bg-orange-500',
      text: 'text-orange-700 dark:text-orange-300',
    }
  };

  const config = colorConfig[color] || colorConfig.blue;

  return (
    <div className={`bg-gradient-to-br ${config.bg} rounded-2xl p-5 h-full border border-gray-200 dark:border-gray-700 shadow-sm`}>
      <div className="flex justify-between items-start mb-4">
        <div className={`p-2 rounded-lg ${config.icon} bg-opacity-10`}>
          <Icon className={`w-5 h-5 ${config.text}`} />
        </div>
      </div>
      
      <div className="mb-1">
        <h3 className={`text-2xl font-bold ${config.text}`}>
          {format === 'percent' ? `${value}%` : value}
        </h3>
      </div>
      
      <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">{title}</p>
      {subtitle && <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{subtitle}</p>}
    </div>
  );
};

// Modern Rating Distribution Component
const RatingDistribution = ({ data, loading }) => {
  const { t } = useTranslation();

  if (loading) {
    return (
      <Card className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 shadow-sm">
        <Skeleton className="h-6 w-48 mb-6 rounded-full" />
        {[1, 2, 3, 4, 5].map((item) => (
          <div key={item} className="flex items-center mb-4">
            <Skeleton className="h-4 w-16 mr-4 rounded-full" />
            <Skeleton className="h-3 flex-1 rounded-full" />
            <Skeleton className="h-4 w-12 ml-4 rounded-full" />
          </div>
        ))}
      </Card>
    );
  }

  return (
    <Card className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-6">{t("rating_distribution")}</h3>
      
      {data?.map((item) => (
        <div key={item.star} className="flex items-center mb-4">
          <div className="flex items-center w-16">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 w-6">{item.star}</span>
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 ml-2" />
          </div>
          
          <div className="flex-1 mx-4">
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
              <div
                className="bg-gradient-to-r from-blue-500 to-purple-600 h-2.5 rounded-full transition-all duration-700"
                style={{ width: `${item.percentage}%` }}
              />
            </div>
          </div>
          
          <div className="text-sm font-medium text-gray-700 dark:text-gray-300 w-12 text-right">
            {item.percentage}%
          </div>
        </div>
      ))}
    </Card>
  );
};

// Summary Metrics Component
const SummaryMetrics = ({ summary, loading }) => {
  const { t } = useTranslation();

  if (loading) {
    return (
      <Card className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 shadow-sm">
        <Skeleton className="h-6 w-48 mb-6 rounded-full" />
        <div className="grid grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((item) => (
            <Skeleton key={item} className="h-20 rounded-xl" />
          ))}
        </div>
      </Card>
    );
  }

  if (!summary) return null;

  const metrics = [
    {
      title: t("excellent"),
      value: summary.excellent_ratings || 0,
      color: "green",
      icon: ThumbsUp,
      description: t("five_star_ratings")
    },
    {
      title: t("good"),
      value: summary.good_ratings || 0,
      color: "blue",
      icon: Star,
      description: t("four_star_ratings")
    },
    {
      title: t("average"),
      value: summary.average_ratings || 0,
      color: "orange",
      icon: PieChart,
      description: t("three_star_ratings")
    },
    {
      title: t("poor"),
      value: summary.poor_ratings || 0,
      color: "purple",
      icon: TrendingUp,
      description: t("one_two_star_ratings")
    }
  ];

  return (
    <Card className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-6">{t("rating_summary")}</h3>
      
      <div className="grid grid-cols-2 gap-4">
        {metrics.map((metric, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="flex items-center mb-2">
              <div className={`p-2 rounded-lg bg-${metric.color}-100 dark:bg-${metric.color}-900/30 mr-3`}>
                <metric.icon className={`w-5 h-5 text-${metric.color}-600 dark:text-${metric.color}-400`} />
              </div>
              <span className="text-2xl font-bold text-gray-800 dark:text-white">{metric.value}</span>
            </div>
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{metric.title}</p>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{metric.description}</p>
          </div>
        ))}
      </div>
    </Card>
  );
};

// Top Rated Items Component
const TopRatedItems = ({ data, loading }) => {
  const { t } = useTranslation();

  if (loading) {
    return (
      <Card className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 shadow-sm">
        <Skeleton className="h-6 w-48 mb-6 rounded-full" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2].map((item) => (
            <Skeleton key={item} className="h-24 rounded-xl" />
          ))}
        </div>
      </Card>
    );
  }

  if (!data || data.length === 0) return null;

  return (
    <Card className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{t("top_rated_categories")}</h3>
        <Crown className="w-5 h-5 text-yellow-500" />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.map((item, index) => {
          const rating = parseFloat(item.average_rating) || 0;
          const fullStars = Math.floor(rating);
          const hasHalfStar = rating % 1 >= 0.5;
          
          return (
            <div key={item.id} className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-3">
                <h4 className="font-semibold text-gray-800 dark:text-white capitalize truncate">
                  {item.name}
                </h4>
                <span className="text-sm font-bold bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 px-2 py-1 rounded-full">
                  {rating.toFixed(1)}/5
                </span>
              </div>
              
              <div className="flex items-center mb-2">
                <div className="flex items-center mr-2">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="relative">
                      <Star
                        className={`w-4 h-4 ${
                          i < fullStars 
                            ? "text-yellow-400 fill-yellow-400" 
                            : (i === fullStars && hasHalfStar ? "text-yellow-400 fill-yellow-400" : "text-gray-300")
                        }`}
                      />
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="text-xs text-gray-500 dark:text-gray-500">
                {t("based_on_ratings", { count: item.total_ratings })}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

// Main Statistics Component
export default function Statistics() {
  const { t } = useTranslation();
  const { data, isLoading, error } = useQuery({
    queryKey: ['statistics'],
    queryFn: getDashboardData,
    staleTime: 1000 * 60 * 5,
  });

  if (error) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="text-2xl font-bold text-red-600 mb-2">
            {t("failed_to_load_statistics")}
          </div>
          <p className="text-gray-600 dark:text-gray-400">{t("please_try_again_later")}</p>
          <Button className="mt-4">{t("retry")}</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4 sm:p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{t("review_analytics")}</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">{t("track_and_analyze_feedback")}</p>
        </div>
        <Button className="gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-md">
          <Download className="w-4 h-4" />
          {t("export_report")}
        </Button>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <MetricCard
          title={t("total_reviews")}
          value={isLoading ? 0 : data?.total_reviews}
          icon={MessageSquare}
          color="blue"
          loading={isLoading}
        />
        <MetricCard
          title={t("average_rating")}
          value={isLoading ? 0 : data?.average_rating?.toFixed(1)}
          icon={Star}
          color="purple"
          loading={isLoading}
          subtitle={t("out_of_5")}
        />
        <MetricCard
          title={t("excellent_ratings")}
          value={isLoading ? 0 : data?.summary?.excellent_ratings}
          icon={ThumbsUp}
          color="green"
          loading={isLoading}
          subtitle={t("five_star_reviews")}
        />
        <MetricCard
          title={t("rating_categories")}
          value={isLoading ? 0 : data?.top_rated_items?.length}
          icon={Target}
          color="orange"
          loading={isLoading}
          subtitle={t("tracked_items")}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Rating Distribution */}
        <div className="lg:col-span-1">
          <RatingDistribution 
            data={data?.rating_distribution} 
            loading={isLoading} 
          />
        </div>

        {/* Summary Metrics */}
        <div className="lg:col-span-2">
          <SummaryMetrics 
            summary={data?.summary} 
            loading={isLoading} 
          />
        </div>
      </div>

      {/* Monthly Reviews */}
      {data?.monthly_reviews && data.monthly_reviews.length > 0 && (
        <Card className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{t("monthly_reviews")}</h3>
            <p className="text-gray-600 dark:text-gray-400">{t("review_distribution_by_month", {year: data.current_year})}</p>
          </div>
          <BarChart 
            data={data.monthly_reviews.filter(item => item.year === data.current_year)} 
            withModal={false} 
          />
        </Card>
      )}

      {/* Top Rated Items */}
      <TopRatedItems 
        data={data?.top_rated_items} 
        loading={isLoading} 
      />

      {/* Empty State */}
      {!isLoading && (!data || data.total_reviews === 0) && (
        <Card className="p-8 text-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <BarChart3 className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">{t("no_reviews_yet")}</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4 max-w-md mx-auto">
            {t("no_reviews_description")}
          </p>
          <Button variant="outline" className="gap-2">
            <Sparkles className="w-4 h-4" />
            {t("learn_how_to_get_reviews")}
          </Button>
        </Card>
      )}
    </div>
  );
}
