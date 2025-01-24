import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Puzzle, Map } from 'lucide-react';
import SkillTree from './components/SkillTree';
import LearningPath from './components/LearningPath';
import { Alert } from '@/components/ui/alert';

const SkillsPage = () => {
  const [activeTab, setActiveTab] = useState('tree');
  const [selectedSkill, setSelectedSkill] = useState(null);

  // Mock data - replace with actual data from your API
  const mockUserProgress = {
    completedSkills: ['html', 'css'],
    moduleProgress: {
      'module-1': 100,
      'module-2': 60,
      'module-3': 0,
    }
  };

  const mockSkills = [
    {
      id: 'html',
      name: 'HTML',
      level: 1,
      path: 'frontend',
      estimatedHours: 4,
      progress: 100,
      prerequisites: [],
      connectsTo: ['translate-x-full']
    },
    {
      id: 'css',
      name: 'CSS',
      level: 1,
      path: 'frontend',
      estimatedHours: 6,
      progress: 100,
      prerequisites: ['html'],
      connectsTo: ['translate-x-full']
    },
    {
      id: 'javascript',
      name: 'JavaScript',
      level: 2,
      path: 'frontend',
      estimatedHours: 10,
      progress: 30,
      prerequisites: ['html', 'css'],
      connectsTo: ['translate-x-1/2', 'translate-x-full']
    },
    {
      id: 'react',
      name: 'React',
      level: 3,
      path: 'frontend',
      estimatedHours: 15,
      progress: 0,
      prerequisites: ['javascript'],
      connectsTo: []
    }
  ];

  const mockLearningPath = {
    id: 'frontend-dev',
    name: 'Frontend Development Path',
    description: 'Master modern frontend development with this comprehensive learning path. Start from the basics of HTML and CSS, progress through JavaScript, and build powerful applications with React.',
    estimatedHours: 35,
    totalModules: 12,
    difficulty: 'Intermediate',
    skills: ['HTML', 'CSS', 'JavaScript', 'React', 'Git', 'Web Design'],
    prerequisites: ['Basic computer skills', 'Problem-solving aptitude'],
    modules: [
      {
        id: 'module-1',
        name: 'HTML Foundations',
        type: 'video',
        duration: 45,
        description: 'Learn the basics of HTML markup'
      },
      {
        id: 'module-2',
        name: 'CSS Styling',
        type: 'exercise',
        duration: 60,
        description: 'Master CSS styling techniques'
      },
      {
        id: 'module-3',
        name: 'JavaScript Basics',
        type: 'reading',
        duration: 90,
        description: 'Introduction to JavaScript programming'
      }
    ]
  };

  const handleSkillSelect = (skill) => {
    setSelectedSkill(skill);
    setActiveTab('path');
  };

  const handleStartModule = (moduleId) => {
    // Handle starting/continuing a module
    console.log(`Starting module: ${moduleId}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Learning Journey</h1>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
          <TabsTrigger value="tree" className="flex items-center space-x-2">
            <Puzzle className="h-4 w-4" />
            <span>Skill Tree</span>
          </TabsTrigger>
          <TabsTrigger value="path" className="flex items-center space-x-2">
            <Map className="h-4 w-4" />
            <span>Learning Path</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="tree">
          {selectedSkill && (
            <Alert className="mb-6">
              Selected skill: {selectedSkill.name}
            </Alert>
          )}
          <SkillTree
            skills={mockSkills}
            userProgress={mockUserProgress}
            onSkillSelect={handleSkillSelect}
          />
        </TabsContent>

        <TabsContent value="path">
          <LearningPath
            path={mockLearningPath}
            userProgress={mockUserProgress}
            onStartModule={handleStartModule}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SkillsPage;