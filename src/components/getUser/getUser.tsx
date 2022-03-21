import React from 'react';
import { gql, useLazyQuery } from '@apollo/client';
import { Input, Space, Form, Button, Card } from 'antd';

const GET_USER_DATA = gql`
  query GetContactByEmail($email: String!) {
    getContactByEmail(email: $email) {
      vid
    }
  }
`;

export const GetUser: React.FC = () => {
  const [getContact, { data }] = useLazyQuery(GET_USER_DATA);

  const handleEmail = ({ email }: { email: string }) => {
    getContact({ variables: { email } });
  };

  return (
    <Space align="center" direction="vertical">
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        onFinish={handleEmail}
        autoComplete="off">
        <Form.Item label="Email" name="email" rules={[{ type: 'email' }]}>
          <Input placeholder="HubSpot contact email" />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Get contacts vid
          </Button>
        </Form.Item>
      </Form>

      {data && <Card title="Some contact data">{JSON.stringify(data)}</Card>}
    </Space>
  );
};
