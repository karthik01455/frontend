import React, { useContext, useState, useEffect } from 'react';
import './contentType.css';
import { ContentTypeDataContext } from '../../contexts/ContentTypeData';
import { CollectionDataContext } from '../../contexts/CollectionData';
import { LoginDataContext } from '../../contexts/LoginData';
import makeRequest from '../../utils/makeRequest';
import {
  GET_CONTENT_TYPE_BY_ID,
  GET_COLLECTIONS_BY_CONTENT_TYPE_ID,
  CONTENT_TYPE_BACKEND_URL,
  CREATE_CONTENT_TYPE,
  GET_ALL_CONTENT_TYPE,
} from '../../constants/apiEndPoints';
export default function ContentTypes() {
  const { setcontentTypeData } = useContext(ContentTypeDataContext);
  const { contentType, setcontentType } = useContext(ContentTypeDataContext);
  const { contentTypeList, setcontentTypeList } = useContext(
    ContentTypeDataContext
  );
  const { setcontentTypeSelected } = useContext(ContentTypeDataContext);
  const [contentTypemodal, setcontentTypemodal] = useState(false);
  const [contentTypemodalValue, setcontentTypemodalValue] = useState('');
  const handleChangeContentTypeModalValue = (event) => {
    setcontentTypemodalValue(event.target.value);
  };
  const handleCount = async () => {
    const result = await Promise.all(
      contentTypeList.map(async (item) => {
        const res = await makeRequest(
          CONTENT_TYPE_BACKEND_URL,
          GET_COLLECTIONS_BY_CONTENT_TYPE_ID(item.id)
        );
        return {
          ...item,
          count: res.length,
        };
      })
    );
    // console.log('left-result', result);
    setcontentTypeList(result);
  };
  // contentTypeList && handleCount();
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
        // console.log('contentTypeList', contentTypeList);
      }
    );
  }, [emailId]);
  useEffect(() => {
    handleCount();
  }, []);
  const closeModal = () => {
    makeRequest(CONTENT_TYPE_BACKEND_URL, CREATE_CONTENT_TYPE, {
      data: {
        contentTypeName: contentTypemodalValue,
        Types: [],
      },
    }).then((res) => {
      // console.log('res', res);

      let newContentTypeList = [...contentTypeList];
      newContentTypeList.push({
        contentTypeName: res.contentTypeName,
        id: res.id,
      });
      setcontentTypeList(newContentTypeList);
      {
        const { setcontentTypeList } = useContext(CollectionDataContext);
        setcontentTypeList(newContentTypeList);
      }
      // console.log('newContentTypeList', newContentTypeList);
      setcontentType({
        contentTypeName: res.contentTypeName,
        id: res.id,
      });
      setcontentTypeList(newContentTypeList);
    });

    setcontentTypemodal(false);
  };
  const handleClickContentType = (item) => {
    setcontentType({
      contentTypeName: item.contentTypeName,
      id: item.id,
    });
    setcontentTypeSelected(true);

    // console.log('contentType', contentType);
  };
  useEffect(() => {
    contentType &&
      makeRequest(
        CONTENT_TYPE_BACKEND_URL,
        GET_CONTENT_TYPE_BY_ID(contentType.id),
        {}
      ).then((res) => {
        // console.log('setcontentTypeData', res);
        setcontentTypeData(res);
      });
  }, [contentType]);
  const addContentType = () => {
    setcontentTypemodal(true);
  };
  // console.log('contentTypeList', contentTypeList);
  // console.log('setcontentTypemodal', contentTypemodal);
  useEffect(() => {
    makeRequest(CONTENT_TYPE_BACKEND_URL, GET_ALL_CONTENT_TYPE, {}).then(
      (res) => {
        let contentTypeList = [];
        res.map((item) => {
          const value = {
            id: item.id,
            contentTypeName: item.contentTypeName,
            count: 0,
          };
          contentTypeList.push(value);
        });
        setcontentTypeList(contentTypeList);
        // console.log('contentTypeList', contentTypeList);
      }
    );
  }, [emailId]);
  return (
    <div className='content-type-container'>
      <div className='content-type-header'>
        <h2>Content Types</h2>
      </div>
      <div className='content-type-count'>
        {contentTypeList && contentTypeList.length} Types
      </div>
      {/* <button onClick={addContentType}>Add</button> */}
      <div
        className='content-type-modal'
        style={{ display: contentTypemodal ? 'flex' : 'none' }}
      >
        <div className='content-type-modal-content'>
          <div className='content-type-modal-content-header'>
            Create a new content type
          </div>
          <input
            type='text'
            value={contentTypemodalValue}
            className='content-type-modal-content-input'
            onChange={handleChangeContentTypeModalValue}
          />

          <div className='content-type-modal-content-footer'>
            <div
              className='cv-modal-footer-button-cancel'
              onClick={() => setcontentTypemodal(false)}
            >
              Cancel
            </div>
            <button
              className='content-value-modal-footer-button'
              onClick={closeModal}
            >
              Add
            </button>
          </div>
        </div>
      </div>
      <div className='content-type-list-add' onClick={addContentType}>
        + New Type
      </div>
      <div className='content-type-list'>
        {contentTypeList &&
          contentTypeList.map((item) => {
            return (
              <div
                key={item.id}
                className='content-type-list-item'
                style={{
                  color:
                    item.id === (contentType && contentType.id)
                      ? 'white'
                      : 'black',
                  backgroundColor:
                    item.id === (contentType && contentType.id)
                      ? 'blueviolet'
                      : 'white',
                }}
                onClick={() => {
                  handleClickContentType(item);
                }}
              >
                {item.contentTypeName} <div>{item.count}</div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
