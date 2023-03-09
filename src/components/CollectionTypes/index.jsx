import React, { useContext, useState, useEffect } from 'react';
import './collectionTypes.css';
import { CollectionDataContext } from '../../contexts/CollectionData';
import { ContentTypeDataContext } from '../../contexts/ContentTypeData';
import makeRequest from '../../utils/makeRequest';
import {
  GET_COLLECTIONS_BY_CONTENT_TYPE_ID,
  CONTENT_TYPE_BACKEND_URL,
} from '../../constants/apiEndPoints';

export default function CollectionTypes() {
  const { collectionData, setcollectionData } = useContext(
    CollectionDataContext
  );
  const { collectionSelected, setCollectionSelected } = useContext(
    CollectionDataContext
  );
  const { contentTypeList, setcontentTypeList } = useContext(
    CollectionDataContext
  );
  const { contentTypeSelected, setcontentTypeSelected } = useContext(
    ContentTypeDataContext
  );

  const { contentType, setcontentType } = useContext(CollectionDataContext);
  const handleClickContentTypeBuilder = () => {
    setcontentTypeSelected(true);
    setCollectionSelected(false);
  };
  const handleClickContentType = (item) => {
    setcontentType({
      contentTypeName: item.contentTypeName,
      id: item.id,
    });
    makeRequest(
      CONTENT_TYPE_BACKEND_URL,
      GET_COLLECTIONS_BY_CONTENT_TYPE_ID(item.id)
    ).then((res) => {
      console.log('res', res);
      setcollectionData(res);
      setcontentTypeSelected(false);
      setCollectionSelected(true);
    });
  };
  return (
    <div className='clt-container'>
      <div className='clt-header'></div>
      <div className='clt-list'>
        {contentTypeList &&
          contentTypeList.map((item) => {
            return (
              <div
                key={item.id}
                className='clt-list-item'
                onClick={() => {
                  handleClickContentType(item);
                }}
              >
                {item.contentTypeName}
              </div>
            );
          })}
      </div>
      <div onClick={handleClickContentTypeBuilder}>CONTENT TYPE BUILDER</div>
    </div>
  );
}
