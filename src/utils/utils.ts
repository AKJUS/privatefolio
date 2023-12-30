/**
 * Returns a hash code from a string
 * @param  {String} str The string to hash.
 * @return {String}    A string hash
 * @see http://werxltd.com/wp/2010/05/13/javascript-implementation-of-javas-string-hashcode-method/
 * @see https://stackoverflow.com/questions/6122571/simple-non-secure-hash-function-for-javascript
 * @see https://devdocs.io/openjdk~8/java/lang/string#hashCode--
 */
export function hashString(str: string): string {
  let hash = 0
  for (let i = 0, len = str.length; i < len; i++) {
    const chr = str.charCodeAt(i)
    hash = ((hash << 5) - hash + chr) >>> 0 // Convert to 32bit unsigned integer
  }
  return hash.toString()
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
export function noop() {}

export const SPRING_CONFIGS = {
  quick: { clamp: true, friction: 200, mass: 5, tension: 2000 },
  quicker: { clamp: true, friction: 200, mass: 5, tension: 3000 },
  slow: { clamp: true, friction: 200, mass: 5, tension: 1500 },
  ultra: { clamp: true, friction: 200, mass: 5, tension: 6000 },
  veryQuick: { clamp: true, friction: 200, mass: 5, tension: 4000 },
  verySlow: { clamp: true, friction: 200, mass: 50, tension: 250 },
}

export async function wait(interval: number) {
  return new Promise((resolve) => setTimeout(resolve, interval))
}

export function timeQueue<T extends (...args: any[]) => void>(
  this: unknown,
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  const queue: (() => void)[] = []
  let timerId: ReturnType<typeof setInterval> | null = null

  function processQueue() {
    if (queue.length === 0) {
      if (timerId !== null) {
        clearInterval(timerId)
        timerId = null
      }
    } else {
      const call = queue.shift()
      call?.()
    }
  }

  return function (this: unknown, ...args: Parameters<T>) {
    queue.push(() => func.apply(this, args))

    if (timerId === null) {
      timerId = setInterval(processQueue, delay)
    }
  }
}

export const EMPTY_OBJECT = Object.freeze({})
