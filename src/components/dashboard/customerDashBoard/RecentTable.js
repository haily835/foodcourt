import React from 'react';
import { Dropdown, Menu, Table } from 'antd';

// import { request } from '@/request';
// import useFetch from './useFetch';

import { EllipsisOutlined, EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

function DropDownRowMenu({ row }) {
  const Show = () => {};
  function Edit() {}
  function Delete() {}
  return (
    <Menu style={{ width: 130 }}>
      <Menu.Item icon={<EyeOutlined />} onClick={Show}>
        Show
      </Menu.Item>
      <Menu.Item icon={<EditOutlined />} onClick={Edit}>
        Edit
      </Menu.Item>
      <Menu.Item icon={<DeleteOutlined />} onClick={Delete}>
        Delete
      </Menu.Item>
    </Menu>
  );
}


function DropDownEmailRowMenu({ row }) {
  const Show = () => {};
  function Edit() {}
  function Delete() {}
  return (
    <Menu style={{ width: 230 }}>
      <Menu.Item onClick={Show}>
        Send email new food list
      </Menu.Item>
      <Menu.Item onClick={Edit}>
        Send email discount
      </Menu.Item>
      <Menu.Item onClick={Delete}>
        Send email congratulation for new customer
      </Menu.Item>
    </Menu>
  );
}

export default function RecentTable({ ...props }) {
  let { entity, dataTableColumns, data } = props;
  dataTableColumns = [
    ...dataTableColumns,
    {
      title: '',
      render: (row) => (
        <Dropdown overlay={entity === 'customer' ? DropDownEmailRowMenu({ row }) : DropDownRowMenu({ row })} trigger={['click']}>
          <EllipsisOutlined style={{ cursor: 'pointer', fontSize: '24px' }} />
        </Dropdown>
      ),
    },
  ];

  // const asyncList = () => {
  //   return request.list({ entity });
  // };
  // const { result, isLoading, isSuccess } = useFetch(asyncList);
  const firstFiveItems = () => {
    // if (isSuccess && result) return result.slice(0, 5);
    return [];
  };
  return (
    <>
      <Table
        columns={dataTableColumns}
        rowKey={(item) => item._id}
        dataSource={data}
        pagination={false}
        //loading={isLoading}
        style={{maxHeight: 300, overflow: 'auto'}}
      />
    </>
  );
}
