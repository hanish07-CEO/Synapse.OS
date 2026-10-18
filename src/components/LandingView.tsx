import React from 'react';
import { SynapseLandingView } from './SynapseLandingView';
import { AnalysisProject } from '../types/blindspot';
import { UserProfile } from '../types/auth';

interface LandingViewProps {
  onGoToLogin: () => void;
  onQuickDemoLogin: (user: UserProfile, projectId: string) => void;
  onExplorePublicDemo: (project: AnalysisProject) => void;
}

export const LandingView: React.FC<LandingViewProps> = (props) => {
  return <SynapseLandingView {...props} />;
};
