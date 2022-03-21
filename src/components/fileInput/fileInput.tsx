import React, { useState } from 'react';
import { Upload, Space, Button, UploadProps } from 'antd';
import { RcFile } from 'antd/lib/upload';
import { UploadOutlined } from '@ant-design/icons';
import { gql, useMutation } from '@apollo/client';

const UPLOAD_FILE = gql`
  mutation uploadFile($files: [Upload!]!) {
    uploadFile(files: $files)
  }
`;

export const FileInput: React.FC = () => {
  const [uploadFile] = useMutation(UPLOAD_FILE, {
    onCompleted: () => {
      setUploading(false);
    },
    onError: () => {
      setUploading(false);
    }
  });
  const [uploading, setUploading] = useState(false);
  const [fileList, setFileList] = useState<RcFile[]>([]);

  const handleUpload = () => {
    setUploading(true);
    uploadFile({ variables: { files: fileList } });
  };

  const props: UploadProps<RcFile> = {
    multiple: true,
    onRemove: (file) => {
      const currentFile = file as RcFile;
      const index = fileList.indexOf(currentFile);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList([...newFileList]);
      return false;
    },
    beforeUpload: (file) => {
      setFileList((value) => {
        return [...value, file];
      });

      return false;
    },
    fileList
  };
  return (
    <Space direction="vertical">
      <Upload {...props}>
        <Button icon={<UploadOutlined />}>Select Files</Button>
      </Upload>
      <Button
        type="primary"
        onClick={handleUpload}
        disabled={fileList.length === 0}
        loading={uploading}
        style={{ marginTop: 16 }}>
        {uploading ? 'Uploading' : 'Start Upload'}
      </Button>
    </Space>
  );
};
