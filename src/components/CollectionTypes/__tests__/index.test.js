import React from 'react';
import { screen, render } from '@testing-library/react';
import Home from '..';
import { LoginDataContext } from '../../contexts/LoginData';
import { ContentTypeDataContext } from '../../contexts/ContentTypeData';
import { CollectionDataContext } from '../../contexts/CollectionData';
const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  useNavigate: () => mockedNavigate,
}));
jest.mock('../../../utils/makeRequest');
const mockLoginData = {
  emailId: 'e',
  password: 'a',
};
const mockContentTypeData = {
  contentTypeList: [
    {
      id: 1,
      contentTypeName: 'test',
    },
  ],
};
const mockCollectionData = {
  collectionData: [
    {
      id: 1,
      collectionName: 'test',
    },
  ],
};
describe('Home', () => {
  it('should render the Home page', () => {
    render(
      <LoginDataContext.Provider value={mockLoginData}>
        <ContentTypeDataContext.Provider value={mockContentTypeData}>
          <CollectionDataContext.Provider value={mockCollectionData}>
            <Home />
          </CollectionDataContext.Provider>
        </ContentTypeDataContext.Provider>
      </LoginDataContext.Provider>
    );
    expect(screen.getByText('Home')).toBeInTheDocument();
  });
  it('should render the Home page', () => {
    render(
      <LoginDataContext.Provider value={mockLoginData}>
        <ContentTypeDataContext.Provider value={mockContentTypeData}>
          <CollectionDataContext.Provider value={mockCollectionData}>
            <Home />
          </CollectionDataContext.Provider>
          `
        </ContentTypeDataContext.Provider>
      </LoginDataContext.Provider>
    );
    expect(screen.getByText('Home')).toBeInTheDocument();
  });
});
