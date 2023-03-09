/* eslint-disable react/prop-types */
import React, { createContext, useEffect, useState } from 'react';
import makeRequest from '../utils/makeRequest';
import {
  CONTENT_TYPE_BACKEND_URL,
  GET_ALL_CONTENT_TYPE,
  GET_CONTENT_TYPE_BY_ID,
  GET_COLLECTIONS_BY_CONTENT_TYPE_ID,
} from '../constants/apiEndPoints';

export const CollectionDataContext = createContext({});

export function CollectionDataProvider({ children }) {
  const [collectionSelected, setCollectionSelected] = useState(false);
  const [contentTypeList, setcontentTypeList] = useState(null);
  const [contentType, setcontentType] = useState(null);
  const [collectionData, setcollectionData] = useState(null);
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
  }, []);

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

  contentTypeList && handleCount();

  return (
    <CollectionDataContext.Provider
      value={{
        collectionSelected,
        setCollectionSelected,
        contentTypeList,
        setcontentTypeList,
        contentType,
        setcontentType,
        collectionData,
        setcollectionData,
      }}
    >
      {children}
    </CollectionDataContext.Provider>
  );
}
