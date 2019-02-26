node("nodejs-8") {
    stage('S2I') {
            // Start openshift build
            // all configs are defined in build-config in openshift
            sh "oc start-build dpe-basic-api -n cicd --follow"

            // Tag image in CICD project into dpe-basic project.
            // This command will trigger Deployment. This setting is defined in deployment-config in openshift
            sh "oc tag cicd/dpe-basic-api:latest dpe-basic-api:latest -n dpe-basic"
            // Check deployment status
            sh "oc rollout status deploymentconfig/dpe-basic-api -n dpe-basic"
    }

}