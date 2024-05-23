import React from 'react'
import Dropzone from 'react-dropzone'
import axios from 'axios'


function FileUpload(){
/*
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("올바른 이메일 형식이 아닙니다!")
      .required("이메일을 입력하세요!"),
    username: Yup.string()
      .min(2, "닉네임은 최소 2글자 이상입니다!")
      .max(10, "닉네임은 최대 10글자입니다!")
      .matches(
        /^[가-힣a-zA-Z][^!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?\s]*$/,
        "닉네임에 특수문자가 포함되면 안되고 숫자로 시작하면 안됩니다!"
      )
      .required("닉네임을 입력하세요!"),
    password: Yup.string()
      .min(8, "비밀번호는 최소 8자리 이상입니다")
      .max(16, "비밀번호는 최대 16자리입니다!")
      .required("패스워드를 입력하세요!")
      .matches(
        /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[^\s]*$/,
        "알파벳, 숫자, 공백을 제외한 특수문자를 모두 포함해야 합니다!"
      ),
    password2: Yup.string()
      .oneOf([Yup.ref("password"), null], "비밀번호가 일치하지 않습니다!")
      .required("필수 입력 값입니다!"),
  });
*/


  const dropHandler = (files) => {

    files.forEach((file, index) => {
      console.log(`File ${index + 1}:`);
      console.log("Name:", file.name);
      console.log("Size:", file.size);
      console.log("Type:", file.type);
      console.log("Last Modified Date:", file.lastModifiedDate);
    });


    let formData = new FormData();
    formData.append("file", files[0]);
    console.log(formData[0])
       // 서버에 파일 전송
    // 서버에 파일 전송
    axios.post('http://localhost:8080/onepie/register', formData, {header: {
      'Content-Type':'multipart/form-data'}
    })
      .then(response => {
        if (response.data.success) {
          alert('파일 저장 성공!!!!!!');
        } else {
          alert('파일 저장 실패');
        }
      })
      .catch(error => {
        console.error('파일 저장 중 오류 발생:', error);
        alert('파일 저장 중 오류 발생');
      });
    }
    return(
        <div style={{display:'flex', justifyContent:'space-between'}}>
          <Dropzone onDrop={dropHandler}>
            {({getRootProps, getInputProps}) => (
                <div style={{width:130,height:120,border:'1px solid lightgray', display:'flex',alignSelf:'center',justifyContent:'conter'}} 
                  {...getRootProps()}>
                  <input {...getInputProps()} />
                </div>
            )}
          </Dropzone>
        </div>
    )
}


export default FileUpload