// pages/dashboard/DashboardOverview.js
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/cart/card";
import { Button } from "../ui/button";
import {
  TrendingUp,
  TrendingDown,
  Star,
  QrCode,
  BarChart3,
  MessageSquare,
  Target,
  Award,
  Calendar,
  Users,
  Eye
} from "lucide-react";
import { Skeleton } from "../ui/skeleton";
import {  getDashboardStats } from "../API/statistics";

// -------- UI Components --------
const StatCard = ({ title, value, change, icon: Icon, loading, color = "blue" }) => {
  const colorClasses = {
    blue: 'bg-blue-50 border-blue-100 text-blue-600 dark:bg-blue-900/20 dark:border-blue-800/50 dark:text-blue-300',
    green: 'bg-green-50 border-green-100 text-green-600 dark:bg-green-900/20 dark:border-green-800/50 dark:text-green-300',
    purple: 'bg-purple-50 border-purple-100 text-purple-600 dark:bg-purple-900/20 dark:border-purple-800/50 dark:text-purple-300',
    orange: 'bg-orange-50 border-orange-100 text-orange-600 dark:bg-orange-900/20 dark:border-orange-800/50 dark:text-orange-300',
  };

  if (loading) {
    return (
      <Card className="border-border/30 bg-card/50 backdrop-blur-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-6 w-6 rounded-full" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-8 w-16 mb-2" />
          <Skeleton className="h-4 w-32" />
        </CardContent>
      </Card>
    );
  }

  const isPositive = change > 0;
  const changeText = isPositive ? `+${change}` : change;

  return (
    <Card className={`border-border/30 bg-card/50 backdrop-blur-sm ${colorClasses[color]}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="w-8 h-8 bg-white/50 dark:bg-black/20 rounded-full flex items-center justify-center">
          <Icon className="w-4 h-4" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {change !== undefined && (
          <p className={`text-xs flex items-center mt-1 ${
            isPositive ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
          }`}>
            {isPositive ? (
              <TrendingUp className="w-3 h-3 mr-1" />
            ) : (
              <TrendingDown className="w-3 h-3 mr-1" />
            )}
            {changeText} from yesterday
          </p>
        )}
      </CardContent>
    </Card>
  );
};

const RatingItem = ({ item, rank, loading }) => {
  if (loading) {
    return (
      <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
        <div className="flex items-center">
          <Skeleton className="w-8 h-8 rounded-full mr-3" />
          <Skeleton className="h-4 w-32" />
        </div>
        <Skeleton className="h-6 w-16" />
      </div>
    );
  }

  const rating = parseFloat(item.average_rating) || 0;
  
  return (
    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-900/50 rounded-xl border border-gray-200 dark:border-gray-700">
      <div className="flex items-center">
        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-4">
          <span className="text-sm font-medium text-white">
            {rank}
          </span>
        </div>
        <div>
          <p className="font-medium capitalize text-gray-900 dark:text-white">
            {item.name || item.rating_item?.toLowerCase() || `Item ${rank}`}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {item.total_ratings || 0} ratings
          </p>
        </div>
      </div>
      <div className="flex items-center">
        <div className="flex items-center mr-3">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < Math.floor(rating) 
                  ? "text-yellow-400 fill-yellow-400" 
                  : (i === Math.floor(rating) && rating % 1 >= 0.5 ? "text-yellow-400 fill-yellow-400" : "text-gray-300")
              }`}
            />
          ))}
        </div>
        <span className="font-bold text-lg text-gray-900 dark:text-white">
          {rating.toFixed(1)}
        </span>
      </div>
    </div>
  );
};

