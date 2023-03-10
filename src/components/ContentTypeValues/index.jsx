import React, { useContext, useState, useEffect } from 'react';
import './contentTypeValues.css';
import makeRequest from '../../utils/makeRequest';
import {
  CONTENT_TYPE_BACKEND_URL,
  UPDATE_CONTENT_TYPE_BY_ID,
} from '../../constants/apiEndPoints';
import { ContentTypeDataContext } from '../../contexts/ContentTypeData';
import { LoginDataContext } from '../../contexts/LoginData';
import UserPencil from '../../assets/user-pencil/user-pencil3x.png';
import Trash from '../../assets/trash/trash3x.png';
export default function ContentTypeValues() {
  const { emailId } = useContext(LoginDataContext);

  const { contentTypeData, setcontentTypeData } = useContext(
    ContentTypeDataContext
  );
  const { contentTypeList, setcontentTypeList } = useContext(
    ContentTypeDataContext
  );
  useEffect(() => {
    setcontentTypeData(null);
  }, [emailId]);

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
      setModalValue('');
      setModal(false);
    } else if (editContentTypeValue.true) {
      let newContentTypeData = { ...contentTypeData };
      // check if value already exists
      if (newContentTypeData.Types.includes(modalValue)) {
        alert('Value already exists');
        return;
      }
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
      // check if value already exists
      if (newContentTypeData.Types.includes(modalValue)) {
        alert('Value already exists');
        return;
      }
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
  return contentTypeData ? (
    <div className='content-type-values-container'>
      <div className='content-type-header-top'></div>
      <div
        className='content-type-modal'
        style={{ display: modal ? 'flex' : 'none' }}
      >
        <div className='content-type-modal-content'>
          <input
            type='text'
            value={modalValue}
            onChange={handleChangeModalValue}
          />
          <button onClick={closeModal}>Save</button>
          <button
            onClick={() => {
              setModal(false);
              setEditContentTypeName(false);
              setEditContentTypeValue(false);
            }}
          >
            Cancel
          </button>
        </div>
      </div>
      <div className='content-type-values-header'>
        <div>
          {' '}
          <h1> {contentTypeData.contentTypeName}</h1>
        </div>
        {/* <button onClick={addField}> Add field</button> */}
        <img
          onClick={handleEditContentTypeName}
          src={UserPencil}
          className='icon-utils'
          alt='user-pencil'
        />{' '}
        <div className='save' onClick={saveContentType}>
          SAVE
        </div>
        {/* <button onClick={handleEditContentTypeName}>Edit</button> */}
      </div>
      <div className='content-type-values-count'>
        {contentTypeData.Types.length} Fields
      </div>
      <div className='content-type-values-list'>
        <div className='content-type-values-add-item' onClick={addField}>
          Add another field
        </div>
        {contentTypeData.Types.map((item, index) => {
          return (
            <div key={item.id} className='content-type-values-list-item'>
              <div className='content-type-values-list-left'>Ab</div>
              <div className='content-type-values-list-item-name'>{item}</div>
              <div> text</div>
              <div className='content-type-values-list-utils'>
                <img
                  onClick={() => {
                    deleteValue(index);
                  }}
                  src={Trash}
                  className='icon-utils'
                  alt='user-pencil'
                />

                <img
                  onClick={() => {
                    editValue(index);
                  }}
                  src={UserPencil}
                  className='icon-utils'
                  alt='user-pencil'
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  ) : (
    <div />
  );
}
