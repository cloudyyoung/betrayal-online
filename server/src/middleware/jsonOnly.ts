// Socket.IO middleware factory that enforces JSON-serializable payloads.
// Returns a middleware function suitable for `socket.use(middleware)`.
export function createJsonOnlyMiddleware() {
    return (packet: any[], next: (err?: any) => void) => {
        try {
            const [, ...args] = packet;

            for (const index in args) {
                const arg = args[index];
                
                // Skip callback functions
                if (arg === args[args.length - 1] && typeof arg === 'function') {
                    continue;
                }

                const t = typeof arg;
                if (t === 'function' || t === 'symbol' || t === 'undefined') {
                    console.warn('socket payload rejected (type)', { argType: t });
                    return next(new Error('invalid payload: only JSON-serializable values allowed'));
                }

                if (typeof Buffer !== 'undefined' && Buffer.isBuffer(arg)) {
                    console.warn('socket payload rejected (binary)');
                    return next(new Error('invalid payload: binary data not allowed'));
                }

                let str: string | undefined;
                try {
                    str = JSON.stringify(arg);
                } catch (err) {
                    console.warn('socket payload rejected (stringify error)', err);
                    return next(new Error('invalid payload: not JSON-serializable'));
                }
                if (typeof str === 'undefined') {
                    console.warn('socket payload rejected (undefined after stringify)', { arg });
                    return next(new Error('invalid payload: cannot serialize value to JSON'));
                }

                // make data to be json
                
            }

            next();
        } catch (err) {
            console.warn('socket payload validation failed', err);
            next(new Error('invalid payload'));
        }
    };
}

export default createJsonOnlyMiddleware;
