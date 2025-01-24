import React from 'react';
import { Trophy, Clock, Target, Zap, Award, Calendar } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const StatCard = ({ title, value, icon: Icon, trend, description }) => (
  <Card className="hover:shadow-lg transition-all duration-300">
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-primary/10 rounded-full">
            <Icon className="text-primary h-6 w-6" />
          </div>
          <div>
            <p className="text-sm text-text-muted">{title}</p>
            <h4 className="text-2xl font-bold">{value}</h4>
            {description && (
              <p className="text-sm text-text-muted mt-1">{description}</p>
            )}
          </div>
        </div>
        {trend && (
          <div className={`flex items-center ${trend >= 0 ? 'text-success' : 'text-error'}`}>
            <span className="text-sm">
              {trend >= 0 ? '+' : ''}{trend}%
            </span>
          </div>
        )}
      </div>
    </CardContent>
  </Card>
);

const StatisticsPanel = ({ statistics, loading, error }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-pulse">
        {[...Array(6)].map((_, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="h-20 bg-surface-hover rounded-lg" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Card className="bg-error/10 border-error">
        <CardContent className="p-6 text-error">
          Error loading statistics: {error}
        </CardContent>
      </Card>
    );
  }

  const {
    totalTimeSpent,
    currentStreak,
    completionRate,
    skillsInProgress,
    certificatesEarned,
    daysActive,
    timeSpentTrend,
    streakTrend,
    completionTrend
  } = statistics;

  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `${days}d ${hours % 24}h`;
    if (hours > 0) return `${hours}h ${minutes % 60}m`;
    return `${minutes}m`;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <StatCard
        title="Total Learning Time"
        value={formatTime(totalTimeSpent)}
        icon={Clock}
        trend={timeSpentTrend}
        description="Total time invested in learning"
      />
      
      <StatCard
        title="Current Streak"
        value={`${currentStreak} days`}
        icon={Zap}
        trend={streakTrend}
        description="Consecutive days of learning"
      />
      
      <StatCard
        title="Completion Rate"
        value={`${completionRate}%`}
        icon={Target}
        trend={completionTrend}
        description="Average course completion rate"
      />
      
      <StatCard
        title="Skills in Progress"
        value={skillsInProgress}
        icon={Trophy}
        description="Active learning paths"
      />
      
      <StatCard
        title="Certificates Earned"
        value={certificatesEarned}
        icon={Award}
        description="Total certifications achieved"
      />
      
      <StatCard
        title="Days Active"
        value={daysActive}
        icon={Calendar}
        description="Total active learning days"
      />
    </div>
  );
};

export default StatisticsPanel;