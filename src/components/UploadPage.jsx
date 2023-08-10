import { AiFillCamera } from "react-icons/ai";
import React, { useState } from "react";
import { Button, InputNumber, Divider, Form, Input, Upload, message, Modal, Cascader } from "antd";
import "./UploadPage.scss";
import { API_URL } from "../config/constants";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const { TextArea } = Input;
const passwords = process.env.REACT_APP_PASSWORDKEY

const UploadPage = () => {
  const treeData = [
    {
      label: '인테리어',
      value: 'C01',
      children: [
        {
          label: '테이블/쇼파',
          value: 'C0101',
        },
        {
          label: '장식품',
          value: 'C0102',
        },
      ],
    },
    {
      label: '주방용품',
      value: 'C02',
      children: [
        {
          label: '티세트',
          value: 'C0201',
        },
        {
          label: '그릇/접시',
          value: 'C0202',
        },
      ],
    },
    {
      label: '사무용품',
      value: 'C03',
      children: [
        {
          label: '필기류',
          value: 'C0301',
        },
        {
          label: '팬시용품',
          value: 'C0202',
        },
      ],
    },
    {
      label: '페브릭/생활',
      value: 'C04',
      children: [
        {
          label: '페브릭',
          value: 'C0401',
        },
        {
          label: '생활',
          value: 'C0402',
        },
      ],
    },
    
  ];
  const [imageUrl, setImageUrl] = useState(null);
  const [isPasswordPopupVisible, setIsPasswordPopupVisible] = useState(false);
  const [password, setPassword] = useState("");
  const history = useNavigate();

  const onSubmit = (values) => {
    // 비밀번호 팝업을 띄웁니다.
    setIsPasswordPopupVisible(true);
  };

  const onChangeImage = (info) => {
    if (info.file.status === "uploading") {
      return;
    }
    if (info.file.status === "done") {
      const response = info.file.response;
      const imageUrl = response.imageUrl;
      setImageUrl(imageUrl);
    }
  };

  
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handlePasswordSubmit = () => {
    // 비밀번호 검증을 여기에서 수행합니다.
    const formValues = form.getFieldsValue(); // 현재 폼 필드의 값 가져오기
    console.log("formValues.category:", formValues.category);
    // 비밀번호가 올바르다면 상품 등록을 수행합니다.
    if (password === process.env.REACT_APP_PASSWORD) {
      setIsPasswordPopupVisible(false); // 비밀번호가 올바른 경우, 팝업 닫기
      axios
      .post(`${API_URL}/products`, {
        name: formValues.name,
        description: formValues.description,
          seller: formValues.seller,
          price: parseInt(formValues.price),
          imageUrl: imageUrl,
          category: formValues['category'][0]
        })
        .then((result) => {
          console.log(result);
          history("/", { replace: true });
        })
        .catch((err) => {
          console.error(err);
          message.error(`에러가 발생했습니다.${err.message}`);
        });
    } else {
      message.error("비밀번호가 올바르지 않습니다.");
    }
  };
  const [form] = Form.useForm();
  const formValues = form.getFieldsValue();
  
  
  return (
    <div id="upload-container">
      <Form form={form} name="uploadForm" onFinish={onSubmit} initialValues={{
    name: "",
    price: 0,
    seller: "",
    description: "",
    category: [], // 초기값 설정
  }}>
        <Form.Item name="upload">
          <Upload
            name="image"
            action={`${API_URL}/image`}
            listType="picture"
            showUploadList={false}
            onChange={onChangeImage}
            >
            {imageUrl ? (
              <img id="upload-img" src={`${API_URL}/${imageUrl}`} alt="img" />
              ) : (
              <div id="upload-img-placeholder">
                <AiFillCamera className="icon-carmera" />
                <span>이미지를 업로드해주세요</span>
              </div>
            )}
          </Upload>
        </Form.Item>
        <Divider />
        <Form.Item
          label={<span className="upload-label">상품명</span>}
          name="name"
          rules={[{ required: true, message: "상품명은 필수 입력 사항입니다." }]}
        >
          <Input className="upload-name" placeholder="상품명을 입력해주세요" size="large" />
        </Form.Item>
        <Form.Item
          label="상품분류"
          name="category"
          rules={[
            { required: true, message: "상품분류는 필수 입력 사항입니다." },
          ]}
        >
          <Cascader
            options={treeData}
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
          <Button id="submit-button" onClick={onSubmit}>
            상품등록하기
          </Button>
        </Form.Item>
      </Form>

      {/* Password Popup */}
      <Modal title="비밀번호 입력" visible={isPasswordPopupVisible} onOk={handlePasswordSubmit} onCancel={() => setIsPasswordPopupVisible(false)}>
        <Input type="password" value={password} onChange={handlePasswordChange} placeholder="비밀번호를 입력해주세요" />
      </Modal>
    </div>
  );
};

export default UploadPage;
