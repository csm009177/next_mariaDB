// Express 웹 애플리케이션 프레임워크를 임포트합니다.
const express = require("express");  
// Next.js 애플리케이션 프레임워크를 임포트합니다.
const next = require('next');
// MySQL 데이터베이스 연결을 위한 mysql2 라이브러리를 임포트합니다. 
// (npm 패키지로 설치 필요)
const mysql = require('mysql2');  


// MariaDB 연결 설정
const connection = mysql.createConnection({

  host: "localhost",  
  user: "root",       // 데이터베이스에 접속할 사용자 이름입니다. 
  password: "0177",   
  database: "anthem", // 연결할 데이터베이스의 이름입니다.  
});