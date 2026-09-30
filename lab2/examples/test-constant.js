import http from 'k6/http'
import { check, sleep } from 'k6'

export const options = {
  vus: 1110,
  duration: '10s',
  summaryTrendStats: ['avg', 'p(95)', 'p(99)'],

}

export default function() {
  const res = http.get('http://localhost:8080')

  check(res, {
    'status is 200': (r) => r.status === 200,
  })

  sleep(1)
}
