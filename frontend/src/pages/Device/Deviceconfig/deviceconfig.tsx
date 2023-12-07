import { Button, Descriptions, Input, Empty, Badge, Form, Modal, Select,  Dropdown } from 'antd';
import React, { useState } from 'react';
import type { Key } from 'react';
import { queryDevice } from '@/services/ant-design-pro/api';
import request from 'umi-request';

import { EllipsisOutlined, SearchOutlined  } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable, TableDropdown } from '@ant-design/pro-components';

const valueEnum = {
  0: 'close',
  1: 'running',
  2: 'online',
  3: 'error',
};

export type TableListItem = {
  key: number;
  device_id: string
  device_name: string;
  creator: string;
  status: string;
  createdAt: number;
  progress: number;
  money: number;
  memo: string;
};
const tableListDataSource: TableListItem[] = [];

const creators = ['付小小', '曲丽丽', '林东东', '陈帅帅', '兼某某'];

for (let i = 0; i < 5; i += 1) {
  tableListDataSource.push({
    key: i,
    device_id: '0' + i,
    device_name: i,
    creator: creators[Math.floor(Math.random() * creators.length)],
    status: valueEnum[((Math.floor(Math.random() * 10) % 4) + '') as '0'],
    createdAt: Date.now() - Math.floor(Math.random() * 2000),
    type:
      i % 2 === 1
        ? 'Sensor'
        : 'Wearable',
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
    title: '设备ID',
    dataIndex: 'device_id',
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
    title: '设备名',
    dataIndex: 'device_name',
    valueEnum: {
      all: { text: '全部' },
      付小小: { text: '付小小' },
      曲丽丽: { text: '曲丽丽' },
      林东东: { text: '林东东' },
      陈帅帅: { text: '陈帅帅' },
      兼某某: { text: '兼某某' },
    },
  },
  {
    title: '设备状态',
    dataIndex: 'status',
    initialValue: 'all',
    filters: true,
    onFilter: true,
    valueEnum: {
      all: { text: '全部', status: 'Default' },
      close: { text: '关闭', status: 'Default' },
      running: { text: '运行中', status: 'Processing' },
      online: { text: '已上线', status: 'Success' },
      error: { text: '异常', status: 'Error' },
    },
  },
  {
    title: '设备类型',
    dataIndex: 'type',
    ellipsis: true,
    copyable: true,
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
  //       key="actionGroup"
  //       menus={[
  //         { key: 'copy', name: '复制' },
  //         { key: 'delete', name: '删除' },
  //       ]}
  //     />,
  //   ],
  // },
];



const { TextArea } = Input;

const Deviceconfig: React.FC = () =>{
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<any[]>([]);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [showall, setShowAll] = useState(false);

  const showModal = () => {
    form.resetFields();
    setOpen(true);
  };

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };
  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  };

  const handleReset = () => {
    form.resetFields();
  }

  const handleshowAll= () => {
    setShowAll(true)
  }

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };


  const onSearch = async (values: any) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);

    const testInfo = [
    {
      key:'1',
      name: 'equipment_id',
      label: '设备ID',
      children: '01',
    },
      {
        key: '2',
        name: 'device_name',
        label: '设备名',
        children: 'Mobile Phone',
      },
      {
        key: '3',
        name: 'type',
        label: '设备类型',
        children: '穿戴设备',
      },
      {
        key: '4',
        name: 'alert',
        label: 'Status',
        children: <Badge status="processing" text="Running" />,
      },
      {
        key: '5',
        name: 'activate_time',
        label: '最近一次活跃',
        children: '2023-11-13 12:15:03',
      },
      {
        key: '6',
        label: 'initial_time',
        children: '2022-10-25 23:11:53'
      },
      {
        key: '7',
        name: 'description',
        label: '设备简介',
        children: (
            <>
              这是我的手表，喵~
              <br />
              请不要随意拿走i
              <br />
            </>
        ),
      },]
    setItems(testInfo);
    setShowAll(false);
    const msg = await queryDevice({ ...values});
    console.log(msg)
  };



  const Content: React.FC = () =>{
    if(items.length === 0)
      return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;
    else{
      if(showall == false){
        return(<Descriptions
                bordered
                title="配置信息"
                size="default"
                extra={
                  <>
                    <Button type="primary" onClick={showModal}>修改配置</Button>
                    <Modal
                        title="设备信息"
                        open={open}
                        onOk={handleOk}
                        confirmLoading={confirmLoading}
                        onCancel={handleCancel}
                        footer={[
                          <Button key="back" onClick={handleCancel}>
                            取消
                          </Button>,
                          <Button type="default" htmlType="reset" onClick={handleReset} >
                            清空
                          </Button>,
                          <Button key="submit" type="primary" loading={confirmLoading} onClick={handleOk}>
                            提交
                          </Button>,
                        ]}
                    >
                      <Form
                          {...formItemLayout}
                          form={form}
                          name="register"
                          onFinish={onFinish}
                          initialValues={{
                            device_id: '01',
                          }}
                          scrollToFirstError
                      >
                        <Form.Item
                            name="device_id"
                            label="设备ID"
                        >
                          <Input disabled={true}/>
                        </Form.Item>

                        <Form.Item
                            name="device_name"
                            label="设备名称"
                            rules={[
                              {
                                required: true,
                                message: 'Please input your E-mail!',
                              },
                            ]}
                        >
                          <Input />
                        </Form.Item>

                        <Form.Item
                            name="type"
                            label="设备类型"
                            rules={[
                              {
                                required: true,
                                message: '请输入设备类型',
                              },
                            ]}
                            hasFeedback
                        >
                          <Select>
                            <Select.Option value="sensor">传感设备</Select.Option>
                            <Select.Option value="wear">穿戴设备</Select.Option>
                            <Select.Option value="house">家居设备</Select.Option>
                            <Select.Option value="transport">交通设备</Select.Option>
                            <Select.Option value="others">其他设备</Select.Option>
                          </Select>
                        </Form.Item>



                        <Form.Item
                            name="status"
                            label="设备状态"
                            rules={[
                              {
                                required: true,
                                message: 'Please input your E-mail!',
                              },
                            ]}
                        >
                          <Select>
                            <Select.Option value="running"><Badge status="processing" text="Running" /></Select.Option>
                            <Select.Option value="warning"><Badge status="warning" text="Warning" /></Select.Option>
                            <Select.Option value="down"><Badge status="default" text="Down" /></Select.Option>
                          </Select>
                        </Form.Item>

                        <Form.Item
                            name="description"
                            label="设备简介"
                            rules={[
                              {
                                required: true,
                                message: 'Please input your E-mail!',
                              },
                            ]}
                        >
                          <TextArea rows={4} placeholder="简介：" maxLength={256} />
                        </Form.Item>
                      </Form>
                    </Modal>
                  </>
                }
            >
              {items.map((item, index) => (
                  <Descriptions.Item key={index} label={item.label}>
                    {item.children}
                  </Descriptions.Item>
              ))}
            </Descriptions>
        )
      }
      else{
        return (
          <ProTable<TableListItem>
            columns={columns}
            dataSource={tableListDataSource}
            // request={(params, sorter, filter) => {
            //   // 表单搜索项会从 params 传入，传递给后端接口。
            //   console.log(params, sorter, filter);
            //   return Promise.resolve({
            //     data: tableListDataSource,
            //     success: true,
            //   });
            // }}
            rowKey="key"
            pagination={{
              showQuickJumper: true,
            }}
            search={false}
            dateFormatter="string"
            toolbar={{
              title: '配置信息',
              tooltip: '',
            }}
            // toolBarRender={() => [
            //   <Dropdown
            //     key="menu"
            //     menu={{
            //       items: [
            //         {
            //           label: '1st item',
            //           key: '1',
            //         },
            //         {
            //           label: '2nd item',
            //           key: '2',
            //         },
            //         {
            //           label: '3rd item',
            //           key: '3',
            //         },
            //       ],
            //     }}
            //   >
            //     <Button>
            //       <EllipsisOutlined />
            //     </Button>
            //   </Dropdown>,
            // ]}
          />
        )
      }
    }
  }


  return (
      <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                  <p style={{ marginRight: 20, display: 'inline-block' }}>详情查询:</p>
                  <Input.Search
                      placeholder="请输入设备名或设备编号 "
                      onSearch={onSearch}
                      enterButton
                      style={{ width: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                  />
              </div>
              <Button type="ghost" onClick={handleshowAll}>
                  All Device
              </Button>
          </div>
        <br />
        <br />
        <Content />
      </div>
  );
};
export default Deviceconfig;
