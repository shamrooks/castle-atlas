import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Trophy, Book, Clock, Target, ArrowUp, Zap } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const LearningDashboard = () => {
  const [skills, setSkills] = useState([
    {
      id: 1,
      name: 'Web Development',
      progress: 30,
      totalLessons: 20,
      completedLessons: 6,
      streak: 5,
      timeSpent: 45,
      lastAccessed: new Date().toISOString(),
      progressHistory: [
        { date: '2025-01-01', progress: 10 },
        { date: '2025-01-07', progress: 20 },
        { date: '2025-01-14', progress: 30 }
      ],
      difficulty: 'Intermediate'
    },
    // ... other skills data ...
  ]);

  const [isUpdating, setIsUpdating] = useState(false);
  const [activeSkill, setActiveSkill] = useState(null);
  
  // Calculate overall statistics
  const overallProgress = skills.reduce((acc, skill) => acc + skill.progress, 0) / skills.length;
  const totalTimeSpent = skills.reduce((acc, skill) => acc + skill.timeSpent, 0);
  const highestStreak = Math.max(...skills.map(skill => skill.streak));
  const totalLessonsCompleted = skills.reduce((acc, skill) => acc + skill.completedLessons, 0);

  const handleProgressUpdate = async (skillId) => {
    setIsUpdating(true);
    try {
      // Find the skill to update
      const skillIndex = skills.findIndex(skill => skill.id === skillId);
      if (skillIndex === -1) return;

      const skill = skills[skillIndex];
      
      // Simulate progress update (replace with actual API call)
      const newProgress = Math.min(100, skill.progress + 10);
      const now = new Date().toISOString().split('T')[0];
      
      const updatedSkill = {
        ...skill,
        progress: newProgress,
        progressHistory: [
          ...skill.progressHistory,
          { date: now, progress: newProgress }
        ]
      };

      // Update skills array
      const newSkills = [...skills];
      newSkills[skillIndex] = updatedSkill;
      setSkills(newSkills);

    } catch (error) {
      console.error('Error updating progress:', error);
      // Here you would typically show an error toast
    } finally {
      setIsUpdating(false);
    }
  };

  const StatsCard = ({ icon: Icon, title, value, trend }) => (
    <Card className="bg-background hover:shadow-lg transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <Icon className="text-primary h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-text-muted">{title}</p>
              <h4 className="text-2xl font-bold text-text">{value}</h4>
            </div>
          </div>
          {trend && (
            <div className="flex items-center text-success">
              <ArrowUp className="h-4 w-4 mr-1" />
              <span className="text-sm">{trend}%</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );

  const ProgressChart = ({ data }) => (
    <div className="h-64 mt-6">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="progressGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.2}/>
              <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
          <XAxis 
            dataKey="date" 
            tick={{ fill: 'var(--color-text)' }}
            stroke="var(--color-text-muted)"
          />
          <YAxis 
            tick={{ fill: 'var(--color-text)' }}
            stroke="var(--color-text-muted)"
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'var(--color-background)',
              border: '1px solid var(--color-border)',
              borderRadius: '8px'
            }}
          />
          <Area
            type="monotone"
            dataKey="progress"
            stroke="var(--color-primary)"
            fill="url(#progressGradient)"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );

  return (
    <div className="space-y-8 p-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          icon={Clock}
          title="Total Time"
          value={`${totalTimeSpent}min`}
          trend={12}
        />
        <StatsCard
          icon={Zap}
          title="Highest Streak"
          value={highestStreak}
          trend={8}
        />
        <StatsCard
          icon={Book}
          title="Lessons Done"
          value={totalLessonsCompleted}
          trend={15}
        />
        <StatsCard
          icon={Target}
          title="Avg. Progress"
          value={`${Math.round(overallProgress)}%`}
          trend={5}
        />
      </div>

      {/* Skills Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {skills.map(skill => (
          <Card 
            key={skill.id}
            className="hover:shadow-lg transition-all duration-300 cursor-pointer bg-background group"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xl font-bold">{skill.name}</CardTitle>
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                {skill.difficulty}
              </span>
            </CardHeader>
            <CardContent>
              {/* Progress Bar */}
              <div className="mt-4">
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-text-muted">Progress</span>
                  <span className="text-sm font-medium text-text">{skill.progress}%</span>
                </div>
                <div className="relative h-2 w-full bg-secondary/30 rounded-full overflow-hidden">
                  <div 
                    className="absolute h-full bg-primary rounded-full transition-all duration-500 ease-in-out"
                    style={{ width: `${skill.progress}%` }}
                  />
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="flex flex-col items-center p-3 bg-background-alt rounded-lg">
                  <Trophy className="h-5 w-5 text-primary mb-1" />
                  <span className="text-sm text-text-muted">Streak</span>
                  <span className="text-lg font-bold">{skill.streak}d</span>
                </div>
                <div className="flex flex-col items-center p-3 bg-background-alt rounded-lg">
                  <Book className="h-5 w-5 text-primary mb-1" />
                  <span className="text-sm text-text-muted">Complete</span>
                  <span className="text-lg font-bold">{skill.completedLessons}</span>
                </div>
                <div className="flex flex-col items-center p-3 bg-background-alt rounded-lg">
                  <Clock className="h-5 w-5 text-primary mb-1" />
                  <span className="text-sm text-text-muted">Time</span>
                  <span className="text-lg font-bold">{skill.timeSpent}m</span>
                </div>
              </div>

              {/* Progress Chart */}
              <ProgressChart data={skill.progressHistory} />

              {/* Action Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleProgressUpdate(skill.id);
                }}
                disabled={isUpdating}
                className="w-full mt-6 bg-primary hover:bg-primary-dark text-white py-3 px-4 rounded-lg 
                           transition-colors duration-200 flex items-center justify-center space-x-2
                           focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
                           disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Target className="h-5 w-5" />
                <span>{isUpdating ? 'Updating...' : 'Update Progress'}</span>
              </button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LearningDashboard;