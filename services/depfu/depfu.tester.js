import Joi from 'joi'
import { ServiceTester } from '../tester.js'

const isDependencyStatus = Joi.string().valid(
  'insecure',
  'latest',
  'recent',
  'stale',
)

export const t = new ServiceTester({ id: 'depfu', title: 'Depfu' })

t.create('depfu GitHub dependencies (valid)')
  .get('/dependencies/github/depfu/example-ruby.json')
  .expectBadge({
    label: 'dependencies',
    message: isDependencyStatus,
  })

t.create('depfu GitHub dependencies (repo not found)')
  .get('/dependencies/github/pyvesb/emptyrepo.json')
  .expectBadge({ label: 'dependencies', message: 'not found' })

t.create('depfu GitLab dependencies (valid)')
  .get('/dependencies/gitlab/depfu/example-ruby.json')
  .expectBadge({
    label: 'dependencies',
    message: isDependencyStatus,
  })

t.create('depfu GitHub dependencies (no separator)')
  .get('/dependencies/github/example-ruby.json')
  .expectBadge({
    label: 'dependencies',
    message: 'invalid parameter',
  })

t.create('depfu GitLab dependencies (valid with subgroup)')
  .get(
    '/dependencies/gitlab/shields-example-group/subgroup/example-nodejs.json',
  )
  .expectBadge({
    label: 'dependencies',
    message: isDependencyStatus,
  })

t.create('depfu GitLab dependencies (repo not found)')
  .get('/dependencies/gitlab/fdroid/nonexistant.json')
  .expectBadge({ label: 'dependencies', message: 'not found' })

t.create('depfu GitLab dependencies (no separator)')
  .get('/dependencies/gitlab/example-ruby.json')
  .expectBadge({
    label: 'dependencies',
    message: 'invalid parameter',
  })

t.create('legacy route (assume "github" as a default VCS)')
  .get('/depfu/example-ruby.svg')
  .expectRedirect('/depfu/dependencies/github/depfu/example-ruby.svg')
