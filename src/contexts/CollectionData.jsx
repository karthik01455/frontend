/* eslint-disable react/prop-types */
import React, { createContext, useEffect, useState } from 'react';
import makeRequest from '../utils/makeRequest';
import {
  CONTENT_TYPE_BACKEND_URL,
  GET_ALL_CONTENT_TYPE,
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
