import Redis from 'ioredis'

let cloneRedis = () => new Redis(process.env.REDIS_URL, {
  keyPrefix: process.env.REDIS_PREFIX
})

export default cloneRedis()

export {
  cloneRedis
}
