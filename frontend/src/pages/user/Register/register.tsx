import { register } from '@/services/ant-design-pro/api';
import {
  ProForm,
  ProFormText,
} from '@ant-design/pro-components';
import { message, Button } from 'antd';
import React, { useState, useRef  } from 'react';
import { FormattedMessage, history, useIntl} from 'umi';
import styles from './register.less';
import type { ProFormInstance } from '@ant-design/pro-components';


const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

const Register: React.FC = () =>{
  const intl = useIntl();
  const formRef = useRef<ProFormInstance>();
  const onFill = () => {
    formRef?.current?.setFieldsValue({
      username: '张三',
      password: '12345678',
      email: 'squhuang@gmail.com',
    });
  };

  const handleSubmit =  async (values: API.RegisterParams) =>{
    const msg = await register({ ...values});
    console.log(msg);
    if(msg.status == 'ok'){
      message.success('注册成功！');
      console.log(msg)
      waitTime(2000);
      history.push('/user/login');
    }
  }

  return (
    <div className={styles.container}>
      <h1>注册信息</h1>
      <div className={styles.centerContent}>
        <ProForm
          style={{ marginLeft: 130 }}
          title="注册"
          formRef={formRef}
          submitter={{
            render: (props, doms) => {
              return [
                ...doms,
                <Button htmlType="button" onClick={onFill} key="edit">
                  填写示例
                </Button>,
              ];
            },
          }}
          onFinish={async (values) => {
            await handleSubmit(values as API.RegisterParams);
          }}
        >
          <ProFormText
            width="md"
            name="username"
            label="用户名"
            tooltip="最长为 24 位"
            placeholder={intl.formatMessage({
              id: 'pages.register.username.placeholder',
              defaultMessage: '用户名: ',
            })}
            rules={[
              {
                required: true,
                message: (
                  <FormattedMessage
                    id="pages.login.username.required"
                    defaultMessage="请输入用户名!"
                  />
                ),
              },
              {
                pattern: /^[\u4e00-\u9fa5a-zA-Z0-9_-]{2,16}$/,
                message: (
                  <FormattedMessage
                    id="pages.register.username.invalid"
                    defaultMessage="仅能包含字母和数字，长度在2-16个字符"
                  />
                ),
              },
            ]}
          />

          <ProFormText.Password
            width="md"
            name="password"
            label="密码"
            placeholder={intl.formatMessage({
              id: 'pages.email.password.placeholder',
              defaultMessage: '密码: ',
            })}
            rules={[
              {
                required: true,
                message: (
                  <FormattedMessage
                    id="pages.email.password.required"
                    defaultMessage="请输入密码！"
                  />
                ),
              },
              {
                pattern: /^[\u4e00-\u9fa5a-zA-Z0-9_-]{2,16}$/,
                message: (
                  <FormattedMessage
                    id="pages.register.username.invalid"
                    defaultMessage="仅能包含字母和数字，长度在2-16个字符"
                  />
                ),
              },
            ]}
          />

          <ProFormText.Password
              width="md"
              name="password_repeat"
              label="确认密码"
              placeholder={intl.formatMessage({
                id: 'pages.email.password.placeholder',
                defaultMessage: '确认密码: ',
              })}
              rules={[
                {
                  required: true,
                  message: (
                      <FormattedMessage
                          id="pages.email.password.required"
                          defaultMessage="请输入密码！"
                      />
                  ),
                },
                {
                  pattern: /^[\u4e00-\u9fa5a-zA-Z0-9_-]{2,16}$/,
                  message: (
                      <FormattedMessage
                          id="pages.register.username.invalid"
                          defaultMessage="仅能包含字母和数字，长度在2-16个字符"
                      />
                  ),
                },
                {
                    validator: async (_, values) => {
                        if (!values || values !== formRef?.current?.getFieldValue('password')) {
                        throw new Error('两次输入的密码不匹配!');
                        }
                    },
                },
              ]}
          />

          <ProFormText
            width="md"
            name="email"
            label="邮箱"
            placeholder={intl.formatMessage({
              id: 'pages.register.email.placeholder',
              defaultMessage: '邮箱: ',
            })}
            rules={[
              {
                required: true,
                message: (
                  <FormattedMessage
                    id="pages.register.email.required"
                    defaultMessage="请输入密码！"
                  />
                ),
              },
              {
                pattern: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
                message: (
                  <FormattedMessage
                    id="pages.register.email.invalid"
                    defaultMessage="邮箱不合法"
                  />
                ),
              },
            ]}
          />
        </ProForm>
      </div>
      {/*<Footer />*/}
    </div>
  );
};
export default Register;
