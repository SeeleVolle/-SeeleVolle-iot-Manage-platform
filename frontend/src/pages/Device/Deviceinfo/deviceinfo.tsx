import { EllipsisOutlined, SearchOutlined  } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable, TableDropdown } from '@ant-design/pro-components';
import { Button, Dropdown, Input } from 'antd';
import React, { useRef } from 'react';
import moment from 'moment';

const valueEnum = {
  0: 'close',
  1: 'running',
  2: 'warning',
};

export type TableListItem = {
  key: number;
  device_name: string;
  status: string;
  createdAt: number;
  position: [number, number]
  message: string;
};
const tableListDataSource: TableListItem[] = [];

for (let i = 0; i < 5; i += 1) {
  tableListDataSource.push({
    key: i,
    device_name: 'device'+ i,
    status: valueEnum[((Math.floor(Math.random() * 10) % 3) + '') as '0'],
    createdAt: Date.now(),
    position: [Math.random() * 180, Math.random() * 180],
    message:
        i % 2 === 1
            ? '很长很长很长很长很长很长很长的文字要展示但是要留下尾巴'
            : '简短备注文案',
  });
}

const columns: ProColumns<TableListItem>[] = [
  {
    title: '排序',
    dataIndex: 'index',
    valueType: 'indexBorder',
    width: 48,
  },
  {
    title: '设备名称',
    dataIndex: 'device_name',
    render: (_) => <a>{_}</a>,
    // 自定义筛选项功能具体实现请参考 https://ant.design/components/table-cn/#components-table-demo-custom-filter-panel
    filterDropdown: () => (
        <div style={{ padding: 8 }}>
          <Input style={{ width: 188, marginBlockEnd: 8, display: 'block' }} />
        </div>
    ),
    filterIcon: (filtered) => (
        <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
  },
  {
    title: '状态',
    dataIndex: 'status',
    initialValue: 'all',
    filters: true,
    onFilter: true,
    valueEnum: {
      all: { text: '全部', status: 'Default' },
      close: { text: '关闭', status: 'Default' },
      running: { text: '运行中', status: 'Processing' },
      warning: { text: '异常', status: 'Error' },
    },
  },
  {
    title: '上报时间',
    dataIndex: 'createdAt',
    render: (text) => moment(text).format('YYYY-MM-DD HH:mm:ss'),
  },
  {
      title: '上报位置',
      dataIndex: 'position',
      render: (text, record) => `(${record.position[0]}, ${record.position[1]})`
  },
  {
    title: '消息内容',
    dataIndex: 'message',
    ellipsis: true,
    copyable: true,
    search: false,
  },
  // {
  //   title: '操作',
  //   width: 180,
  //   key: 'option',
  //   valueType: 'option',
  //   render: () => [
  //     <a key="link">链路</a>,
  //     <a key="link2">报警</a>,
  //     <a key="link3">监控</a>,
  //     <TableDropdown
  //         key="actionGroup"
  //         menus={[
  //           { key: 'copy', name: '复制' },
  //           { key: 'delete', name: '删除' },
  //         ]}
  //     />,
  //   ],
  // },
];
const DeviceMessageinfo: React.FC = () =>{
  return (
      <ProTable<TableListItem>
          columns={columns}
          // dataSource={tableListDataSource}
          request={(params, sorter, filter) => {
            // 表单搜索项会从 params 传入，传递给后端接口。
            console.log(params);
            return Promise.resolve({
              data: tableListDataSource,
              success: true,
            });
          }}
          rowKey="key"
          pagination={{
            showQuickJumper: true,
          }}
          search={{
            layout: 'vertical',
            defaultCollapsed: false,
          }}
          dateFormatter="string"
          toolbar={{
            title: '设备消息',
            tooltip: '不带参数查询所有设备消息详情',
          }}
          toolBarRender={() => [
          ]}
      />
  );
};
export default DeviceMessageinfo;
