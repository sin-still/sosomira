import { AiOutlineCheck } from "react-icons/ai"; 
import React, { useEffect, useRef, useState } from 'react';
import { API_URL } from "../config/constants";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUpForm = () => {
   
   const idInputRef = useRef(null);
   const pwInputRef = useRef(null);
   const pw2InputRef = useRef(null);
   const nameInputRef = useRef(null);
   const phoneInputRef = useRef(null);
   const emailInputRef = useRef(null);
   const birthInputRef = useRef(null);

   const [ id, setId ] = useState('');
   const [ pw, setPw ] = useState('');
   const [ pw2, setPw2 ] = useState('');
   const [ name, setName ] = useState('');
   const [ phone, setPhone  ] = useState('');
   const [ email, setEmail  ] = useState('');
   const [ birth, setBirth  ] = useState('');

   const idRule = /^[a-z0-9]{4,16}$/;
   const pwRule = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^])[a-zA-Z\d!@#$%^]{8,16}$/;
   const nameRule = /^[A-Za-z가-힣]{1,20}$/;
   /* const phoneRule1 = /^\d{3,4}$/;
   const phoneRule2 = /^\d{4}$/; */
   const phoneRule = /^\d{8}$/;
   const emailRule = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
   const birthRule = /^(19[0-9][0-9]|20\d{2})(0[0-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])$/;

/* 1. 회원가입 만들기 BE */
   const [ messages, setMessages ] = useState({
      id: { text: '', color: '' },
      pw: { text: '', color: '' },
      pw2: { text: '', color: '' },
      name: { text: '', color: '' },
      phone: { text: '', color: '' },
      email: { text: '', color: '' },
      birth: { text: '', color: '' }
   });

   const [allChecked, setAllChecked] = useState(false);
   const [termsChecked, setTermsChecked] = useState(false);
   const [privacyChecked, setPrivacyChecked] = useState(false);
   const [marketingChecked, setMarketingChecked] = useState(false);
   const [isSubmitted, setIsSubmitted] = useState(false); // 회원가입 제출 여부
   const [isRegistered, setIsRegistered] = useState(false); // 회원가입 완료 여부
   const history = useNavigate();

   const handleSubmit = (event) => {
      event.preventDefault();
      // 모든 조건 검사
      if (
         idRule.test(id) &&
         pwRule.test(pw) &&
         pw2 === pw &&
         nameRule.test(name) &&
         phoneRule.test(phone) &&
         emailRule.test(email) &&
         birthRule.test(birth) &&
         termsChecked &&
         privacyChecked &&
         marketingChecked
      ) {         
         // 모든 조건을 통과한 경우
         try {
            // db 에 회원가입 정보를 넣어본다.
            axios
            .post(`${API_URL}/users`, {
               user_id: id,
               pw: pw,
               name: name,
               phone: phone,
               email: email,
               birth: birth,
               marketingChecked: marketingChecked ? "True" : "False"
              })
              .then((result) => {
                console.log(result);
                history("/", { replace: true });
              })
              .catch((err) => {
                console.error(err);
              });
            setIsRegistered(true);
            setIsSubmitted(true);
         } catch (error) {
            // db에 회원가입 정보 넣기 실패
            console.log(error);
            setIsRegistered(false);
            setIsSubmitted(true);
         }
      } else {
         // 조건을 만족하지 않은 경우
         setIsRegistered(false);
         setIsSubmitted(true);
      }
   };

   useEffect(() => {
      if (isSubmitted) {
         if(isRegistered){
            // 회원 가입이 완료되었다는 얼럿 창 표시
            alert('회원 가입이 완료되었습니다.');
         } else {
            // 회원 가입 실패
            alert('회원가입에 실패했습니다.');
         }
      }
   }, [isSubmitted, isRegistered]);

   const handleAllCheck = () => {
      setAllChecked(!allChecked);
      setTermsChecked(!allChecked);
      setPrivacyChecked(!allChecked);
      setMarketingChecked(!allChecked);
    };

   useEffect(() => {
      if (termsChecked && privacyChecked && marketingChecked) {
        setAllChecked(true);
      } else {
        setAllChecked(false);
      }
    }, [termsChecked, privacyChecked, marketingChecked]);

   const handleMessageChange = (key, text, color) => {
      setMessages((prevMessages) => ({
         ...prevMessages,
         [key]: { text, color }
      }));
   };

   const handleId = (event) => {
      const newValue = event.target.value;
      setId(newValue);
      if (idRule.test(newValue)) {
         handleMessageChange('id', '사용 가능한 아이디입니다.', 'success-color');
      } else if (newValue === "") {
         handleMessageChange('id', '아이디를 입력해주세요.', 'error-color');
      } else {
         handleMessageChange('id', '아이디는 영문소문자/숫자 4글자 이상 가능합니다.', 'error-color');
        
        setId('');
      }
   };

   const handlePw = (event) => {
      const newPwValue = event.target.value;
      setPw(newPwValue);
      if (pwRule.test(newPwValue)) {
         handleMessageChange('pw', '사용 가능한 비밀번호입니다.', 'success-color');
      } else if( newPwValue === "" ){
        handleMessageChange('pw', '비밀번호를 입력해주세요.', 'error-color');
      } else {
         handleMessageChange('pw', '영문대소문자/숫자/특수문자 조합, 8 ~ 16자로 만들어주세요', 'error-color');
         setPw('');
      }
   };

   const handlePw2 = (event) => {
      const newPw2Value = event.target.value;
      setPw2(newPw2Value);
   
      if (pw === "") { // 비밀번호 입력 값이 비어있는 경우
         handleMessageChange('pw', '비밀번호를 입력해주세요.', 'error-color');
         pwInputRef.current.focus();
         setPw2("");
      } else if (newPw2Value === pw) { // 비밀번호와 일치하는 경우
         handleMessageChange('pw2', '비밀번호가 일치합니다.', 'success-color');
      } else if (newPw2Value === '') { // 비밀번호 확인 값이 비어있는 경우
         handleMessageChange('pw2', '비밀번호를 다시 입력해주세요.', 'error-color');
         setPw2('');
      } else {
         handleMessageChange('pw2', '비밀번호가 일치하지 않습니다.', 'error-color');
         setPw2('');
      }
   };

   const handleName = (event) => {
      const newNameValue = event.target.value;
      setName(newNameValue);
      if (nameRule.test(newNameValue)) {
         handleMessageChange('name', '사용 가능한 이름입니다.', 'success-color');
      } else if (newNameValue === "") {
         handleMessageChange('name', '이름을 입력해주세요.', 'error-color');
         setName('');
      } else {
         handleMessageChange('name', '이름을 다시한번 확인해주세요.', 'error-color');
         setName('');
      }
   };

   const handlePhone = (event) => {
      const newPhoneValue = event.target.value;
      setPhone(newPhoneValue);
      if (phoneRule.test(newPhoneValue)) {
         handleMessageChange('phone', '사용 가능한 전화번호입니다.', 'success-color');
      } else if (newPhoneValue === "") {
         handleMessageChange('phone', '전화번호를 입력해주세요.', 'error-color');
         setPhone('');
      } else {
         handleMessageChange('phone', '전화번호를 다시한번 확인해주세요.', 'error-color');
         setPhone('');
      }
   };

   const handleEmail = (event) => {
      const newEmailValue = event.target.value;
      setEmail(newEmailValue);
      if (emailRule.test(newEmailValue)) {
         handleMessageChange('email', '사용 가능한 이메일입니다.', 'success-color');

      } else if (newEmailValue === "") {
         handleMessageChange('email', '이메일을 입력해주세요.', 'error-color');
         setEmail('');
      } else {
         handleMessageChange('email', '이메일을 다시한번 확인해주세요.', 'error-color');
         setEmail('');
      }
   };

   const handleBirth = (event) => {
      const newBirthValue = event.target.value;
      setBirth(newBirthValue);
      if (birthRule.test(newBirthValue)) {
         handleMessageChange('birth', '올바른 생년월일입니다.', 'success-color');
      } else if (newBirthValue === "") {
         handleMessageChange('birth', '생년월일을 입력해주세요.', 'error-color');
         setBirth('');
      } else {
         handleMessageChange('birth', '생년월일을 다시한번 확인해주세요.', 'error-color');
         setBirth('');
      }
   };


   return (
      <div className="signWrap">
         <fieldset className='signUpArea'>
            <form action="#" method='post' name='signUp' onSubmit={handleSubmit}>
               <ul>
                  <li className='id-section'>
                     <div className='area-style'>
                        <label htmlFor="idArea" className="label-style">아이디</label>

                        <input type="text" name="idArea" 

                        id="idArea" className='input-style' required size={20} value={id} onBlur={handleId} onChange={(event)=>{setId(event.target.value)}} ref={idInputRef}/>
                        <button className="btn-style">중복확인</button>
                        <span className={`Mes-style ${messages.id.color}`}>{messages.id.text}</span>
                        <p className="help-style"><AiOutlineCheck /> 영문소문자/숫자, 4-16자</p>
                     </div>
                  </li>
                  <li className='pw-section'>
                     <div className='area-style'>
                        <label htmlFor="pwArea" className="label-style">비밀번호</label>

                        <input type="password" name="pwArea" 

                        id="pwArea" className='input-style' required size={20} value={pw} onBlur={handlePw} onChange={(event)=>{setPw(event.target.value)}} ref={pwInputRef}/>
                        <span className={`Mes-style ${messages.pw.color}`}>{messages.pw.text}</span>
                        <p className="help-style"><AiOutlineCheck /> 영문대소문자/숫자/특수문자 조합, 8 ~ 16자</p>

                        <br />

                        <label htmlFor="pw2Area" className="label-style">비밀번호 확인</label>
                        <input type="password" name="pw2Area" 
                        id="pw2Area" className='input-style' required size={20} value={pw2} onBlur={handlePw2} onChange={(event)=>{setPw2(event.target.value)}} ref={pw2InputRef}/>
                        <span className={`Mes-style ${messages.pw2.color}`}>{messages.pw2.text}</span>
                     </div>
                  </li>
                  <li className='name-section'>
                     <div className='area-style'>
                        <label htmlFor="nameArea" className="label-style">이름</label>
                        
                        <input type="text" name="nameArea" 

                        id="nameArea" className="input-style" required size="20" value={name} onBlur={handleName} onChange={(event)=>{setName(event.target.value)}} ref={nameInputRef}/>
                        <span className={`Mes-style ${messages.name.color}`}>{messages.name.text}</span>
                     </div>
                  </li>
                  <li className='phone-section'>
                     <div className='area-style'>
                        <label htmlFor="phoneArea" className="label-style">휴대전화</label>
                        <div className="flexBox">
                           <select name="phoneNumber" id="phoneNumber" className="select-style">
                                 <option value="010">010</option>
                                 <option value="011">011</option>
                                 <option value="016">016</option>
                                 <option value="017">017</option>
                                 <option value="018">018</option>
                                 <option value="019">019</option>
                           </select>
                           <span>&nbsp;-&nbsp;</span>
                           <input type="text" name="phoneArea" 
   
                           id="phoneArea" className="input-style2" required size="20" value={phone} onBlur={handlePhone} onChange={(event)=>{setPhone(event.target.value)}} ref={phoneInputRef}></input>
                        </div>
                        <span className={`Mes-style ${messages.phone.color}`}>{messages.phone.text}</span>
                     </div>
                  </li>
                  <li className='email-section'>
                     <div className='area-style'>
                        <label htmlFor="emailArea" className="label-style">E-mail</label>
                        <input type="text" name="emailArea" 
                        id="emailArea" className="input-style" required size="30" value={email} onBlur={handleEmail} onChange={(event)=>{setEmail(event.target.value)}} ref={emailInputRef}/>
                        <span className={`Mes-style ${messages.email.color}`}>{messages.email.text}</span>

                     </div>
                  </li>
                  <li className='birth-section'>
                     <div className='area-style'>
                        <label htmlFor="birthArea" className="label-style">생년월일</label>
                        <input type="text" name="birthArea" 
                        id="birthArea" className="input-style" required size="8" value={birth} onBlur={handleBirth} onChange={(event)=>{setBirth(event.target.value)}} ref={birthInputRef}/>
                        <span className={`Mes-style ${messages.birth.color}`}>{messages.birth.text}</span>
                        <p className="help-style"><AiOutlineCheck /> - 를 제외한 8글자 ex) 19990514</p>
                     </div>
                  </li>
                  {/* <li className='gender-section'>
                     <div className='area-style'>

                     </div>
                  </li> */}
                  <br />
                  <hr />
                  <br />
                  <li id="terms-section">
                     <input type="checkbox" id="allCheck" className="check-style" checked={allChecked} onChange={handleAllCheck}/>
                     <label htmlFor="allCheck">이용약관 및 개인정보수집 및 이용, 쇼핑정보 수신(선택)에 모두 동의합니다.</label> 
                     <br/>
                     <h3>[필수] 이용약관 동의</h3>
                     <div className="termsBox">
                        ■ 수집하는 개인정보 항목
                        <br/>
                        회사는 회원가입, 상담, 서비스 신청 등등을 위해 아래와 같은 개인정보를 수집하고 있습니다.
                        <p>
                              ο 수집항목 : 이름 , 생년월일 , 성별 , 로그인ID , 비밀번호 , 비밀번호 질문과 답변 , 자택 전화번호 , 자택 주소 , 휴대전화번호 , 이메일 , 직업 , 회사명 , 부서 , 직책 , 회사전화번호 , 취미 , 결혼여부 , 기념일 , 법정대리인정보 , 서비스 이용기록 , 접속 로그 , 접속 IP 정보 , 결제기록
                              <br/>
                              ο 개인정보 수집방법 : 홈페이지(회원가입) , 서면양식
                        </p>
                        <p>
                              ■ 개인정보의 수집 및 이용목적
                        </p>
                        <p>
                              회사는 수집한 개인정보를 다음의 목적을 위해 활용합니다.
                        </p>
                        <p>
                              ο 서비스 제공에 관한 계약 이행 및 서비스 제공에 따른 요금정산 콘텐츠 제공 , 구매 및 요금 결제 , 물품배송 또는 청구지 등 발송
                              <br/>
                              ο 회원 관리
                              <br/>
                              회원제 서비스 이용에 따른 본인확인 , 개인 식별 , 연령확인 , 만14세 미만 아동 개인정보 수집 시 법정 대리인 동의여부 확인 , 고지사항 전달 ο 마케팅 및 광고에 활용
                              <br/>
                              접속 빈도 파악 또는 회원의 서비스 이용에 대한 통계
                        </p>
                        <p>
                              ■ 개인정보의 보유 및 이용기간
                        </p>
                        <p>
                              회사는 개인정보 수집 및 이용목적이 달성된 후에는 예외 없이 해당 정보를 지체 없이 파기합니다.</p>
                     </div>
                     <p>
                        <span>이용약관에 동의하십니까? </span>
                        <input type="checkbox" id="terms-check1" className="check-style"  checked={termsChecked} onChange={() => setTermsChecked(!termsChecked)}/>
                        <label htmlFor="terms-check1"> 동의함</label>
                     </p>
                     <h3>[필수] 개인정보 수집 및 이용 동의</h3>
                     <div className="termsBox">
                        ■ 수집하는 개인정보 항목
                        <br/>
                        회사는 회원가입, 상담, 서비스 신청 등등을 위해 아래와 같은 개인정보를 수집하고 있습니다.
                        <p>
                              ο 수집항목 : 이름 , 생년월일 , 성별 , 로그인ID , 비밀번호 , 비밀번호 질문과 답변 , 자택 전화번호 , 자택 주소 , 휴대전화번호 , 이메일 , 직업 , 회사명 , 부서 , 직책 , 회사전화번호 , 취미 , 결혼여부 , 기념일 , 법정대리인정보 , 서비스 이용기록 , 접속 로그 , 접속 IP 정보 , 결제기록
                              <br/>
                              ο 개인정보 수집방법 : 홈페이지(회원가입) , 서면양식
                        </p>
                        <p>
                              ■ 개인정보의 수집 및 이용목적
                        </p>
                        <p>
                              회사는 수집한 개인정보를 다음의 목적을 위해 활용합니다.
                        </p>
                        <p>
                              ο 서비스 제공에 관한 계약 이행 및 서비스 제공에 따른 요금정산 콘텐츠 제공 , 구매 및 요금 결제 , 물품배송 또는 청구지 등 발송
                              <br/>
                              ο 회원 관리
                              <br/>
                              회원제 서비스 이용에 따른 본인확인 , 개인 식별 , 연령확인 , 만14세 미만 아동 개인정보 수집 시 법정 대리인 동의여부 확인 , 고지사항 전달 ο 마케팅 및 광고에 활용
                              <br/>
                              접속 빈도 파악 또는 회원의 서비스 이용에 대한 통계
                        </p>
                        <p>
                              ■ 개인정보의 보유 및 이용기간
                        </p>
                        <p>
                              회사는 개인정보 수집 및 이용목적이 달성된 후에는 예외 없이 해당 정보를 지체 없이 파기합니다.</p>
                     </div>
                     <p>
                        <span>개인정보 수집 및 이용에 동의하십니까? </span>
                        <label htmlFor="terms-check2"> 동의함</label>
                        <input type="checkbox" id="terms-check2" className="check-style" checked={privacyChecked} onChange={() => setPrivacyChecked(!privacyChecked)}/>
                     </p>
                     <h3>[필수] 쇼핑정보 수신 동의</h3>
                     <div className="termsBox">
                        ■ 수집하는 개인정보 항목
                        <br/>
                        회사는 회원가입, 상담, 서비스 신청 등등을 위해 아래와 같은 개인정보를 수집하고 있습니다.
                        <p>
                              ο 수집항목 : 이름 , 생년월일 , 성별 , 로그인ID , 비밀번호 , 비밀번호 질문과 답변 , 자택 전화번호 , 자택 주소 , 휴대전화번호 , 이메일 , 직업 , 회사명 , 부서 , 직책 , 회사전화번호 , 취미 , 결혼여부 , 기념일 , 법정대리인정보 , 서비스 이용기록 , 접속 로그 , 접속 IP 정보 , 결제기록
                              <br/>
                              ο 개인정보 수집방법 : 홈페이지(회원가입) , 서면양식
                        </p>
                        <p>
                              ■ 개인정보의 수집 및 이용목적
                        </p>
                        <p>
                              회사는 수집한 개인정보를 다음의 목적을 위해 활용합니다.
                        </p>
                        <p>
                              ο 서비스 제공에 관한 계약 이행 및 서비스 제공에 따른 요금정산 콘텐츠 제공 , 구매 및 요금 결제 , 물품배송 또는 청구지 등 발송
                              <br/>
                              ο 회원 관리
                              <br/>
                              회원제 서비스 이용에 따른 본인확인 , 개인 식별 , 연령확인 , 만14세 미만 아동 개인정보 수집 시 법정 대리인 동의여부 확인 , 고지사항 전달 ο 마케팅 및 광고에 활용
                              <br/>
                              접속 빈도 파악 또는 회원의 서비스 이용에 대한 통계
                        </p>
                        <p>
                              ■ 개인정보의 보유 및 이용기간
                        </p>
                        <p>
                              회사는 개인정보 수집 및 이용목적이 달성된 후에는 예외 없이 해당 정보를 지체 없이 파기합니다.</p>
                     </div>
                     <p>
                        <span>SMS 수신을 동의하십니까? </span>
                        <input type="checkbox" id="terms-check3" className="check-style"checked={marketingChecked} onChange={() => setMarketingChecked(!marketingChecked)}/>
                        <label htmlFor="terms-check3"> 동의함</label>
                     </p>
                  </li>
                  <li className='submit-section'>
                     <button type="submit" className="submit-style">회원가입</button>
                  </li>
               </ul>
            </form>   
         </fieldset>      
      </div>
   );
};

export default SignUpForm;