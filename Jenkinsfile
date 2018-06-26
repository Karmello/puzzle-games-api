node {
   
   ansiColor('xterm') {
      
      try {

         String herokuAppName = 'puzzle-games-api'

         echo env.ghprbSourceBranch

         if (env.ghprbSourceBranch != 'staging') {
            herokuAppName = 'staging-' + herokuAppName
         }

         stage('Build on Heroku') {

            withCredentials([usernamePassword(
               credentialsId: 'HerokuCredentials',
               usernameVariable: 'HEROKU_USERNAME',
               passwordVariable: 'HEROKU_PASSWORD'
            )]) {
               
               dir(pwd() + '@script') {
                  sh('git checkout $ghprbSourceBranch')
                  sh('git push -f https://$HEROKU_USERNAME:$HEROKU_PASSWORD@git.heroku.com/' + herokuAppName + '.git $ghprbSourceBranch:master')
               }
            }
         }
         
         stage('Test on Heroku') {
            sh('heroku run "npm test" -a ' + herokuAppName)
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