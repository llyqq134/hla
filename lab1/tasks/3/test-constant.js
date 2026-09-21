import http from 'k6/http'
import { check, sleep } from 'k6'

export const options = {
  stages: [
    { duration: '10s', target: 10240 },
  ],
}

export default function() {
  const res = http.get('http://localhost:8080')

  check(res, {
    'status is 200': (r) => r.status === 200,
  })

  sleep(1)
}
