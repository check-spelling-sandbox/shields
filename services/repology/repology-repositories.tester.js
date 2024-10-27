import { createServiceTester } from '../tester.js'
import { nonNegativeInteger } from '../validators.js'
export const t = await createServiceTester()

t.create('Existing project').get('/starship.json').expectBadge({
  label: 'repositories',
  message: nonNegativeInteger,
})

t.create('Nonexistent project')
  .get('/invalidprojectthatshouldnotexist.json')
  .expectBadge({
    label: 'repositories',
    message: '0',
  })
