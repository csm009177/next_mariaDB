// Express 웹 애플리케이션 프레임워크를 임포트합니다.
const express = require("express");  
// Next.js 애플리케이션 프레임워크를 임포트합니다.
const next = require('next');
// MySQL 데이터베이스 연결을 위한 mysql2 라이브러리를 임포트합니다. 
// (npm 패키지로 설치 필요)
const mysql = require('mysql2');  

const isDev = process.env.NODE_ENV !== 'development';  // 환경 변수를 확인하여 개발 모드인지 아닌지를 결정합니다. (production 또는 development)
const app = next({ dev: isDev });  // Next.js 애플리케이션 인스턴스를 생성합니다. 개발 모드인지 아닌지에 따라 설정이 달라집니다.
const handle = app.getRequestHandler();  // Next.js의 기본 요청 핸들러를 가져옵니다.


// MariaDB 연결 설정
const connection = mysql.createConnection({

  host: "localhost",  
  user: "root",       // 데이터베이스에 접속할 사용자 이름입니다. 
  password: "0177",   
  database: "anthem", // 연결할 데이터베이스의 이름입니다.  
  port:3307,
});

// Next.js 애플리케이션 준비가 완료된 후에 실행될 코드를 정의합니다.
app.prepare().then(() => {
  // Express 서버 인스턴스를 생성합니다.
  const server = express(); 
  // JSON 형식의 요청을 파싱하기 위해 Express 미들웨어를 사용합니다.
  server.use(express.json()); 
  // URL-encoded 형식의 요청을 파싱하기 위해 Express 미들웨어를 사용합니다.
  server.use(express.urlencoded({ extended : true }));


  // Next.js 서버에 모든 요청을 위임하기 위한 핸들러를 설정합니다.
  server.all('*', (req, res) => {
    return handle(req, res);  // Next.js 애플리케이션의 핸들러를 호출하여 모든 요청을 처리합니다.
  });

  // 서버를 특정 포트에서 실행합니다.
  const port = 3238;  // 서버를 실행할 포트 번호를 정의합니다.

  // 서버를 지정된 포트에서 시작합니다.
  server.listen(port, (err) => {
    // 오류가 발생한 경우 오류를 콘솔에 출력하고 종료합니다.
    if (err) throw err;

    // 서버가 시작되면 콘솔에 서버의 주소와 포트를 출력합니다.
    console.log(`> Ready on http://localhost:${port}`);
  });
});
