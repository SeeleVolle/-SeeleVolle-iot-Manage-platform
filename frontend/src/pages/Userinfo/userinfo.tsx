import type { RadioChangeEvent } from 'antd';
import { Button, Descriptions, Radio, Modal, Form, Input } from 'antd';
import React, { useState } from 'react';
const Userinfo: React.FC = () =>{
    const [size, setSize] = useState<'default' | 'middle' | 'small'>('default');
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);

    const showModal = () => {
        form.resetFields();
        setOpen(true);
    };

    const [form] = Form.useForm();
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

    const onChange = (e: RadioChangeEvent) => {
        console.log('size checked', e.target.value);
        setSize(e.target.value);
    };



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
    const tailFormItemLayout = {
        wrapperCol: {
            xs: {
                span: 24,
                offset: 0,
            },
            sm: {
                span: 16,
                offset: 8,
            },
        },
    };

    return (
        <div>
            <>
                <p style={{ display: 'inline-block', marginRight: 20}}>Choose size:</p>
                <Radio.Group onChange={onChange} value={size}>
                    <Radio value="default">default</Radio>
                    <Radio value="middle">middle</Radio>
                    <Radio value="small">small</Radio>
                </Radio.Group>
            </>
            <br />
            <br />
            <Descriptions
                bordered
                title="用户信息"
                size={size}
                extra={
                    <>
                        <Button type="primary" onClick={showModal}>
                            修改
                        </Button>
                        <Modal
                            title="Title"
                            open={open}
                            onOk={handleOk}
                            confirmLoading={confirmLoading}
                            onCancel={handleCancel}
                        >
                            <Form
                                {...formItemLayout}
                                form={form}
                                name="register"
                                onFinish={onFinish}
                                initialValues={{
                                    username: 'Squarehuang',
                                }}
                                scrollToFirstError
                            >
                                <Form.Item
                                    name="username"
                                    label="Username"
                                >
                                    <Input disabled={true}/>
                                </Form.Item>

                                <Form.Item
                                    name="email"
                                    label="E-mail"
                                    rules={[
                                        {
                                            type: 'email',
                                            message: 'The input is not valid E-mail!',
                                        },
                                        {
                                            required: true,
                                            message: 'Please input your E-mail!',
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    name="password"
                                    label="Password"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your password!',
                                        },
                                    ]}
                                    hasFeedback
                                >
                                    <Input.Password />
                                </Form.Item>

                                <Form.Item
                                    name="confirm"
                                    label="Confirm Password"
                                    dependencies={['password']}
                                    hasFeedback
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please confirm your password!',
                                        },
                                        ({ getFieldValue }) => ({
                                            validator(_, value) {
                                                if (!value || getFieldValue('password') === value) {
                                                    return Promise.resolve();
                                                }
                                                return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                            },
                                        }),
                                    ]}
                                >
                                    <Input.Password />
                                </Form.Item>

                                <Form.Item {...tailFormItemLayout}>
                                    <Button type="primary" htmlType="submit" style={{marginRight: 10}}>
                                        Submit
                                    </Button>
                                    <Button type="default" htmlType="Reset" onClick={handleReset} >
                                        Reset
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Modal>
                    </>
                }
            >
                <Descriptions.Item label="Username">Squarehuang</Descriptions.Item>
                <Descriptions.Item label="Register time">2023-11-09</Descriptions.Item>
                <Descriptions.Item label="E-mail">squarehuang@gmail.com</Descriptions.Item>
                <Descriptions.Item label="time">18:05:00</Descriptions.Item>
                <Descriptions.Item label="Device Amount">10</Descriptions.Item>
                {/*<Descriptions.Item label="Config Info">*/}
                {/*    Data disk type: MongoDB*/}
                {/*    <br />*/}
                {/*    Database version: 3.4*/}
                {/*    <br />*/}
                {/*    Package: dds.mongo.mid*/}
                {/*    <br />*/}
                {/*    Storage space: 10 GB*/}
                {/*    <br />*/}
                {/*    Replication factor: 3*/}
                {/*    <br />*/}
                {/*    Region: East China 1<br />*/}
                {/*</Descriptions.Item>*/}
            </Descriptions>
        </div>
    );
};
export default Userinfo;

