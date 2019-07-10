// @Library("devops") _
// def ocp = new cicd.ocp()
// def git_tool = new cicd.github()
// def postStep = new cicd.postStep()
// def common = new cicd.common()
// def buildAndTest = new cicd.buildAndTest()
// def init = new cicd.init()
pipeline {
    agent none
    options { skipDefaultCheckout true }
    stages {
        stage('Initialize'){
            agent { docker { image "${init.docker_image('common')}" } }
            steps {

                cleanWs()
                // Clone git repository

                script {
                    def branch_name = ""
                    if ( params.ACTION == "build" ) {
                        branch_name = "refs/heads/${params.BRANCH}"
                    } else {
                        branch_name = params.COMMIT_SHA
                    }

                    checkout()

                    sh "ls -l"
                    cfg = init.config()
                    init.set_env_vars(cfg)

                    // Initialize status variables
                    result = "SUCCESS"
                    job_stage = "${STAGE_NAME}"
                    gate_status = "OK"
                    error_message = 'None'
                }
            }
        }

        stage('Build and Test') {
            when { expression { common.stage_conditions("build", cfg, result) } }
            agent {
                docker {
                    image cfg.get("build_image_name")
                    args cfg.get('docker_args')
                }
            }
            steps {
                script {
                    // Store stage name to send to Slack
                    job_stage = "${STAGE_NAME}"
                    // Regardless of the junit test results, procceed.
                    ( result, error_message ) = buildAndTest.exec(cfg)
                }
            }
        }
        stage("OpenShift") {
            when { expression { common.stage_conditions("ocp", cfg, result) } }
            agent { docker { image "${init.docker_image('common')}" } }
            steps {
                script {
                    envs = ['dev', 'stg', 'prod']
                    for (env in envs) {
                        stage(env) {
                            if ( common.stage_conditions(env, cfg, result) ) {
                                // Store stage name to send to Slack
                                job_stage = "${STAGE_NAME}"
                                ( result, error_message ) = ocp.orchestrate(env, cfg)
                            }
                        }
                    }
                }
            }
        }
    }
    post {
        always {
            script {
                currentBuild.result = result
                cfg.put("gate_status", gate_status)
                cfg.put("job_stage", job_stage)
                cfg.put("error_message", error_message)
                cfg.put("result", result)
                postStep.orchestrate(cfg)
            }
        }
    }
}