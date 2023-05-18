// This is a Jenkinsfile. It is a script that Jenkins will run when a build is triggered.
pipeline {
    // Telling Jenkins to run the pipeline on any available agent.
    agent any

    // Setting environment variables for the build.
    environment {
        MONGODB_URI = credentials('mongodb-uri')
        TOKEN_KEY = credentials('token-key')
        EMAIL = credentials('email')
        PASSWORD = credentials('password')
    }

    // This is the pipeline. It is a series of stages that Jenkins will run.
    stages {
        // This state is telling Jenkins to checkout the source code from the source control management system.
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        // This stage is telling Jenkins to run the tests in the client directory.
        stage('Client Tests') {
            steps {
                dir('client') {
                    sh 'npm install'
                    sh 'npm test'
                }
            }
        }
        
        // This stage is telling Jenkins to run the tests in the server directory.
        stage('Server Tests') {
            steps {
                dir('server') {
                    sh 'npm install'
                    sh 'export MONGODB_URI=$MONGODB_URI'
                    sh 'export TOKEN_KEY=$TOKEN_KEY'
                    sh 'export EMAIL=$EMAIL'
                    sh 'export PASSWORD=$PASSWORD'
                    sh 'npm test'
                }
            }
        }
        
        // This stage is telling Jenkins to build the images for the client and server.
        stage('Build Images') {
            steps {
                sh 'docker build -t rakeshpotnuru/productivity-app:client-latest client'
                sh 'docker build -t rakeshpotnuru/productivity-app:server-latest server'
            }
        }
        
        // This stage is telling Jenkins to push the images to DockerHub.
        stage('Push Images to DockerHub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub', passwordVariable: 'DOCKER_PASSWORD', usernameVariable: 'DOCKER_USERNAME')]) {
                    sh 'docker login -u $DOCKER_USERNAME -p $DOCKER_PASSWORD'
                    sh 'docker push rakeshpotnuru/productivity-app:client-latest'
                    sh 'docker push rakeshpotnuru/productivity-app:server-latest'
                }
            }
        }
    }
}
