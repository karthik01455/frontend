import React, { useContext, useState, useEffect } from 'react';
import './collectionValues.css';
import {
  GET_CONTENT_TYPE_BY_ID,
  UPDATE_COLLECTION_BY_ID,
} from '../../constants/apiEndPoints';
import {
  CONTENT_TYPE_BACKEND_URL,
  CREATE_COLLECTION,
  DELETE_COLLECTION_BY_ID,
} from '../../constants/apiEndPoints';
import UserPencil from '../../assets/user-pencil/user-pencil3x.png';
import Trash from '../../assets/trash/trash3x.png';
import { LoginDataContext } from '../../contexts/LoginData';
import makeRequest from '../../utils/makeRequest';
import { CollectionDataContext } from '../../contexts/CollectionData';
export default function CollectionValues() {
  const { emailId } = useContext(LoginDataContext);
  const [contentFiels, setContentFiels] = useState([]);
  const { contentType } = useContext(CollectionDataContext);
  const { collectionData, setcollectionData } = useContext(
    CollectionDataContext
  );

  const [collectionList, setCollectionList] = useState({});
  useEffect(() => {
    // setContentFiels({});
    if (contentType) {
      makeRequest(
        CONTENT_TYPE_BACKEND_URL,
        GET_CONTENT_TYPE_BY_ID(contentType.id)
      ).then((res) => {
        console.log('fields', res);
        setContentFiels(res.Types);
        let addNewCollectionList = collectionList;
        res.Types.map((item) => {
          addNewCollectionList[item] = '';
        });
        console.log('addNewCollectionList', addNewCollectionList);
        setCollectionList(addNewCollectionList);

        console.log('contentFiels', contentFiels);
      });
    }
  }, [contentType, emailId]);

  const handleCollectionListChange = (event) => {
    console.log('event', event.target.value);

    console.log(
      'value',
      event.target.value,
      'name',
      event.target.name,
      'list',
      collectionList[event.target.name]
    );
    const { name, value } = event.target;
    setCollectionList((prevFields) => ({ ...prevFields, [name]: value }));
  };
  const [collectionModel, setCollectionModel] = useState(false);
  const addNewCollection = () => {
    setCollectionModel(true);
  };
  const handleAddCollectionForm = () => {
    console.log('collectionList', collectionList);
    makeRequest(CONTENT_TYPE_BACKEND_URL, CREATE_COLLECTION, {
      data: {
        contentId: contentType.id,
        content: collectionList,
      },
    }).then((res) => {
      console.log('res', res);
      let newCollectionData = [...collectionData];
      newCollectionData.push(res);
      setcollectionData(newCollectionData);
      setCollectionModel(false);
    });
  };
  const handleEditCollectionValues = (item) => {
    console.log('item', item);
    setEditCollectionValueStatus({ id: item.id, status: true });
    setCollectionModel(true);
    setCollectionList(item.content);
  };
  const [editCollectionValueStatus, setEditCollectionValueStatus] =
    useState(false);
  const handleUpdateCollectionForm = () => {
    console.log('collectionList', collectionList);
    console.log('editCollectionValueStatus', editCollectionValueStatus);
    makeRequest(
      CONTENT_TYPE_BACKEND_URL,
      UPDATE_COLLECTION_BY_ID(editCollectionValueStatus.id),
      {
        data: {
          contentId: contentType.id,
          content: collectionList,
        },
      }
    ).then((res) => {
      console.log('res', res);
      let newCollectionData = [...collectionData];
      //update collection data with find index
      const index = newCollectionData.findIndex(
        (item) => item.id === editCollectionValueStatus.id
      );
      newCollectionData[index].content = collectionList;

      setcollectionData(newCollectionData);
      setCollectionModel(false);
      setEditCollectionValueStatus(false);
    });
  };
  const handleDeleteCollectionValues = (item) => {
    console.log('item', item);
    makeRequest(
      CONTENT_TYPE_BACKEND_URL,
      DELETE_COLLECTION_BY_ID(item.id)
    ).then((res) => {
      console.log('res', res);
      let newCollectionData = [...collectionData];
      //update collection data with find index
      const index = newCollectionData.findIndex(
        (value) => value.id === item.id
      );
      newCollectionData.splice(index, 1);

      setcollectionData(newCollectionData);
      setCollectionModel(false);
    });
  };
  let tableHeaders = ['ID'];
  if (contentFiels) {
    tableHeaders = contentFiels.map((item) => {
      return item;
    });
  }
  tableHeaders.splice(4);
  console.log('tableHeaders', tableHeaders);

  return (
    <div className='collection-values-container'>
      {collectionModel && (
        <div className='collection-values-modal'>
          <div className='collection-values-modal-header'>
            <h2>New {contentType && contentType.contentTypeName}</h2>
          </div>
          <div className='collection-values-modal-body'>
            {contentFiels &&
              contentFiels.map((item) => {
                return (
                  <div
                    key={item.id}
                    className='collection-values-modal-body-item'
                  >
                    <div className='collection-values-modal-body-field'>
                      {' '}
                      {item}
                    </div>
                    <input
                      name={item}
                      value={collectionList[item]}
                      className='collection-values-modal-body-item-input'
                      onChange={handleCollectionListChange}
                    />
                  </div>
                );
              })}
          </div>
          <div className='collection-values-modal-footer'>
            <div className='collection-values-modal-cancel'>
              <button
                className='collection-values-modal-footer-button'
                onClick={() => {
                  setCollectionModel(false);
                  setEditCollectionValueStatus(false);
                }}
              >
                CANCEL
              </button>
            </div>
            <div className='collection-values-modal-add'>
              {!editCollectionValueStatus && (
                <button
                  className='collection-values-modal-footer-button'
                  onClick={handleAddCollectionForm}
                >
                  ADD
                </button>
              )}
              {editCollectionValueStatus && (
                <button
                  className='collection-values-modal-footer-button'
                  onClick={handleUpdateCollectionForm}
                >
                  UPDATE
                </button>
              )}
            </div>
          </div>
        </div>
      )}
      <div className='collection-values-header'>
        <h2>{contentType && contentType.contentTypeName}</h2>
        {/* {contentTypeList && JSON.stringify(contentTypeList)} */}
      </div>
      {/* {collectionList && JSON.stringify(collectionList)} */}
      <div className='collection-values-info'>
        <div>
          <h1>{collectionData && collectionData.length} ENTRIES FOUND</h1>
        </div>
        <div className='addNewCollection' onClick={addNewCollection}>
          Add a new entry
        </div>
      </div>
      <div className='collection-values-table-header'>
        <div className='collection-values-table-header-left'>
          <div className='collection-values-table-header-item'>ID</div>
          {tableHeaders &&
            tableHeaders.map((item) => {
              return (
                <div
                  key={item.id}
                  className='collection-values-table-header-item'
                >
                  <div className='content-box padding'>{item}</div>
                </div>
              );
            })}
        </div>
        <div className='collection-values-table-header-right'>Actions</div>
      </div>
      <div className='collection-values-table'>
        {collectionData &&
          collectionData.map((item) => {
            return (
              <div key={item.id} className='collection-values-table-item'>
                {/* {JSON.stringify(item)} */}
                <div className='collection-values-table-header-left'>
                  <div className='collection-values-table-item-value'>
                    {contentType && contentType.id}
                  </div>
                  {tableHeaders.map((value) => (
                    <div
                      key={value.id}
                      className='collection-values-table-item-value'
                    >
                      <div className='content-box'> {item.content[value]} </div>
                    </div>
                  ))}
                </div>
                <div className='collection-values-table-header-right'>
                  <img
                    onClick={() => {
                      handleEditCollectionValues(item);
                    }}
                    src={UserPencil}
                    className='icon-utils'
                    alt='user-pencil'
                  />

                  <img
                    onClick={() => {
                      handleDeleteCollectionValues(item);
                    }}
                    src={Trash}
                    className='icon-utils'
                    alt='user-pencil'
                  />
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
