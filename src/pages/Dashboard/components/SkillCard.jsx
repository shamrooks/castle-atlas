import React from 'react';
import { Book, Clock, Trophy, ChevronRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const SkillCard = ({
  skill,
  onContinue,
  className,
  ...props
}) => {
  const {
    id,
    name,
    progress,
    totalLessons,
    completedLessons,
    timeSpent,
    streak,
    difficulty,
    lastAccessed,
    category
  } = skill;

  const getDifficultyColor = (difficulty) => {
    const colors = {
      Beginner: 'bg-success/10 text-success',
      Intermediate: 'bg-warning/10 text-warning',
      Advanced: 'bg-error/10 text-error'
    };
    return colors[difficulty] || 'bg-primary/10 text-primary';
  };

  const formatTimeSpent = (minutes) => {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  const getProgressColor = (progress) => {
    if (progress >= 80) return 'bg-success';
    if (progress >= 50) return 'bg-warning';
    return 'bg-primary';
  };

  return (
    <Card 
      className={`group hover:shadow-lg transition-all duration-300 ${className}`}
      {...props}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="space-y-1">
          <CardTitle className="text-xl font-bold">{name}</CardTitle>
          <p className="text-sm text-text-muted">{category}</p>
        </div>
        <span 
          className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(difficulty)}`}
        >
          {difficulty}
        </span>
      </CardHeader>

      <CardContent>
        {/* Progress Bar */}
        <div className="mt-4">
          <div className="flex justify-between mb-2">
            <span className="text-sm text-text-muted">Progress</span>
            <span className="text-sm font-medium">{progress}%</span>
          </div>
          <div className="relative h-2 w-full bg-surface-hover rounded-full overflow-hidden">
            <div 
              className={`absolute h-full rounded-full transition-all duration-500 ease-in-out ${getProgressColor(progress)}`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="flex flex-col items-center p-3 bg-background-alt rounded-lg">
            <Trophy className="h-5 w-5 text-primary mb-1" />
            <span className="text-sm text-text-muted">Streak</span>
            <span className="text-lg font-bold">{streak}d</span>
          </div>
          <div className="flex flex-col items-center p-3 bg-background-alt rounded-lg">
            <Book className="h-5 w-5 text-primary mb-1" />
            <span className="text-sm text-text-muted">Lessons</span>
            <span className="text-lg font-bold">{completedLessons}/{totalLessons}</span>
          </div>
          <div className="flex flex-col items-center p-3 bg-background-alt rounded-lg">
            <Clock className="h-5 w-5 text-primary mb-1" />
            <span className="text-sm text-text-muted">Time</span>
            <span className="text-lg font-bold">{formatTimeSpent(timeSpent)}</span>
          </div>
        </div>

        {/* Continue Button */}
        <Button
          onClick={() => onContinue(id)}
          className="w-full mt-6 group-hover:bg-primary-dark"
        >
          <span>Continue Learning</span>
          <ChevronRight className="h-4 w-4 ml-2" />
        </Button>

        <p className="text-xs text-text-muted text-center mt-4">
          Last accessed: {new Date(lastAccessed).toLocaleDateString()}
        </p>
      </CardContent>
    </Card>
  );
};

export default SkillCard;