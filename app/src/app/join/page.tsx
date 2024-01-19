'use client'  // 이 파일은 클라이언트 사이드에서 실행됩니다.

// 필요한 모듈을 임포트합니다.
import Image from 'next/image'  // Next.js에서 이미지 컴포넌트를 임포트합니다.
import React, { useState } from "react";  // React 라이브러리에서 useState를 임포트합니다.
import Link from 'next/link'  // Next.js에서 Link 컴포넌트를 임포트합니다.

// Join 컴포넌트를 정의합니다.
export default function Join() {
  // 상태 변수들을 정의하고 초기화합니다.
  const [name, setName] = useState("");  // 이름 상태 변수와 상태 설정 함수를 생성합니다.
  const [username, setUsername] = useState("");  // 아이디 상태 변수와 상태 설정 함수를 생성합니다.
  const [password, setPassword] = useState("");  // 비밀번호 상태 변수와 상태 설정 함수를 생성합니다.
  const [message, setMessage] = useState("");  // 메시지 상태 변수와 상태 설정 함수를 생성합니다.

  // 회원가입 처리 함수를 정의합니다.
  const handleJoin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();  // 이벤트의 기본 동작(여기서는 폼 제출의 새로고침)을 방지합니다.
    // 이 함수는 회원 가입을 처리하는 비동기 함수입니다. 
    // e: React.FormEvent<HTMLFormElement>는 이 함수가 폼 제출 이벤트를 처리하는 것을 나타냅니다.
    // 'async' 키워드는 이 함수가 비동기적으로 동작할 수 있음을 나타냅니다.
    // 폼 제출 이벤트가 발생했을 때 호출되며, 사용자의 입력 값을 가져와서 서버로 전송하거나 다른 로직을 수행할 수 있습니다.
    try {
      const response = await fetch("/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, username, password }),
      });

      if (response.ok) {
        setMessage("회원가입이 완료되었습니다."); // 성공 메시지 설정
      } else {
        setMessage("회원가입에 실패했습니다."); // 실패 메시지 설정
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("회원가입 중 오류가 발생했습니다."); // 오류 메시지 설정
    }
  }


  return (
    <div>
      <h1>Join page</h1><br/>
      <form  onSubmit={handleJoin}>
        <input className="text-black" type="text" placeholder="name" value={name} onChange={(e) => setName(e.target.value)}/><br/>
        <input className="text-black" type="text" placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)}/><br/>
        <input className="text-black" type="text" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} /><br/>
        <button type="submit">submit</button>
        {message && <p>{message}</p>}
      </form>
    </div>
  )
}
