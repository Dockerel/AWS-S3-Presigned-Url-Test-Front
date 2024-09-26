# AWS S3 Presigned Url Test:Front by html, js
**Presigned Url을 사용해야 하는 이유**
1. 기존의 방식

![image](https://github.com/user-attachments/assets/292e59e2-d388-4c64-a3ca-d56202954a90)
 
 **multipart/form-data**를 통한 데이터 전송 시 클라이언트→서버, 서버→s3로 데이터를 전송하는 이중 작업이 필요합니다. 또한 서버측에서 Spring은 file-size-threshold를 넘어가는 파일은 임시 파일로 저장하여 처리하기 때문에 서버에서 대용량 파일을 직접 처리하면, 서버 자원(메모리, CPU 등)의 비용이 높아지고 추가비용이 발생하게 될 수도 있습니다.

2. Presigned Url

![image](https://github.com/user-attachments/assets/a2b57311-2b15-411a-a2e2-e238c35cd9a0)

 **Presigned Url**은 s3의 소유자가 미리 업로드, 다운로드 등에 대해 서명을 해준 뒤 사용자에게 해당 Url을 제공해주는 방식입니다. 해당 방식을 사용할 시에 클라이언트는 서버를 거치지 않고 파일을 s3에 바로 업로드할 수 있어 서버의 자원을 절약할 수 있고, 트래픽이나 스토리지 사용에 대한 추가 비용 또한 절약할 수 있습니다.
