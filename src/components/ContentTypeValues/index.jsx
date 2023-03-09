import React, { useContext, useState, useEffect } from 'react';
import './contentTypeValues.css';
import makeRequest from '../../utils/makeRequest';
import {
  CONTENT_TYPE_BACKEND_URL,
  UPDATE_CONTENT_TYPE_BY_ID,
} from '../../constants/apiEndPoints';
import { ContentTypeDataContext } from '../../contexts/ContentTypeData';
export default function ContentTypeValues() {
  const { contentTypeData, setcontentTypeData } = useContext(
    ContentTypeDataContext
  );
  const { contentTypeList, setcontentTypeList } = useContext(
    ContentTypeDataContext
  );
  const [modal, setModal] = useState(false);
  const [modalValue, setModalValue] = useState('');
  const handleChangeModalValue = (event) => {
    setModalValue(event.target.value);
  };
  const addField = () => {
    setModal(true);
  };
  const deleteValue = (index) => {
    let newContentTypeData = { ...contentTypeData };
    newContentTypeData.Types.splice(index, 1);
    setcontentTypeData(newContentTypeData);
  };

  const closeModal = () => {
    if (editContentTypeName) {
      let newContentTypeData = { ...contentTypeData };
      newContentTypeData.contentTypeName = modalValue;
      setcontentTypeData(newContentTypeData);
      makeRequest(
        CONTENT_TYPE_BACKEND_URL,
        UPDATE_CONTENT_TYPE_BY_ID(contentTypeData.id),
        {
          data: {
            contentTypeName: modalValue,
            Types: contentTypeData.Types,
          },
        }
      ).then((res) => {
        console.log('res', res);
      });
      let newContentTypeList = [...contentTypeList];
      newContentTypeList.forEach((item) => {
        if (item.id === contentTypeData.id) {
          item.contentTypeName = modalValue;
        }
      });
      setcontentTypeList(newContentTypeList);
      setEditContentTypeName(false);
      setModal(false);
    } else if (editContentTypeValue.true) {
      let newContentTypeData = { ...contentTypeData };
      newContentTypeData.Types[editContentTypeValue.index] = modalValue;
      setcontentTypeData(newContentTypeData);
      makeRequest(
        CONTENT_TYPE_BACKEND_URL,
        UPDATE_CONTENT_TYPE_BY_ID(contentTypeData.id),
        {
          data: {
            contentTypeName: contentTypeData.contentTypeName,
            Types: contentTypeData.Types,
          },
        }
      ).then((res) => {
        console.log('res', res);
      });
      setEditContentTypeValue(false);
      setModal(false);
    } else {
      let newContentTypeData = { ...contentTypeData };
      newContentTypeData.Types.push(modalValue);
      setcontentTypeData(newContentTypeData);
      setModal(false);
    }
  };
  const saveContentType = () => {
    console.log('saveContentType', contentTypeData);
    makeRequest(
      CONTENT_TYPE_BACKEND_URL,
      UPDATE_CONTENT_TYPE_BY_ID(contentTypeData.id),
      {
        data: {
          contentTypeName: contentTypeData.contentTypeName,
          Types: contentTypeData.Types,
        },
      }
    ).then((res) => {
      console.log('res', res);
    });
  };
  const editValue = (index) => {
    setModal(true);
    setEditContentTypeValue({ true: true, index });
  };
  const [editContentTypeName, setEditContentTypeName] = useState(false);
  const [editContentTypeValue, setEditContentTypeValue] = useState(false);
  const handleEditContentTypeName = () => {
    setModal(true);
    setEditContentTypeName(true);
  };

  const { contentType, setcontentType } = useContext(ContentTypeDataContext);
  // const { contentTypeList } = useContext(ContentTypeDataContext);
  const { contentTypeSelected, setcontentTypeSelected } = useContext(
    ContentTypeDataContext
  );
  return contentTypeData ? (
    <div className='content-type-values-container'>
      <div
        className='content-type-modal'
        style={{ display: modal ? 'block' : 'none' }}
      >
        <div className='content-type-modal-content'>
          <input
            type='text'
            value={modalValue}
            onChange={handleChangeModalValue}
          />
          <button onClick={closeModal}>Add</button>
        </div>
      </div>
      <div className='ctv-header'>
        {contentTypeData.contentTypeName}
        <button onClick={addField}> Add field</button>
        <button onClick={saveContentType}>Save</button>
        <button onClick={handleEditContentTypeName}>Edit</button>
      </div>
      <div className='ctv-count'>{contentTypeData.Types.length} fields</div>
      <div className='ctv-list'>
        {contentTypeData.Types.map((item, index) => {
          return (
            <div key={item.id} className='ctv-list-item'>
              <div className='ctv-list-item-name'>{item}</div>
              <button
                onClick={() => {
                  deleteValue(index);
                }}
              >
                DELETE
              </button>
              <button
                onClick={() => {
                  editValue(index);
                }}
              >
                EDIT
              </button>
            </div>
          );
        })}
      </div>
    </div>
  ) : (
    <div />
  );
}
