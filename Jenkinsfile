node {
   
   ansiColor('xterm') {
      
      try {

         stage('Build on Heroku') {
         
            // sh('printenv')

            withCredentials([
               usernamePassword(credentialsId: 'GitHubCredentials', usernameVariable: 'GIT_USERNAME', passwordVariable: 'GIT_PASSWORD'),
               usernamePassword(credentialsId: 'HerokuCredentials', usernameVariable: 'HEROKU_USERNAME', passwordVariable: 'HEROKU_PASSWORD')
            ]) {

               // sh('git clone https://$GIT_USERNAME:$GIT_PASSWORD@github.com/Karmello/puzzle-games-api.git .')
               // sh('git config --global push.default matching')
               sh('cd ../staging-puzzle-games-api@script')
               sh('git checkout $ghprbSourceBranch')
               sh('git push -f https://$HEROKU_USERNAME:$HEROKU_PASSWORD@git.heroku.com/staging-puzzle-games-api.git $ghprbSourceBranch:master')
            }
         }
         
         stage('Test on Heroku') {
            sh('heroku run "npm test" -a staging-puzzle-games-api')
         }
      
      } catch(ex) {

         throw ex

      } finally {

         stage('Clean up') {
            dir(pwd()) {
               deleteDir()
            }
            dir(pwd() + '@script') {
               deleteDir()
            }
         }
      }
   }
}