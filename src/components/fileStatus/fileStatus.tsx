import React from 'react';
import { gql } from '@apollo/client';
import { message, Space } from 'antd';
import { useSubscription } from '@apollo/client';
import { useEffect } from 'react';

const RENDER_FILE_STATUS = gql`
  subscription {
    fileStatus
  }
`;

enum UploadStatuses {
  SUCCESS = 'Fulfilled',
  ERROR = 'Rejected'
}

export const FileStatus = () => {
  const { data } = useSubscription(RENDER_FILE_STATUS);

  useEffect(() => {
    if (data && data.fileStatus === UploadStatuses.SUCCESS) {
      message.success(data.fileStatus);
    }

    if (data && data.fileStatus === UploadStatuses.ERROR) {
      message.error(data.fileStatus);
    }
  }, [data]);

  return <Space />;
};
