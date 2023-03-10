import React, { useContext } from 'react';
import './Home.css';
import CollectionTypes from '../../components/CollectionTypes';
import ContentTypes from '../../components/ContentTypes';
import CollectionValues from '../../components/CollectionValues';
import ContentTypeValues from '../../components/ContentTypeValues';
import { ContentTypeDataContext } from '../../contexts/ContentTypeData';
import { CollectionDataContext } from '../../contexts/CollectionData';
export default function Home() {
  const { contentTypeSelected } = useContext(ContentTypeDataContext);
  const { collectionSelected } = useContext(CollectionDataContext);
  return (
    <div className='home-container'>
      <div className='collection-types'>
        <CollectionTypes />
      </div>
      {contentTypeSelected && (
        <div className='content-types'>
          <ContentTypes />
        </div>
      )}
      {contentTypeSelected && (
        <div className='content-type-values'>
          <ContentTypeValues />
        </div>
      )}
      {collectionSelected && (
        <div className='collection-values'>
          <CollectionValues />
        </div>
      )}
    </div>
  );
}
