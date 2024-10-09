pipeline {
    agent any

    environment {
        REGION = 'ap-northeast-2'
        ACC_IMAGE_NAME = '339713037008.dkr.ecr.ap-northeast-2.amazonaws.com/acc_front'
        ECR_PATH = '339713037008.dkr.ecr.ap-northeast-2.amazonaws.com'
        AWS_CREDENTIAL_NAME = 'aws-key'
    }

    stages {
        stage('Pull Codes from Github') {
            steps {
                checkout scm
            }
        }

        // 서비스 URL을 가져와서 .env 파일 업데이트
        stage('Get Backend Service URL and Update .env') {
            steps {
                script {
                    withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', credentialsId: 'aws-key']]) {
                        // 회계 백엔드 서비스의 URL 가져오기
                        def acc_service_url = powershell(script: "kubectl get service acc-backend-service -o jsonpath='{.status.loadBalancer.ingress[0].hostname}'", returnStdout: true).trim()

                        // .env 파일의 API URL 업데이트
                        bat """
                        powershell -Command "(Get-Content 'E:/docker_dev/acc_react_front_cloud/.env') -replace 'NEXT_PUBLIC_BACKEND_ACC_URL=.*', 'NEXT_PUBLIC_BACKEND_ACC_URL=http://$acc_service_url:9103' | Set-Content 'E:/docker_dev/acc_react_front_cloud/.env'"
                        """

                        // .env 파일 내용 확인
                        def env_content = powershell(script: "Get-Content 'E:/docker_dev/acc_react_front_cloud/.env'", returnStdout: true).trim()
                        echo "Updated .env content:\n${env_content}"
                    }
                }
            }
        }

        // 회계 프론트엔드 Docker 이미지 빌드 및 ECR 푸시
        stage('Build and Push Accounting Frontend Docker Image') {
            steps {
                dir('E:/docker_dev/acc_react_front_cloud') { 
                    script {
                        bat """
                        docker build -t ${ACC_IMAGE_NAME}:latest .
                        docker push ${ACC_IMAGE_NAME}:latest
                        """
                    }
                }
            }
        }

        // 회계 프론트엔드 디플로이먼트 적용
        stage('Apply Accounting Frontend Deployment') {
            steps {
                script {
                    withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', credentialsId: 'aws-key']]) {
                        bat 'kubectl apply -f E:/docker_Logi/acc-front-deployment.yaml'
                    }
                }
            }
        }
    }
}
