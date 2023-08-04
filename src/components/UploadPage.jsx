import { AiFillCamera } from "react-icons/ai";
import React, { useState } from "react";
import { Button, InputNumber, Divider, Form, Input, Upload, message } from "antd";
import "./UploadPage.scss";
import { API_URL } from "../config/constants";
import axios from "axios";
import { useNavigate } from "react-router-dom";



const { TextArea } = Input;
const UploadPage = () => {
  
  const [ imageUrl, setImageUrl ] = useState(null)
  const history = useNavigate();

  const onSubmit = (values) => {
    console.log("Success:", values);
    axios.post(`${ API_URL }/products`,{
      name: values.name,
      description:values.description,
      seller: values.seller,
      price: parseInt(values.price), 
      // parseInt: 정수로 가져오게끔 하는 것. 
      imageUrl: imageUrl
    }).then(( result )=>{
      console.log(result);
      history('/', {replace:true});
    }).catch(( err )=>{
      console.error(err);
      message.error(`에러가 발생했습니다.${err.message}`)
    })
  };

  const onChangeImage = (info) => {
    if(info.file.status === 'uploading'){
      return
    }
    if(info.file.status === 'done'){
      const response = info.file.response;
      const imageUrl = response.imageUrl;
      setImageUrl(imageUrl)
    }
  }

  return (
    <div id="upload-container">
      <Form name="uploadForm" onFinish={onSubmit} initialValues={{ name: '', price: 0, seller: '', description: '' }}>
        <Form.Item name="upload">
          <Upload 
          name="image" 
          action={`${ API_URL}/image`} 
          listType="picture" 
          showUploadList={false} 
          onChange={onChangeImage}>
            {
              imageUrl ? (<img id="upload-img" src={`${ API_URL }/${imageUrl}`} alt="img" />):(
              <div id="upload-img-placeholder">
                <AiFillCamera className="icon-carmera" />
                <span>이미지를 업로드해주세요</span>
              </div>)
            }
            
          </Upload>
        </Form.Item>
        <Divider />
        <Form.Item
          label={<span className="upload-label">상품명</span>}
          name="name"
          rules={[
            { required: true, message: "상품명은 필수 입력 사항입니다." },
          ]}
        >
          <Input
            className="upload-name"
            placeholder="상품명을 입력해주세요"
            size="large"
          />
        </Form.Item>
        <Divider></Divider>

        <Form.Item
          label={<span className="upload-label">판매자명</span>}
          name="seller"
          rules={[
            { required: true, message: "판매자명은 필수 입력 사항입니다." },
          ]}
        >
          <Input
            className="upload-seller"
            placeholder="판매자명을 입력해주세요"
            size="large"
          />
        </Form.Item>

        <Form.Item
          label={<span className="upload-price">판매가</span>}
          name="price"
          rules={[
            { required: true, message: "판매가는 필수 입력 사항입니다." },
          ]}
          initialValue={0}
        >
          <InputNumber
            className="upload-price"
            size="large"
            min={0}
            defaultValue={0}
          />
        </Form.Item>
        <Divider></Divider>
        <Form.Item
          label={<span className="upload-label">상품설명</span>}
          name="description"
          rules={[
            { required: true, message: "상품설명은 필수 입력 사항입니다." },
          ]}
        >
          <TextArea
            size="large"
            id="product-description"
            showCount
            maxLength={300}
            placeholder="상품설명을 작성해주세요"
          ></TextArea>
        </Form.Item>
        <Form.Item>
          {/* {contextHolder} */}
          <Button id="submit-button" htmlType="submit" /* onClick={info} */>
            상품등록하기
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UploadPage;
