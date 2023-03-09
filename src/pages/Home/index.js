import React from 'react';
import './Home.css';
// import CollectionTypes from '../../components/CollectionTypes';
import ContentTypes from '../../components/ContentTypes';
import ContentTypeValues from '../../components/ContentTypeValues';

export default function Home() {
  return (
    <div className='home-container'>
      <div className='collection-types'>{/* <CollectionTypes /> */}HI</div>
      <div className='content-types'>
        <ContentTypes />
      </div>
      <div className='content-type-values'>
        <ContentTypeValues />
        HI
      </div>
    </div>
  );
}
