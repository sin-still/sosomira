import React from "react"
import { Button, Checkbox, Form, Input, Modal } from "antd"
import styled from "styled-components"

const onFinish = (values) => {
   console.log("Success:", values)
}
const onFinishFailed = (errorInfo) => {
   console.log("Failed:", errorInfo)
}

const LoginModal = ({ isOpen, onClose }) => {
   const handleOk = () => {
      onClose() // 모달 닫기
   }

   const handleCancel = () => {
      onClose() // 모달 닫기
   }
   const StyledModal = styled(Modal)`
      /* .ant-modal-content {
         
         padding: 50px 150px;
         
         
      } */
   `

   return (
      <>
         {/* <Button type='primary' onClick={showModal}>
            Open Modal
         </Button> */}
         <StyledModal
            title='SOSOMIRA'
            visible={isOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            style={{
               marginBottom:'100px'
            }}
         >
            <div className='{styles.modalContainer}'>
               <Form
                  name='basic'
                  labelCol={{
                     span: 8,
                  }}
                  wrapperCol={{
                     span: 16,
                  }}
                  style={{
                     maxWidth: 900,
                  }}
                  initialValues={{
                     remember: true,
                  }}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  autoComplete='off'
               >
                  <Form.Item
                     label='아이디'
                     name='username'
                     rules={[
                        {
                           required: true,
                           message: "Please input your username!",
                        },
                     ]}
                     /* style={{marginLeft:'-20%'}} */
                  >
                     <Input />
                  </Form.Item>

                  <Form.Item
                     label='비밀번호'
                     name='password'
                     rules={[
                        {
                           required: true,
                           message: "Please input your password!",
                        },
                     ]}
                     /* style={{marginLeft:'-20%'}} */
                  >
                     <Input.Password />
                  </Form.Item>

                  <Form.Item
                     name='remember'
                     valuePropName='checked'
                     wrapperCol={{
                        offset: 8,
                        span: 16,
                     }}
                  >
                     <Checkbox>아이디 저장</Checkbox>
                  </Form.Item>

                  <Form.Item
                     wrapperCol={{
                        offset: 8,
                        span: 16,
                     }}
                  >
                     <Button type='primary' htmlType='submit'>
                        로그인
                     </Button>
                  </Form.Item>
               </Form>
            </div>
         </StyledModal>
      </>
   )
}

export default LoginModal
