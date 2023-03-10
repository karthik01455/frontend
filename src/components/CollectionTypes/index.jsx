import React, { useContext, useEffect } from 'react';
import './collectionTypes.css';
import { CollectionDataContext } from '../../contexts/CollectionData';
import { ContentTypeDataContext } from '../../contexts/ContentTypeData';
import makeRequest from '../../utils/makeRequest';
import { LoginDataContext } from '../../contexts/LoginData';
import {
  GET_COLLECTIONS_BY_CONTENT_TYPE_ID,
  CONTENT_TYPE_BACKEND_URL,
  GET_ALL_CONTENT_TYPE,
} from '../../constants/apiEndPoints';

export default function CollectionTypes() {
  const { emailId } = useContext(LoginDataContext);
  useEffect(() => {
    makeRequest(CONTENT_TYPE_BACKEND_URL, GET_ALL_CONTENT_TYPE, {}).then(
      (res) => {
        let contentTypeList = [];
        res.map((item) => {
          const value = {
            id: item.id,
            contentTypeName: item.contentTypeName,
          };
          contentTypeList.push(value);
        });
        setcontentTypeList(contentTypeList);
        console.log('contentTypeList', contentTypeList);
      }
    );
  }, [emailId]);

  const { setcollectionData } = useContext(CollectionDataContext);
  const { setCollectionSelected } = useContext(CollectionDataContext);
  const { contentTypeList, setcontentTypeList } = useContext(
    ContentTypeDataContext
  );
  const { setcontentTypeSelected } = useContext(ContentTypeDataContext);

  const { setcontentType } = useContext(CollectionDataContext);
  const handleClickContentTypeBuilder = () => {
    setcontentTypeSelected(true);
    ``;
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
    <div className='collection-type-container'>
      <div className='collection-types-header'>
        <h2>CMS+</h2>
      </div>
      <div className='collection-types-list'>
        <div className='collection-types-list-heading'>COLLECTION TYPES</div>
        {contentTypeList &&
          contentTypeList.map((item) => {
            return (
              <div key={item.id} className='collection-types-list-container'>
                <div
                  key={item.id}
                  className='collection-types-list-item'
                  onClick={() => {
                    handleClickContentType(item);
                  }}
                >
                  {' '}
                  <div className='dot' />
                  <div className='collection-types-name'>
                    {' '}
                    {item.contentTypeName}
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      <div
        className='content-type-builder'
        onClick={handleClickContentTypeBuilder}
      >
        CONTENT TYPE BUILDER
      </div>
    </div>
  );
}
