import React, { useContext, useState, useEffect } from 'react';
import './contentType.css';
import { ContentTypeDataContext } from '../../contexts/ContentTypeData';
import makeRequest from '../../utils/makeRequest';
import {
  GET_CONTENT_TYPE_BY_ID,
  CONTENT_TYPE_BACKEND_URL,
} from '../../constants/apiEndPoints';
export default function ContentTypes() {
  const { contentTypeData, setcontentTypeData } = useContext(
    ContentTypeDataContext
  );
  const { contentType, setcontentType } = useContext(ContentTypeDataContext);
  const { contentTypeList } = useContext(ContentTypeDataContext);
  const { contentTypeSelected, setcontentTypeSelected } = useContext(
    ContentTypeDataContext
  );
  const handleClickContentType = (item) => {
    setcontentType({
      contentTypeName: item.contentTypeName,
      id: item.id,
    });
    setcontentTypeSelected(true);

    console.log('contentType', contentType);
  };
  useEffect(() => {
    contentType &&
      makeRequest(
        CONTENT_TYPE_BACKEND_URL,
        GET_CONTENT_TYPE_BY_ID(contentType.id),
        {}
      ).then((res) => {
        console.log('setcontentTypeData', res);
        setcontentTypeData(res);
      });
  }, [contentType]);
  console.log('contentTypeList', contentTypeList);
  return (
    <div className='content-type-container'>
      <div className='ct-header'>Content Types</div>
      <div className='ct-count'></div>
      <div className='ct-list'>
        {contentTypeList &&
          contentTypeList.map((item) => {
            return (
              <div
                key={item.id}
                style={{
                  color:
                    item.id === contentType && contentType.id
                      ? 'white'
                      : 'black',
                }}
                className='ct-list-item'
                onClick={() => {
                  handleClickContentType(item);
                }}
              >
                {item.contentTypeName}
              </div>
            );
          })}
      </div>
    </div>
  );
}