export default function DashboardOverview() {
  const { t } = useTranslation();

  const { data, isLoading, error } = useQuery({
    queryKey: ["dashboardData"],
    queryFn: getDashboardStats,
  });

  if (error) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="text-2xl font-bold text-red-600 mb-2">
            {t("error_loading")}
          </div>
          <p className="text-gray-600 dark:text-gray-400">{t("please_try_again_later")}</p>
        </div>
      </div>
    );
  }

  const todayData = data || {};
  const currentDate = todayData.date || new Date().toLocaleDateString();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{t("dashboardOverview")}</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">{t("welcome")}</p>
        </div>
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
          <Calendar className="w-4 h-4 mr-2" />
          {currentDate}
        </div>
      </div>

      {/* Stats Grid with Today's Values */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title={t("reviews_today")}
          value={todayData.reviews_today || 0}
          change={todayData.reviews_diff}
          icon={MessageSquare}
          loading={isLoading}
          color="blue"
        />
        <StatCard
          title={t("qr_scans_today")}
          value={todayData.qr_scans_today || 0}
          change={todayData.qr_scans_diff}
          icon={Eye}
          loading={isLoading}
          color="green"
        />
        <StatCard
          title={t("new_customers_today")}
          value={todayData.new_customers_today || 0}
          change={todayData.new_customers_diff}
          icon={Users}
          loading={isLoading}
          color="purple"
        />
        <StatCard
          title={t("average_rating_today")}
          value={`${todayData.average_rating_today?.toFixed(1) || 0.0}/5`}
          change={todayData.average_rating_diff}
          icon={Star}
          loading={isLoading}
          color="orange"
        />
      </div>

      {/* Rating Distribution and Top Rated Items in one row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Rating Distribution */}
        <Card className="border-border/30 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg text-gray-900 dark:text-white">{t("ratingBreakdown")}</CardTitle>
            <CardDescription>{t("ratingBreakdownDescription")}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {isLoading ? (
                [5, 4, 3, 2, 1].map((stars) => (
                  <div key={stars} className="flex items-center">
                    <Skeleton className="w-16 h-4" />
                    <Skeleton className="flex-1 mx-4 h-3 rounded-full" />
                    <Skeleton className="w-12 h-4" />
                  </div>
                ))
              ) : todayData.rating_breakdown_today ? (
                todayData.rating_breakdown_today.map((item) => (
                  <div key={item.star} className="flex items-center">
                    <div className="w-16 flex items-center">
                      <span className="text-sm font-medium w-6">{item.star}</span>
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 ml-1" />
                    </div>
                    <div className="flex-1 mx-4">
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-1000"
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                    </div>
                    <div className="w-12 text-right text-sm font-medium text-gray-900 dark:text-white">
                      {item.percentage}%
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  <Star className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>{t("no_ratings_yet")}</p>
                  <p className="text-sm mt-1">{t("ratings_will_appear_here")}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Top Rated Items Today */}
        <Card className="border-border/30 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg text-gray-900 dark:text-white">{t("topRatedItemsToday")}</CardTitle>
            <CardDescription>{t("highestRatedAspectsToday")}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {isLoading ? (
                [1, 2, 3].map((i) => (
                  <RatingItem key={i} loading={true} />
                ))
              ) : todayData.top_rated_items_today?.length > 0 ? (
                todayData.top_rated_items_today.slice(0, 3).map((item, index) => (
                  <RatingItem 
                    key={item.id || index} 
                    item={item} 
                    rank={index + 1} 
                    loading={isLoading}
                  />
                ))
              ) : (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  <Award className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>{t("no_ratings_today")}</p>
                  <p className="text-sm mt-1">{t("ratings_will_appear_here_today")}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions - Last Section */}
      <Card className="border-border/30 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-lg text-gray-900 dark:text-white">{t("quickActions")}</CardTitle>
          <CardDescription>{t("manageReviewSystem")}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            <Button className="w-full justify-start h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              <QrCode className="w-5 h-5 mr-3" />
              {t("generateQr")}
            </Button>
            <Button variant="outline" className="w-full justify-start h-12">
              <BarChart3 className="w-5 h-5 mr-3" />
              {t("seeAnalytics")}
            </Button>
            <Button variant="outline" className="w-full justify-start h-12">
              <Star className="w-5 h-5 mr-3" />
              {t("viewAllReviews")}
            </Button>
            <Button variant="outline" className="w-full justify-start h-12">
              <TrendingUp className="w-5 h-5 mr-3" />
              {t("performanceReport")}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}