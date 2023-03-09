import React, { useContext, useState, useEffect } from 'react';
import './contentTypeValues.css';

import { ContentTypeDataContext } from '../../contexts/ContentTypeData';
export default function ContentTypeValues() {
  const { contentTypeData, setcontentTypeData } = useContext(
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
  const closeModal = () => {
    let newContentTypeData = { ...contentTypeData };
    newContentTypeData.Types.push(modalValue);
    setcontentTypeData(newContentTypeData);
    setModal(false);
  };
  const saveContentType = () => {
    console.log('saveContentType', contentTypeData);
  };

  const { contentType, setcontentType } = useContext(ContentTypeDataContext);
  const { contentTypeList } = useContext(ContentTypeDataContext);
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
      </div>
      <div className='ctv-count'>{contentTypeData.Types.length} fields</div>
      <div className='ctv-list'>
        {contentTypeData.Types.map((item) => {
          return (
            <div key={item.id} className='ctv-list-item'>
              <div className='ctv-list-item-name'>{item}</div>
            </div>
          );
        })}
      </div>
    </div>
  ) : (
    <div />
  );
}
