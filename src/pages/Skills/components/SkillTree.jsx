import React, { useState } from 'react';
import { Book, Check, Lock, ChevronRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const SkillNode = ({ 
  skill, 
  isUnlocked, 
  isCompleted, 
  onSelect,
  connectsTo = [] 
}) => {
  const statusColors = {
    locked: 'bg-surface-hover border-border',
    unlocked: 'bg-background border-primary hover:border-primary-dark',
    completed: 'bg-primary/10 border-primary',
  };

  const getStatus = () => {
    if (isCompleted) return 'completed';
    if (isUnlocked) return 'unlocked';
    return 'locked';
  };

  return (
    <div className="relative">
      {/* Connection Lines */}
      {connectsTo.map((position, index) => (
        <div
          key={index}
          className={`absolute w-8 h-0.5 ${
            isCompleted ? 'bg-primary' : 'bg-border'
          } transform ${position}`}
        />
      ))}

      {/* Skill Node */}
      <Card
        className={`w-48 cursor-pointer transition-all duration-300 ${
          statusColors[getStatus()]
        }`}
        onClick={() => isUnlocked && onSelect(skill)}
      >
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {isCompleted ? (
                <Check className="h-5 w-5 text-primary" />
              ) : isUnlocked ? (
                <Book className="h-5 w-5 text-primary" />
              ) : (
                <Lock className="h-5 w-5 text-text-muted" />
              )}
              <div>
                <h3 className="font-medium">{skill.name}</h3>
                <p className="text-xs text-text-muted">
                  {isCompleted
                    ? 'Completed'
                    : isUnlocked
                    ? `${skill.estimatedHours}h`
                    : 'Locked'}
                </p>
              </div>
            </div>
            {isUnlocked && !isCompleted && (
              <ChevronRight className="h-4 w-4 text-primary" />
            )}
          </div>
          
          {/* Progress Bar (if unlocked and not completed) */}
          {isUnlocked && !isCompleted && skill.progress > 0 && (
            <div className="mt-3">
              <div className="w-full h-1 bg-surface-hover rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-300"
                  style={{ width: `${skill.progress}%` }}
                />
              </div>
              <p className="text-xs text-text-muted mt-1">
                {skill.progress}% complete
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

const SkillTree = ({ skills, userProgress, onSkillSelect }) => {
  const [selectedPath, setSelectedPath] = useState('frontend'); // or 'backend', 'data', etc.

  const isSkillUnlocked = (skill) => {
    if (!skill.prerequisites || skill.prerequisites.length === 0) return true;
    return skill.prerequisites.every(prereq => 
      userProgress.completedSkills.includes(prereq)
    );
  };

  const isSkillCompleted = (skillId) => {
    return userProgress.completedSkills.includes(skillId);
  };

  const pathButtons = [
    { id: 'frontend', label: 'Frontend Development' },
    { id: 'backend', label: 'Backend Development' },
    { id: 'data', label: 'Data Science' },
    { id: 'mobile', label: 'Mobile Development' },
  ];

  // Group skills by levels (rows)
  const skillsByLevel = skills
    .filter(skill => skill.path === selectedPath)
    .reduce((acc, skill) => {
      const level = acc[skill.level] || [];
      level.push(skill);
      acc[skill.level] = level;
      return acc;
    }, {});

  return (
    <div className="space-y-8">
      {/* Path Selection */}
      <div className="flex flex-wrap gap-2">
        {pathButtons.map(path => (
          <Button
            key={path.id}
            variant={selectedPath === path.id ? 'primary' : 'outline'}
            onClick={() => setSelectedPath(path.id)}
          >
            {path.label}
          </Button>
        ))}
      </div>

      {/* Skill Tree Visualization */}
      <div className="relative space-y-16 py-8">
        {Object.entries(skillsByLevel).map(([level, levelSkills]) => (
          <div
            key={level}
            className="flex justify-center items-center space-x-8"
          >
            {levelSkills.map(skill => (
              <SkillNode
                key={skill.id}
                skill={skill}
                isUnlocked={isSkillUnlocked(skill)}
                isCompleted={isSkillCompleted(skill.id)}
                onSelect={onSkillSelect}
                connectsTo={skill.connectsTo}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Legend */}
      <Card className="mt-8">
        <CardContent className="p-4">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Lock className="h-4 w-4 text-text-muted" />
              <span className="text-sm">Locked</span>
            </div>
            <div className="flex items-center space-x-2">
              <Book className="h-4 w-4 text-primary" />
              <span className="text-sm">Available</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="h-4 w-4 text-primary" />
              <span className="text-sm">Completed</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SkillTree;