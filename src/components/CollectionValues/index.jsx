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
import makeRequest from '../../utils/makeRequest';
import { CollectionDataContext } from '../../contexts/CollectionData';
export default function CollectionValues() {
  const [contentFiels, setContentFiels] = useState([]);

  const { contentType, setContentType } = useContext(CollectionDataContext);
  const { collectionData, setcollectionData } = useContext(
    CollectionDataContext
  );
  const { contentTypeList, setcontentTypeList } = useContext(
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
  }, [contentType]);
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

  return (
    <div className='cv-container'>
      {collectionModel && (
        <div className='cv-modal'>
          <div className='cv-modal-header'></div>
          <div className='cv-modal-body'>
            {contentFiels &&
              contentFiels.map((item) => {
                return (
                  <div key={item.id} className='cv-modal-body-item'>
                    <input
                      name={item}
                      value={collectionList[item]}
                      onChange={handleCollectionListChange}
                    />
                    {item}
                  </div>
                );
              })}
          </div>
          <div className='cv-modal-add'>
            {!editCollectionValueStatus && (
              <button onClick={handleAddCollectionForm}>ADD</button>
            )}
            {editCollectionValueStatus && (
              <button onClick={handleUpdateCollectionForm}>UPDATE</button>
            )}
          </div>
        </div>
      )}
      <div className='cv-header'>
        {contentType && contentType.contentTypeName}
        {/* {contentTypeList && JSON.stringify(contentTypeList)} */}
      </div>
      {/* {collectionList && JSON.stringify(collectionList)} */}
      <div className='cv-info'>
        <div>
          <h1>{collectionData && collectionData.length} ENTRIES FOUND</h1>
        </div>
        <div className='addNewCollection' onClick={addNewCollection}>
          Add a new entry
        </div>
      </div>

      <div className='cv-table-header'>
        {contentFiels &&
          contentFiels.map((item) => {
            return (
              <div key={item.id} className='cv-table-header-item'>
                {item}
              </div>
            );
          })}
      </div>
      <div className='cv-table'>
        {collectionData &&
          collectionData.map((item) => {
            return (
              <div key={item.id} className='cv-table-item'>
                {JSON.stringify(item)}
                <button
                  onClick={() => {
                    handleEditCollectionValues(item);
                  }}
                >
                  EDIT
                </button>
                <button
                  onClick={() => {
                    handleDeleteCollectionValues(item);
                  }}
                >
                  DELETE
                </button>
              </div>
            );
          })}
      </div>
    </div>
  );
}
