import { AiOutlineCheck } from "react-icons/ai"; 
import React, { useRef, useState } from 'react';

const SignUpForm = () => {
   const idInputRef = useRef(null);
   const pwInputRef = useRef(null);
   const pw2InputRef = useRef(null);
   const nameInputRef = useRef(null);
   const phoneInputRef = useRef(null);

   const [ id, setId ] = useState('');
   const [ pw, setPw ] = useState('');
   const [ pw2, setPw2 ] = useState('');
   const [ name, setName ] = useState('');
   const [ phone, setPhone  ] = useState('');
   const [ email, setEmail  ] = useState('');
   const [ birth, setbirth  ] = useState('');

   const idRule = /^[a-z0-9]{4,16}$/;
   const pwRule = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^])[a-zA-Z\d!@#$%^]{8,16}$/;
   const nameRule = /^[A-Za-z가-힣]{1,20}$/;
   /* const phoneRule1 = /^\d{3,4}$/;
   const phoneRule2 = /^\d{4}$/; */
   const phoneRule = /^\d{8}$/;
   const emailRule = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
   const birthRule = /^(19[0-9][0-9]|20\d{2})(0[0-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])$/;

   const [ idMessage, setIdMessage ] = useState('');
   const [ pwMessage, setPwMessage ] = useState('');
   const [ pw2Message, setPw2Message ] = useState('');
   const [ nameMessage, setNameMessage ] = useState('');
   const [ phoneMessage, setphoneMessage ] = useState('');
   const [ emailMessage, setEmailMessage ] = useState('');
   const [ birthMessage, setbirthMessage  ] = useState('');

   const handleId = (event) => {
      const newValue = event.target.value;
      setId(newValue);
      if (idRule.test(newValue)) {
        setIdMessage('사용 가능한 아이디입니다.');
      } else if (newValue === "") {
         setIdMessage('아이디를 입력해주세요.');
      } else {
        setIdMessage('아이디는 영문소문자/숫자 4글자 이상 가능합니다.');
        setId('');
      }
   };

   const handlePw = (event) => {
      const newPwValue = event.target.value;
      setPw(newPwValue);
      if (pwRule.test(newPwValue)) {
         setPwMessage('사용 가능한 비밀번호입니다.');
      } else if( newPwValue === "" ){
        setPwMessage('비밀번호를 입력해주세요.');
      } else {
         setPwMessage('영문대소문자/숫자/특수문자 조합, 8 ~ 16자로 만들어주세요');
         setPw('');
      }
   };

   const handlePw2 = (event) => {
      const newPw2Value = event.target.value;
      setPw2(newPw2Value);
   
      if (pw === "") { // 비밀번호 입력 값이 비어있는 경우
         setPw2Message('비밀번호를 입력해주세요.');
         pwInputRef.current.focus();
         setPw2("");
      } else if (newPw2Value === pw) { // 비밀번호와 일치하는 경우
         setPw2Message('비밀번호가 일치합니다.');
      } else if (newPw2Value === '') { // 비밀번호 확인 값이 비어있는 경우
         setPw2Message('비밀번호를 다시 입력해주세요.');
         setPw2('');
      } else {
         setPw2Message('비밀번호가 일치하지 않습니다.');
         setPw2('');
      }
   };

   const handleName = (event) => {
      const newNameValue = event.target.value;
      setId(newNameValue);
      if (nameRule.test(newNameValue)) {
         setNameMessage('사용 가능한 이름입니다.');
      } else if (newNameValue === "") {
         setNameMessage('이름을 입력해주세요.');
         setName('');
      } else {
         setNameMessage('이름을 다시한번 확인해주세요.');
         setName('');
      }
   };

   const handlePhone = (event) => {
      const newPhoneValue = event.target.value;
      setId(newPhoneValue);
      if (phoneRule.test(newPhoneValue)) {
         setNameMessage('사용 가능한 전화번호입니다.');
      } else if (newPhoneValue === "") {
         setNameMessage('전화번호를 입력해주세요.');
         setPhone('');
      } else {
         setNameMessage('전화번호를 다시한번 확인해주세요.');
         setPhone('');
      }
   };


   return (
      <div>
         <fieldset className='signUpArea'>
            <form action="#" method='post' name='signUp'>
               <ul>
                  <li className='id-section'>
                     <div className='area-style'>
                        <label htmlFor="idArea">아이디</label>

                        <input type="text" name="idArea" 

                        id="idArea" className='input-style' required size={20} value={id} onBlur={handleId} onChange={(event)=>{setId(event.target.value)}} ref={idInputRef}/>
                        <button className="btn-style">중복확인</button>
                        <span className="Mes-style">{idMessage}</span>
                        <p className="help-style"><AiOutlineCheck /> 영문소문자/숫자, 4-16자</p>
                     </div>
                  </li>
                  <li className='pw-section'>
                     <div className='area-style'>
                        <label htmlFor="pwArea">비밀번호</label>

                        <input type="password" name="pwArea" 

                        id="pwArea" className='input-style' required size={20} value={pw} onBlur={handlePw} onChange={(event)=>{setPw(event.target.value)}} ref={pwInputRef}/>
                        <span className="Mes-style">{pwMessage}</span>
                        <p className="help-style"><AiOutlineCheck /> 영문대소문자/숫자/특수문자 조합, 8 ~ 16자</p>

                        <br />

                        <label htmlFor="pw2Area">비밀번호 확인</label>
                        <input type="password" name="pw2Area" 
                        id="pw2Area" className='input-style' required size={20} value={pw2} onBlur={handlePw2} onChange={(event)=>{setPw2(event.target.value)}} ref={pw2InputRef}/>
                        <span className="Mes-style">{pw2Message}</span>
                     </div>
                  </li>
                  <li className='name-section'>
                     <div className='area-style'>
                        <label for="nameArea" className="label-style">이름</label>
                        
                        <input type="text" name="nameArea" 

                        id="nameArea" className="input-style" required size="20" value={name} onBlur={handleName} onChange={(event)=>{setName(event.target.value)}} ref={nameInputRef}/>
                        <span className="Mes-style">{nameMessage}</span>
                     </div>
                  </li>
                  <li className='phone-section'>
                     <div className='area-style'>
                        <label for="phoneArea" class="label-style">휴대전화</label>
                        <select name="phoneNumber" id="phoneNumber" class="select-style">
                              <option value="010">010</option>
                              <option value="011">011</option>
                              <option value="016">016</option>
                              <option value="017">017</option>
                              <option value="018">018</option>
                              <option value="019">019</option>
                        </select>

                        <input type="text" name="phoneArea" 

                        id="phoneArea" class="input-style2" required size="20" onBlur={handlePhone} onChange={(event)=>{setPhone(event.target.value)}} ref={phoneInputRef}></input>
                        <span class="Mes-style">{phoneMessage}</span>
                     </div>
                  </li>
                  <li className='email-section'>
                     <div className='area-style'>

                     </div>
                  </li>
                  <li className='birth-section'>
                     <div className='area-style'>

                     </div>
                  </li>
                  <li className='gender-section'>
                     <div className='area-style'>

                     </div>
                  </li>
                  <br />
                  <hr />
                  <br />
                  <li className='terms-section'>
                     <div className='area-style'>

                     </div>
                  </li>
                  <li className='submit-section'>
                     <div className='area-style'>

                     </div>
                  </li>

               </ul>
            </form>   
         </fieldset>      
      </div>
   );
};

export default SignUpForm;