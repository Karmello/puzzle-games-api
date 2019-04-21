node {

  ansiColor('xterm') {

    withCredentials([
      usernamePassword(credentialsId: 'HerokuCredentials', usernameVariable: 'HEROKU_USERNAME', passwordVariable: 'HEROKU_PASSWORD'),
      usernamePassword(credentialsId: 'mLabCredentials', usernameVariable: 'MLAB_USERNAME', passwordVariable: 'MLAB_PASSWORD')
    ]) {

      try {

        // deploying from feature to staging
        if (env.ghprbSourceBranch != 'staging') {

          stage('Starting staging environment deployment') {}

          stage('Checking out a branch') {
            dir(pwd() + '@script') {
              sh('git checkout $ghprbSourceBranch')
            }
          }

          stage('Building on Heroku') {
            dir(pwd() + '@script') {
              sh('git push -f https://$HEROKU_USERNAME:$HEROKU_PASSWORD@git.heroku.com/staging-puzzle-games-api.git $ghprbSourceBranch:master')
            }
          }

          stage('Making database up to date') {
            dir(pwd() + '@script') {
              sh('mongo ds155218.mlab.com:55218/staging-puzzle-games -u $MLAB_USERNAME -p $MLAB_PASSWORD < "db/resetReadOnlyCollections.js"')
            }
          }

          stage('Testing') {
            sh('heroku run "npm test" -a staging-puzzle-games-api --exit-code')
          }

          stage('Clearing database') {
            dir(pwd() + '@script') {
              sh('mongo ds155218.mlab.com:55218/staging-puzzle-games -u $MLAB_USERNAME -p $MLAB_PASSWORD < "db/reset.js"')
            }
          }

        // deploying from staging to master
        } else if (env.ghprbSourceBranch == 'staging') {

          stage('Starting production environment deployment') {}

          stage('Checkout out a branch') {
            dir(pwd() + '@script') {
              sh('git checkout staging')
            }
          }

          stage('Building on Heroku') {
            dir(pwd() + '@script') {
              sh('git push -f https://$HEROKU_USERNAME:$HEROKU_PASSWORD@git.heroku.com/puzzle-games-api.git staging:master')
            }
          }

          stage('Making database up to date') {
            dir(pwd() + '@script') {
              sh('mongo ds155218.mlab.com:55218/puzzle-games -u $MLAB_USERNAME -p $MLAB_PASSWORD < "db/resetReadOnlyCollections.js"')
            }
          }
        }

      } catch(ex) {

        throw ex

      } finally {

        stage('Cleaning up directories') {
          dir(pwd()) { deleteDir() }
          dir(pwd() + '@tmp') { deleteDir() }
          dir(pwd() + '@script') { deleteDir() }
          dir(pwd() + '@script@tmp') { deleteDir() }
        }
      }
    }
  }
}