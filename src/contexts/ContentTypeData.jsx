/* eslint-disable react/prop-types */
import React, { createContext, useEffect, useState, useContext } from 'react';
import makeRequest from '../utils/makeRequest';

import {
  CONTENT_TYPE_BACKEND_URL,
  GET_COLLECTIONS_BY_CONTENT_TYPE_ID,
  GET_ALL_CONTENT_TYPE,
} from '../constants/apiEndPoints';
export const ContentTypeDataContext = createContext({});

export function ContentTypeDataProvider({ children }) {
  const [contentTypeSelected, setcontentTypeSelected] = useState(false);

  const [contentTypeList, setcontentTypeList] = useState(null);
  const [contentType, setcontentType] = useState(null);
  const [contentTypeData, setcontentTypeData] = useState(null);
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
        console.log('contentTypeList', contentTypeList);
      }
    );
  }, []);

  return (
    <ContentTypeDataContext.Provider
      value={{
        contentTypeSelected,
        setcontentTypeSelected,
        contentTypeList,
        setcontentTypeList,
        contentType,
        setcontentType,
        contentTypeData,
        setcontentTypeData,
      }}
    >
      {children}
    </ContentTypeDataContext.Provider>
  );
}
