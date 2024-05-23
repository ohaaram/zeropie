import React, { useState } from 'react'
import Dropzone from 'react-dropzone'
import axios from 'axios'




function FileUpload(){

  const dropHandler = (files) => {

    const file = files[0];
    

    //프로필이 잘 들어왔는지 찍어보기
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
                <div style={{width:140,height:140,border:'1px solid lightgray', display:'flex',alignSelf:'center'}} 
                  {...getRootProps()}>
                  <input {...getInputProps()} />
                  {preview ? (
              <img src={preview} alt="preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <p style={{color:'lightgray', fontSize:'60px', margin:'20% 32%'}}>+</p>
            )}
                </div>
            )}
          </Dropzone>
        </div>
    )
}


export default FileUpload