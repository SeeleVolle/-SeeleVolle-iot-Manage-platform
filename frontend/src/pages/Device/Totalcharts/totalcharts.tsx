import React, { useState, useEffect } from "react";
import { Pie } from '@ant-design/plots';
import { Column, Line } from '@ant-design/plots';
import { Card, Col, Row, Statistic } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
interface NumberPieProps {
  data: any[];
}
interface MessageColumnProps {
  data: any[];
}
interface DeviceCardProps {
  data: any[];
}

const NumberPie: React.FC<NumberPieProps> = ({ data }) => {
  const config = {
    appendPadding: 10,
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 0.75,
    label: {
      type: 'spider',
      labelHeight: 28,
      content: '{name}\n{percentage}',
    },
    interactions: [
      {
        type: 'element-selected',
      },
      {
        type: 'element-active',
      },
    ],
  };
  return <Pie {...config} />;
};

const MessageColumn: React.FC<MessageColumnProps> = ({ data }) => {
  const config = {
    data,
    xField: 'date',
    yField: 'value',
    columnWidthRatio: 0.618,
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: '日期',
      },
      sales: {
        alias: '接收总量',
      },
    },
    minColumnWidth: 20,
    maxColumnWidth: 20,
  };
  return <Column {...config} />;
}

const DeviceCard: React.FC<DeviceCardProps> = ({data}) => {
  const totalDevice = data[0]?.totaldevice || 0;
  const upRatio = data[0]?.up_ratio || 0;
  const onlineRatio = data[0]?.online_ratio || 0;

  return (
      <Card bordered={false} style={{width: 430}}>
        <Row gutter={16}>
          <Col span={8}>
            <Statistic title="设备总数" value={totalDevice} />
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={8}>
            <Statistic
                title="总数"
                value={upRatio}
                precision={2}
                valueStyle={{ color: '#cf1322' }}
                prefix={<ArrowDownOutlined />}
                suffix="%"
            />
          </Col>
          <Col span={8}>
            <Statistic
                title="在线"
                value={onlineRatio}
                precision={2}
                valueStyle={{ color: '#3f8600' }}
                prefix={<ArrowUpOutlined />}
                suffix="%"
            />
          </Col>
        </Row>
      </Card>
  );
}

const DeviceLine:React.FC<NumberPieProps> = ({data}) => {
  const config = {
    data,
    xField: 'date',
    yField: 'value',
    label: {},
    point: {
      size: 5,
      shape: 'diamond',
      style: {
        fill: 'white',
        stroke: '#5B8FF9',
        lineWidth: 2,
      },
    },
    tooltip: {
      showMarkers: false,
    },
    state: {
      active: {
        style: {
          shadowBlur: 4,
          stroke: '#000',
          fill: 'red',
        },
      },
    },
    interactions: [
      {
        type: 'marker-active',
      },
    ],
  };
  return <Line {...config} />;
}

const DemoColumn = () =>{
  const data = [
    {
      type: '家具家电',
      sales: 38,
    },
    {
      type: '粮油副食',
      sales: 52,
    },
    {
      type: '生鲜水果',
      sales: 61,
    },
    {
      type: '美容洗护',
      sales: 145,
    },
    {
      type: '母婴用品',
      sales: 48,
    },
    {
      type: '进口食品',
      sales: 38,
    },
    {
      type: '食品饮料',
      sales: 38,
    },
    {
      type: '家庭清洁',
      sales: 38,
    },
  ];
  const config = {
    data,
    xField: 'type',
    yField: 'sales',
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: '类别',
      },
      sales: {
        alias: '销售额',
      },
    },
    minColumnWidth: 20,
    maxColumnWidth: 20,
  };
  return <Column {...config} />;
}

const Totalcharts: React.FC = () => {
  const [dataDevice, setDataDevice] = useState<any[]>([]);
  const [dataMessage, setDataMessage] = useState<any[]>([]);
  const [dataCard, setDataCard] = useState<any[]>([]);
  const [dataLine, setDataLine] = useState<any[]>([]);

  const testdataDevice = [
    {
      type: '在线',
      value: 27,
    },
    {
      type: '警告',
      value: 25,
    },
    {
      type: '下线',
      value: 18,
    },
  ];

  const testdataMessage = [
    {
      date: '11-13',
      value: 78,
    },
    {
      date: '11-12',
      value: 123,
    },
    {
      date: '11-11',
      value: 99,
    },
    {
      date: '11-10',
      value: 278,
    },
    {
      date: '11-09',
      value: 106,
    },
  ]

  const testdataCard = [
    {
      totaldevice: 100,
      up_ratio: 0.1,
      online_ratio: 0.3,
    }
  ]

  const testdataLine = [
    {
      date: '11-09',
      value: 3,
    },
    {
      date: '11-10',
      value: 4,
    },
    {
      date: '11-11',
      value: 3.5,
    },
    {
      date: '11-12',
      value: 5,
    },
    {
      date: '11-13',
      value: 4.9,
    },
  ]


  useEffect(() => {
    setDataDevice(testdataDevice);
    setDataMessage(testdataMessage);
    setDataCard(testdataCard)
    setDataLine(testdataLine)
  }, []); // 添加 useEffect 以设置初始数据

  return(
    <div>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <div>
            <DeviceCard data={dataCard} />
          </div>
        </Col>
        <Col span={12}>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '8px' }}>设备在线情况</p>
            <NumberPie data={dataDevice} />
          </div>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '16px' }}>设备接收消息总量</p>
            <MessageColumn data={dataMessage} />
          </div>
        </Col>
        <Col span={12}>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '16px' }}>设备数量变化情况</p>
            <DeviceLine data={dataLine} />
          </div>
        </Col>
      </Row>
    </div>
  )
};

export default Totalcharts;

