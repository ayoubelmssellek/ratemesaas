// pages/dashboard/DashboardOverview.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
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
  Users,
  Star,
  Eye,
  QrCode,
  Download,
  BarChart3,
  Utensils,
  Sparkles,
} from "lucide-react";
import { Skeleton } from "../ui/skeleton";

import { getDashboardData } from "../API/statistics";

// -------- UI Components --------
const StatCard = ({ title, value, change, icon: Icon, loading }) => {
  if (loading) {
    return (
      <Card>
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

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
          <Icon className="w-4 h-4 text-primary" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p
          className={`text-xs ${
            change.includes("+") ? "text-green-600" : "text-red-600"
          }`}
        >
          {change}
        </p>
      </CardContent>
    </Card>
  );
};

export default function DashboardOverview() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["dashboardData"],
    queryFn: getDashboardData,
  });

  console.log("Dashboard data:", data);

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="text-2xl font-bold text-destructive">
            {t("errorLoading")}
          </div>
          <p className="text-muted-foreground mt-2">{t("tryLater")}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">{t("dashboardOverview")}</h1>
          <p className="text-muted-foreground">{t("welcome")}</p>
        </div>
        <Button>
          <Download className="w-4 h-4 mr-2" />
          {t("exportReviews")}
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          title={t("totalReviews")}
          value={data?.total_reviews || 0}
          change={`+12 ${t("sinceLastMonth")}`}
          icon={BarChart3}
          loading={isLoading}
        />
        <StatCard
          title={t("averageRating")}
          value={`${data?.average_rating || 0}/5`}
          change="+0.2 from last month"
          icon={Star}
          loading={isLoading}
        />
        <StatCard
          title={t("topRatedItems")}
          value={data?.top_rated_items?.length || 0}
          change="+2 this month"
          icon={Sparkles}
          loading={isLoading}
        />
      </div>

      {/* Top Rated Items */}
      {data?.top_rated_items && data.top_rated_items.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>{t("topRatedItems")}</CardTitle>
            <CardDescription>{t("highestRatedAspects")}</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-4">
                {[1, 2].map((i) => (
                  <div key={i} className="flex items-center justify-between">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-6 w-16" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {data.top_rated_items.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
                  >
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                        <span className="text-sm font-medium text-primary">
                          {index + 1}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium capitalize">
                          {item.rating_item?.toLowerCase() || `Item ${index + 1}`}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 mr-1" />
                      <span className="font-medium">{item.average_rating || 0}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Rating Distribution - Simplified version since we don't have distribution data */}
      <Card>
        <CardHeader>
          <CardTitle>{t("ratingBreakdown")}</CardTitle>
          <CardDescription>{t("ratingBreakdownDescription")}</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center justify-between">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-2 w-24 rounded-full" />
                  <Skeleton className="h-4 w-8" />
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {data?.top_rated_items?.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between"
                >
                  <div className="w-40">
                    <p className="text-sm font-medium capitalize">
                      {item.rating_item?.toLowerCase()}
                    </p>
                  </div>
                  <div className="flex-1 mx-4">
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full"
                        style={{ width: `${(item.average_rating / 5) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div className="w-8 text-right text-sm font-medium">
                    {item.average_rating}/5
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>{t("quickActions")}</CardTitle>
          <CardDescription>{t("manageReviewSystem")}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Button className="w-full justify-start">
              <QrCode className="w-4 h-4 mr-2" />
              {t("generateQr")}
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Download className="w-4 h-4 mr-2" />
              {t("exportReviews")}
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Star className="w-4 h-4 mr-2" />
              {t("viewAllReviews")}
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <TrendingUp className="w-4 h-4 mr-2" />
              {t("seeAnalytics")}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}