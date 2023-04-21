const { Storage } = require("@google-cloud/storage");
const path = require("path");
const fs = require("fs");
const uuid = require("uuid");
const multer = require("multer");

require("dotenv").config();

/**
 * @description 구글 클라우드 스토리지와 연결(프로젝트 ID, 인증 키 파일 경로)
 * @see routes.frame.js
 */
const storage = new Storage({
  projectId: process.env.GOOGLE_PROJECT_ID,
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
});

// 저장소에서 버킷을 가져옴
const bucket = storage.bucket(process.env.GOOGLE_STORAGE_BUCKET_NAME);

/**
 * @description multer 미들웨어를 생성하여 내보냄
 * @see routes.frame.js
 */
module.exports.upload = multer({
  storage: multer.memoryStorage(), // 메모리 스토리지를 사용하여 업로드한 파일을 저장
  limits: {
    fileSize: 5 * 1024 * 1024, // 파일 크기를 5MB로 제한
  },
});

/**
 *
 * @param file 업로드할 파일 객체 - req.files의 medalUrl 또는 photoUrl
 * @returns Promise 객체를 반환하여 비동기적으로 파일 업로드를 수행하고 공개 URL을 반환
 * @description 구글 클라우드 스토리지에 파일을 업로드하고 공개 URL을 반환하는 함수
 * @see routes.frame.js
 */
module.exports.uploadToGCS = async function (file) {
  if (!file) {
    throw new Error("No file provided");
  }

  // 파일 이름을 생성하기 위해 UUID와 확장자를 사용
  const filename = `${uuid.v4()}${path.extname(file.originalname)}`;

  // 파일 객체 생성
  const fileUpload = bucket.file(filename);

  // 파일 스트림 생성
  const Stream = fileUpload.createWriteStream({
    resumable: false,
    gzip: true,
    metadata: {
      contentType: file.mimetype, // 파일의 MIME 유형 지정
    },
  });

  // Promise를 반환하여 비동기적으로 파일 업로드를 수행
  return new Promise((resolve, reject) => {
    // 파일 업로드 중 오류 발생 시 reject
    Stream.on("error", (error) => {
      reject(error);
    });

    // 파일 업로드가 완료되면 파일을 공개하고 공개 URL을 반환하는 resolve
    Stream.on("finish", async () => {
      await fileUpload.makePublic(); // 파일을 공개

      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${fileUpload.name}`; // 공개 URL 생성
      resolve(publicUrl);
      console.log(`Image uploaded to ${filename}`);
    });

    // 파일 데이터를 스트림에 기록
    Stream.end(file.buffer);
  });
};
