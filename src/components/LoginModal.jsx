import React, {useState} from "react"
import { Button, Checkbox, Form, Input, Modal } from "antd"
import styled from "styled-components"
import { API_URL } from "../config/constants";
import axios from "axios";
import { useAccessToken } from './AccessTokenContext';

const LoginModal = ({ isOpen, onClose }) => {
   //const { setAccessToken } = useAccessToken();
   const [loading, setLoading] = useState(false); // 로딩 상태를 관리하는 예시 상태
 
   const onFinish = async (values) => {
     setLoading(true); // 로딩 시작
     try {
      // 로그인 시도 
      axios
      .post(`${API_URL}/users/login`, {
         user_id: values.user_id,
         pw: values.password,
        })
        .then((result) => {
          console.log(result);
          if(result.data.user == values.user_id){
            alert("로그인이 성공했습니다.");
            const accessToken = result.data.accessToken;
            console.log("login"+accessToken);
            axios.defaults.headers.common['Authorization'] = 'Bearer '+accessToken;
            localStorage.setItem('accessToken', accessToken);
            onClose(); // 모달 닫기
          } else {
            alert("로그인 정보를 다시 확인해주세요.");
          }
        })
        .catch((err) => {
          console.error(err);
        });
      }  catch (error) {
         console.error(error);
       } finally {
         setLoading(false); // 로딩 종료
       }
      
      /*
     try {
       // axios로 로그인 요청을 보냅니다.
       const response = await axios({
         method: 'get',
         url: `${API_URL}/users/` + values.user_id,
         withCredentials: true, // credential 옵션을 true로 설정
       });
 
       const user_info = response.data.user;
       if (!user_info) {
         alert("로그인 못해 ㅡㅅㅡ");
       } else if (values.user_id === user_info.user_id && values.password === user_info.pw) {
         alert("로그인하자!");
         const accessToken = response.data.accessToken;
         axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
         console.log(accessToken);
         //// AccessToken을 Context에 저장
         //setAccessToken(accessToken);
         localStorage.setItem('accessToken', accessToken);
         onClose(); // 모달 닫기
       } else {
         alert("로그인 못해 ㅡㅅㅡ!");
       }
     } catch (error) {
       console.error(error);
     } finally {
       setLoading(false); // 로딩 종료
     }*/
   };
 
   const onFinishFailed = (errorInfo) => {
     console.log("Failed:", errorInfo);
   };
 
   const handleCancel = () => {
     onClose(); // 모달 닫기
   };
   const handleOk = () => {
      onClose(); // 모달 닫기
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
                     name='user_id'
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
