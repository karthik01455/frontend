import React, { useContext } from 'react';
import './Home.css';
import CollectionTypes from '../../components/CollectionTypes';
import ContentTypes from '../../components/ContentTypes';
import CollectionValues from '../../components/CollectionValues';
import ContentTypeValues from '../../components/ContentTypeValues';
import { ContentTypeDataContext } from '../../contexts/ContentTypeData';
import { CollectionDataContext } from '../../contexts/CollectionData';
export default function Home() {
  const { contentTypeSelected, setcontentTypeSelected } = useContext(
    ContentTypeDataContext
  );
  const { collectionSelected, setCollectionSelected } = useContext(
    CollectionDataContext
  );
  return (
    <div className='home-container'>
      <div className='collection-types'>
        <CollectionTypes />
        HI
      </div>
      {contentTypeSelected && (
        <div className='content-types'>
          <ContentTypes />
        </div>
      )}
      {contentTypeSelected && (
        <div className='content-type-values'>
          <ContentTypeValues />
          HI
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
