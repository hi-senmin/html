
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'


class MyPromise {

    constructor(executor) {
        this._status = PENDING
        this._resolveQueue = []
        this._rejectQueue = []

        this._value = null

        let _resolve = (val) => {
            const run = () => {
                if (this._status !== PENDING) return
                this._status = FULFILLED

                while (this._resolveQueue.length) {
                    const callback = this._resolveQueue.shift()
                    callback(val)
                }
            }
            setTimeout(run)
        }

        let _reject = err => {
            const run = () => {
                if (this._status !== PENDING) return
                this._status = REJECTED

                while (this._rejectQueue.length) {
                    const callback = this._rejectQueue.shift()
                    callback(err)
                }
            }
            setTimeout(run)
        }

        executor(_resolve, _reject)
    }

    static resolve(value) {
        if (value instanceof MyPromise) {
            return value
        }
        return new MyPromise(resolve => resolve(value))
    }

    static reject(reason) {
        return new MyPromise((resolve, reject) => reject(reason))
    }

    static all(promiseArr) {
        let index = 0
        let result = []

        return new MyPromise((resolve, reject) => {
            promiseArr.forEach((p, i) => {
                MyPromise.resolve(p).then(val => {
                    index++;
                    result[i] = val
                    if (index === promiseArr.length) {
                        resolve(result)
                    }
                }, err => {
                    reject(err)
                })
            });
        })
    }

    static race(promiseArr) {
        return new MyPromise((resolve, reject) => {
            for (const p of promiseArr) {
                MyPromise.resolve(p).then(value => {
                    resolve(value)
                }, err => {
                    reject(err)
                })
            }
        })
    }

    then(resolveFn, rejectFn) {

        typeof resolveFn !== 'function' ? resolveFn = value => value : null
        typeof rejectFn !== 'function' ? rejectFn = error => error : null

        return new MyPromise((resolve, reject) => {
            const fulfilledFn = (value) => {
                try {
                    let x = resolveFn(value)
                    x instanceof MyPromise ? x.then(resolve, reject) : resolve(x)
                } catch (error) {
                    reject(error)
                }
            }

            const rejectedFn = value => {
                try {
                    let x = rejectFn(value)
                    x instanceof MyPromise ? x.then(resolve, reject) : resolve(x)
                } catch (error) {
                    reject(error)
                }
            }

            switch (this._status) {
                case PENDING:
                    this._resolveQueue.push(fulfilledFn)
                    this._rejectQueue.push(rejectedFn)
                    break;

                case FULFILLED:
                    fulfilledFn(this._value)
                    break
                case REJECTED:
                    rejectedFn(this._value)
                    break

                default:
                    break;
            }

        })

    }

    catch(rejectFn) {
        return this.then(undefined, rejectFn)
    }

    finally(callback) {
        return this.then(
            value => MyPromise.resolve(callback()).then(() => value),
            reason => MyPromise.resolve(callback()).then(() => { throw reason })
        )
    }

}




// const p1 = new MyPromise((resolve, reject) => {
//     resolve(1)       
// })

// p1.then(res => {
//     console.log(res)
//     return 2         
// }).then()            
//     .then(res => {
//         console.log(res)
//         return new MyPromise((resolve, reject) => {
//             resolve(3)      
//         })
//     })
//     .then(res => {
//         console.log(res)
//         throw new Error('reject测试')  
//     })
//     .then(res => {
//         console.log('4:', res)
//     }, err => {
//         console.log('err:', err)
//     })

const p2 = new MyPromise((resolve, reject) => {
    console.log(1)
    console.log(2)
    // setTimeout(() => {
    console.log('定时器 nS后：：')
    resolve('result')
    // }, 1000)
})
console.log(3)

MyPromise.resolve(4).then(res => {
    console.log(res)
})

// const promise = new Promise((resolve, reject) => {
//     console.log(1)
//     setTimeout(() => {
//         resolve('result')
//     }, 1000);
// });

// promise.then(res => {
//     console.log('res', res)
// }, err => {
//     console.log('err', err)
// }).then(res => {
//     console.log(res)
// })

