import React from 'react';
import { 
  Book, Clock, Trophy, Star, ChevronRight, 
  FileText, Video, Code, CheckCircle 
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const LearningPath = ({ path, userProgress, onStartModule }) => {
  const getModuleStatus = (moduleId) => {
    const progress = userProgress.moduleProgress[moduleId] || 0;
    if (progress === 100) return 'completed';
    if (progress > 0) return 'in-progress';
    return 'not-started';
  };

  const ModuleTypeIcon = ({ type }) => {
    const icons = {
      video: Video,
      reading: FileText,
      exercise: Code,
      quiz: FileText
    };
    const Icon = icons[type] || Book;
    return <Icon className="h-5 w-5" />;
  };

  const ProgressIndicator = ({ status, progress }) => {
    if (status === 'completed') {
      return (
        <div className="flex items-center text-primary">
          <CheckCircle className="h-5 w-5" />
        </div>
      );
    }
    
    if (status === 'in-progress') {
      return (
        <div className="text-sm font-medium text-primary">
          {progress}%
        </div>
      );
    }

    return <ChevronRight className="h-5 w-5 text-text-muted" />;
  };

  return (
    <div className="space-y-6">
      {/* Path Overview */}
      <Card>
        <CardHeader>
          <CardTitle>{path.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-6 mb-6">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-text-muted" />
              <span>{path.estimatedHours} hours</span>
            </div>
            <div className="flex items-center space-x-2">
              <Trophy className="h-5 w-5 text-text-muted" />
              <span>{path.totalModules} modules</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="h-5 w-5 text-text-muted" />
              <span>{path.difficulty}</span>
            </div>
          </div>

          <p className="text-text-muted mb-4">
            {path.description}
          </p>

          {/* Skills You'll Learn */}
          <div className="mb-6">
            <h3 className="font-medium mb-2">Skills You'll Learn</h3>
            <div className="flex flex-wrap gap-2">
              {path.skills.map(skill => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Prerequisites */}
          {path.prerequisites?.length > 0 && (
            <div>
              <h3 className="font-medium mb-2">Prerequisites</h3>
              <ul className="list-disc list-inside text-text-muted">
                {path.prerequisites.map(prerequisite => (
                  <li key={prerequisite}>{prerequisite}</li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Modules List */}
      <div className="space-y-4">
        {path.modules.map((module, index) => {
          const status = getModuleStatus(module.id);
          const progress = userProgress.moduleProgress[module.id] || 0;
          
          return (
            <Card
              key={module.id}
              className={`
                transition-all duration-300 
                ${status === 'completed' ? 'border-primary bg-primary/5' : ''}
                ${status === 'in-progress' ? 'border-primary' : ''}
              `}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`
                      p-2 rounded-lg
                      ${status === 'completed' ? 'bg-primary/10 text-primary' : 'bg-surface-hover text-text-muted'}
                    `}>
                      <ModuleTypeIcon type={module.type} />
                    </div>
                    
                    <div>
                      <h3 className="font-medium">
                        {index + 1}. {module.name}
                      </h3>
                      <div className="flex items-center space-x-4 text-sm text-text-muted">
                        <span>{module.type}</span>
                        <span>•</span>
                        <span>{module.duration} min</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    {status !== 'completed' && (
                      <Button
                        variant={status === 'in-progress' ? 'primary' : 'outline'}
                        size="sm"
                        onClick={() => onStartModule(module.id)}
                      >
                        {status === 'in-progress' ? 'Continue' : 'Start'}
                      </Button>
                    )}
                    <ProgressIndicator status={status} progress={progress} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default LearningPath;