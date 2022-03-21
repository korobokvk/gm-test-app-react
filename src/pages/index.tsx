import React from 'react';
import FileInput from '../components/fileInput';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import { Space } from 'antd';
import styled from 'styled-components';

import { splitLink } from '../utils/splitLink';
import FileStatus from '../components/fileStatus';
import GetUser from '../components/getUser';

const link = createUploadLink({
  uri: 'http://localhost:8880/graphql'
});

const fileClient = new ApolloClient({
  cache: new InMemoryCache(),
  link
});

const contactClient = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache()
});

const Layout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 25px;
  padding-top: 100px;
`;

const InnerLayout = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 70%;
`;

export const MainPage: React.FC = () => {
  return (
    <Layout>
      <InnerLayout>
        <ApolloProvider client={fileClient}>
          <FileInput />
        </ApolloProvider>
        <ApolloProvider client={contactClient}>
          <FileStatus />
          <GetUser />
        </ApolloProvider>
      </InnerLayout>
    </Layout>
  );
};
