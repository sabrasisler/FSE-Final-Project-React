import React from 'react';
import './TuiterView.css';
import { WhatsHappeningView } from '../index';

const DoubleColumn = ({ content }) => {
  return (
    <div className='ttr-tuiter'>
      <div className='ttr-center-column'>{content}</div>
      <div className='ttr-right-column'>
        <WhatsHappeningView />
      </div>
    </div>
  );
};

export default DoubleColumn;
