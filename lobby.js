const PREFIX = 'brookejams-';

export class Lobby {
    constructor() {
        this.peer = null;
        this.conn = null;
        this.onConnect = () => {};
        this.onMessage = () => {};
        this.onDisconnect = () => {};
    }

    host() {
        return new Promise((resolve, reject) => {
            const code = Math.random().toString(36).slice(2, 7).toUpperCase();
            this.peer = new Peer(PREFIX + code);

            this.peer.on('open', () => resolve(code));
            this.peer.on('error', err => {
                if (err.type === 'unavailable-id') this.host().then(resolve, reject);
                else reject(err);
            });
            this.peer.on('connection', conn => {
                if (this.conn) { conn.close(); return; }   
                this._setup(conn);
            });
        });
    }

    join(code) {
        return new Promise((resolve, reject) => {
            this.peer = new Peer();
            this.peer.on('error', reject);
            this.peer.on('open', () => {
                const conn = this.peer.connect(PREFIX + code.trim().toUpperCase());
                this._setup(conn);
                conn.on('open', resolve);
            });
        });
    }

    send(msg) {
        if (this.conn && this.conn.open) this.conn.send(msg);
    }

    _setup(conn) {
        this.conn = conn;
        conn.on('open', () => this.onConnect());
        conn.on('data', msg => this.onMessage(msg));
        conn.on('close', () => this.onDisconnect());
    }
}