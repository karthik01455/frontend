import React, { useContext, useState, useEffect } from 'react';
import './contentType.css';
import { ContentTypeDataContext } from '../../contexts/ContentTypeData';
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
  const { contentTypeData, setcontentTypeData } = useContext(
    ContentTypeDataContext
  );
  const { contentType, setcontentType } = useContext(ContentTypeDataContext);
  const { contentTypeList, setcontentTypeList } = useContext(
    ContentTypeDataContext
  );
  const { contentTypeSelected, setcontentTypeSelected } = useContext(
    ContentTypeDataContext
  );
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
    console.log('left-result', result);
    setcontentTypeList(result);
  };
  // contentTypeList && handleCount();
  const { emailId, setEmailId } = useContext(LoginDataContext);
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
  useEffect(() => {
    handleCount();
  }, [emailId]);
  const closeModal = () => {
    makeRequest(CONTENT_TYPE_BACKEND_URL, CREATE_CONTENT_TYPE, {
      data: {
        contentTypeName: contentTypemodalValue,
        Types: [],
      },
    }).then((res) => {
      console.log('res', res);

      let newContentTypeList = [...contentTypeList];
      newContentTypeList.push({
        contentTypeName: res.contentTypeName,
        id: res.id,
      });
      setcontentTypeList(newContentTypeList);
      console.log('newContentTypeList', newContentTypeList);
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
  const addContentType = () => {
    setcontentTypemodal(true);
  };
  console.log('contentTypeList', contentTypeList);
  console.log('setcontentTypemodal', contentTypemodal);
  return (
    <div className='content-type-container'>
      <div className='ct-header'>Content Types</div>
      <div className='ct-count'>
        {contentTypeList && contentTypeList.length} Types
      </div>
      {/* <button onClick={addContentType}>Add</button> */}
      <div
        className='content-type-modal'
        style={{ display: contentTypemodal ? 'block' : 'none' }}
      >
        <div className='content-type-modal-content'>
          <input
            type='text'
            value={contentTypemodalValue}
            onChange={handleChangeContentTypeModalValue}
          />
          <button onClick={closeModal}>Add</button>
        </div>
      </div>
      <div className='ct-list-add' onClick={addContentType}>
        + New Type
      </div>
      <div className='ct-list'>
        {contentTypeList &&
          contentTypeList.map((item) => {
            return (
              <div
                key={item.id}
                className='ct-list-item'
                style={{
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
