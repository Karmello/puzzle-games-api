node {
   
   ansiColor('xterm') {
      
      withCredentials([usernamePassword(
         credentialsId: 'HerokuCredentials',
         usernameVariable: 'HEROKU_USERNAME',
         passwordVariable: 'HEROKU_PASSWORD'
      )]) {

         try {

            stage('Deploy to Heroku - staging') {
               dir(pwd() + '@script') {
                  sh('git checkout $ghprbSourceBranch')
                  sh('git push -f https://$HEROKU_USERNAME:$HEROKU_PASSWORD@git.heroku.com/staging-puzzle-games-api.git $ghprbSourceBranch:master')
               }
            }

            stage('Test on Heroku - staging') {
               sh('heroku run "npm test" -a staging-puzzle-games-api')
            }

            if (env.ghprbSourceBranch == 'staging') {
               stage('Deploy to Heroku - master') {
                  dir(pwd() + '@script') {
                     sh('git checkout staging')
                     sh('git push -f https://$HEROKU_USERNAME:$HEROKU_PASSWORD@git.heroku.com/puzzle-games-api.git staging:master')
                  }
               }
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
}