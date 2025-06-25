



import React from 'react';
import MarathonSecTion from './MarathonSecTion';
import Banner from './Banner';
import UpcomingMarathons from './UpcomingMarathons';
import TopTrainingTips from './TopTrainingTips';
import FamousMarathons from './FamousMarathons';

const Home = () => {
  return (
    <div>
      <Banner/>
      <MarathonSecTion />
      <UpcomingMarathons/>
      <TopTrainingTips/>
      <FamousMarathons/>
    </div>
  );
};

export default Home;
