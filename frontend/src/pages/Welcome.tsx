import { PageContainer } from '@ant-design/pro-components';
import { Alert, Card, Typography } from 'antd';
import React from 'react';
import { FormattedMessage, useIntl } from 'umi';
import styles from './Welcome.less';

const CodePreview: React.FC = ({ children }) => (
  <pre className={styles.pre}>
    <code>
      <Typography.Text copyable>{children}</Typography.Text>
    </code>
  </pre>
);

const Welcome: React.FC = () => {
  const intl = useIntl();

  return (
    <PageContainer>
      <Card>
        <Alert
          message={intl.formatMessage({
            id: 'pages.welcome.alertMessage',
            defaultMessage: 'Faster and stronger heavy-duty components have been released.',
          })}
          type="success"
          showIcon
          banner
          style={{
            margin: -12,
            marginBottom: 24,
          }}
        />
        <Typography.Text strong>
          <a
            href="https://procomponents.ant.design/components/table"
            rel="noopener noreferrer"
            target="__blank"
          >
            <FormattedMessage id="pages.welcome.link" defaultMessage="Welcome" />
          </a>
        </Typography.Text>
        <CodePreview>
          <b>用户信息</b>：查看用户名，邮箱，并对邮箱和密码进行修改(用户名不允许修改)<br/>
          <b>设备总览</b>：以图形展示设备概况<br/>
          <b>设备管理</b>：分为三块<br/>
          <ul>
            <li>配置信息：查看所有设备配置信息，并对配置信息进行修改</li>
            <li>消息查询：查询某台设备的消息记录</li>
            <li>历史轨迹：查询某台设备的历史轨迹</li>
          </ul>
        </CodePreview>
      </Card>
    </PageContainer>
  );
};

export default Welcome;
