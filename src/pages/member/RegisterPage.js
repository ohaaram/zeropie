import React, { useState } from 'react';
import MemberLayout from '../../layout/MemberLayout';
import axios from 'axios';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import { useNavigate } from 'react-router-dom';
import Dropzone from 'react-dropzone';


const RegisterPage = () => {


    const [preview, setPreview] = useState(null);

    const profileHandler = (files) => {
        const file = files[0];
    
        //선택한 프로필 사진보기
        const filePreview = URL.createObjectURL(file);
        setPreview(filePreview);
        console.log("filePreview 찍어보기 : "+filePreview);

        // stfImg에 URL 저장
        setStf({ ...stf, stfImg: filePreview });
        console.log("stfImg 찍어보기 : ", stf.stfImg);
    }

    const navigate = useNavigate();

    const [stf, setStf] = useState({
        stfName: "",
        stfPass: "",
        stfPh: "",
        stfZip: "",
        stfAddr1: "",
        stfAddr2: "",
        stfEmail: "",
        stfEnt: "",
        stfImg: "",
        dptNo: "",
        rnkNo: "",
    });
    const openDaumPostcode = useDaumPostcodePopup();

    const [passwordMessage, setPasswordMessage] = useState(""); 
    const [emailMessage, setEmailMessage] = useState(""); 
    const [phoneMessage, setPhoneMessage] = useState(""); 

    const handlePostcode = () => {
        openDaumPostcode({
            onComplete: (data) => {
                setStf({ ...stf, stfZip: data.zonecode, stfAddr1: data.address });
            }
        });
    };

    const submitHandler = (e) => {
        e.preventDefault();

        axios
            .post("http://localhost:8080/onepie/register", stf)
            .then((response) => {
                console.log(response.data);
                navigate("/login");
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const changeHandler = (e) => {
        setStf({ ...stf, [e.target.name]: e.target.value });
    };

    const onChangePassword = (e) => {
        const currentPassword = e.target.value;
        setStf({ ...stf, stfPass: currentPassword });
        const passwordRegExp =
            /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
        if (!passwordRegExp.test(currentPassword)) {
            setPasswordMessage(
                "숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!"
            );
        } else {
            setPasswordMessage("안전한 비밀번호 입니다.");
        }
    };

    const onChangeEmail = (e) => {
        const currentEmail = e.target.value;
        setStf({ ...stf, stfEmail: currentEmail });
        const emailRegExp =
            /^[A-Za-z0-9_]+[A-Za-z0-9]*[@]{1}[A-Za-z0-9]+[A-Za-z0-9]*[.]{1}[A-Za-z]{1,3}$/;

        if (!emailRegExp.test(currentEmail)) {
            setEmailMessage("이메일의 형식이 올바르지 않습니다!");
        } else {
            setEmailMessage("사용 가능한 이메일 입니다.");
        }
    };

    const onChangePhone = (e) => {
        const currentPhone = e.target.value;
        setStf({ ...stf, stfPh: currentPhone });
        const phoneRegExp = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;

        if (!phoneRegExp.test(currentPhone)) {
            setPhoneMessage("올바른 형식이 아닙니다!");
        } else {
            setPhoneMessage("사용 가능한 번호입니다:-)");
        }
    };

    return (
        <MemberLayout>
            <section id="loginArea">
                <form className="loginBox" onSubmit={submitHandler}>
                    <div className="registerTitle">회원가입</div>
                    <div className="registerRow">
                        <div>사진</div>
                        <div className="imageBox">
                        <div style={{display:'flex', justifyContent:'space-between'}}>
                        <Dropzone onDrop={profileHandler}>
                        {({getRootProps, getInputProps}) => (
                        <div style={{width:140,height:140,border:'1px solid lightgray', display:'flex',alignSelf:'center'}} 
                        {...getRootProps()}>
                        <input {...getInputProps()} />
                        {preview ? (<img src={preview} alt="preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />) :
                         (<p style={{color:'lightgray', fontSize:'60px', margin:'20% 32%'}}>+</p>)}
                        </div>
                        )}
                        </Dropzone>
                    </div>
                        </div>
                    </div>

                    <div className="registerbox">
                        <div className="registerRow">
                            <div>이름</div>
                            <div>
                                <input
                                    type="text"
                                    name="stfName"
                                    value={stf.stfName}
                                    onChange={changeHandler}
                                    required
                                />
                            </div>
                        </div>

                        <div className="registerRow">
                            <div>입사일</div>
                            <div>
                                <input
                                    type="date"
                                    name="stfEnt"
                                    value={stf.stfEnt}
                                    onChange={changeHandler}
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <div className="registerbox">
                        <div className="registerRow">
                            <div>비밀번호</div>
                            <div>
                                <input
                                    type="password"
                                    name="stfPass"
                                    value={stf.stfPass}
                                    onChange={onChangePassword}
                                    required
                                />
                            </div>
                            <span>{passwordMessage}</span>
                        </div>

                        <div className="registerRow">
                            <div>비밀번호 확인</div>
                            <div>
                                <input
                                    type="password"
                                    name="stfPass2"
                                    value={stf.stfPass2}
                                    onChange={changeHandler}
                                    required
                                />
                            </div>
                            {stf.stfPass !== stf.stfPass2 && <span>비밀번호가 일치하지 않습니다.</span>}
                        </div>
                    </div>

                    <div className="registerbox">
                        <div className="registerRow">
                            <div>부서</div>
                            <div>
                                <select
                                    name="dptNo"
                                    id="department"
                                    value={stf.dptNo}
                                    onChange={changeHandler}
                                >
                                    <option value="">부서 선택</option>
                                    <option value="1팀">1팀</option>
                                    <option value="2팀">2팀</option>
                                    <option value="3팀">3팀</option>
                                    <option value="4팀">4팀</option>
                                </select>
                            </div>
                        </div>
                        <div className="registerRow">
                            <div>직급</div>
                            <div>
                                <select name="rnkNo" id="grade" value={stf.rnkNo} onChange={changeHandler}>
                                    <option value="">직급 선택</option>
                                    <option value="사원">사원</option>
                                    <option value="대리">대리</option>
                                    <option value="팀장">팀장</option>
                                    <option value="과장">과장</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="registerbox">
                        <div className="registerRow">
                            <div>이메일</div>
                            <div>
                                <input
                                    type="email"
                                    name="stfEmail"
                                    value={stf.stfEmail}
                                    onChange={onChangeEmail}
                                    required
                                />
                                <button>인증</button>
                            </div>
                            
                            <span>{emailMessage}</span>
                        </div>

                        <div className="registerRow">
                            <div>휴대폰</div>
                            <div>
                                <input
                                    type="tel"
                                    name="stfPh"
                                    value={stf.stfPh}
                                    onChange={onChangePhone}
                                    required
                                />
                            </div>
                            
                            <span>{phoneMessage}</span>
                        
                        </div>
                    </div>

                    <div className="registerRow">
                        <div>주소</div>
                        <div>
                            <input
                                type="text"
                                name="stfZip"
                                value={stf.stfZip}
                                onChange={changeHandler}
                                required
                            />
                            <button onClick={handlePostcode}>검색</button>
                        </div>
                        <div>
                            <input
                                type="text"
                                name="stfAddr1"
                                value={stf.stfAddr1}
                                onChange={changeHandler}
                                required
                            />
                        </div>
                        <div>
                            <input
                                type="text"
                                name="stfAddr2"
                                value={stf.stfAddr2}
                                onChange={changeHandler}
                                required
                            />
                        </div>
                    </div>

                    <input type="submit" value="회원가입" />
                </form>

                <div className="loginBox">
                    <img src="../images/iconSample4.PNG" alt="" />
                </div>
            </section>
        </MemberLayout>
    );
};

export default RegisterPage;
