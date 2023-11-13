// Tech.js
import React from 'react';
import SkillBars from './SkillBars';

import { BallCanvas } from './canvas';
import { SectionWrapper } from '../hoc';
import { technologies, skills } from '../constants';

const Tech = () => {
  return (
    <div className='flex flex-wrap justify-center items-center'>
      {technologies.map((technology) => {
        const technologySkills = skills.filter((skill) => skill.label === technology.name);

        return (
          <div className='w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 text-center p-4' key={technology.name}>
            <BallCanvas icon={technology.icon} />
            <SkillBars skills={technologySkills} />
          </div>
        );
      })}
    </div>
  );
};

export default SectionWrapper(Tech, '');
