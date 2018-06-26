node {
   
   ansiColor('xterm') {
      
      try {

         stage('Build on Heroku') {
         
            withCredentials([usernamePassword(
               credentialsId: 'HerokuCredentials',
               usernameVariable: 'HEROKU_USERNAME',
               passwordVariable: 'HEROKU_PASSWORD'
            )]) {

               dir(pwd() + '@script') {
                  sh('git checkout $ghprbSourceBranch')
                  sh('git push -f https://$HEROKU_USERNAME:$HEROKU_PASSWORD@git.heroku.com/staging-puzzle-games-api.git $ghprbSourceBranch:master')
               }
            }
         }
         
         stage('Test on Heroku') {
            sh('heroku run "npm test" -a staging-puzzle-games-api')
         }
      
      } catch(ex) {

         throw ex

      } finally {

         stage('Clean up') {

            dir(pwd()) { deleteDir() }
            dir(pwd() + '@tmp') { deleteDir() }
            dir(pwd() + '@script') { deleteDir() }
            dir(pwd() + '@script@tmp') { deleteDir() }
         }
      }
   }
}