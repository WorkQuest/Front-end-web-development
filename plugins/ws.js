import Connection from '~/plugins/connection';

export default async ({ store, $axios }, inject) => {
  const connectionManager = {
    availableConnections: [],
    // privateConnections: [],
    connections: [
      {
        name: 'wsNotifs', url: process.env.WS_NOTIFS_URL, verboseName: 'notifsConnection',
      },
      {
        name: 'wsChat', url: process.env.WS_CHAT_URL, verboseName: 'chatConnection',
      },
    ],
    async initConnection(_connection) {
      const connection = new Connection(_connection.url, _connection.name);
      connection.onConnect = () => {
        store.commit('data/updateConnectionsStatus', { name: _connection.verboseName, value: true });
      };
      connection.onDisconnect = () => {
        store.commit('data/updateConnectionsStatus', { name: _connection.verboseName, value: false });
      };
      connection.onError = () => {
        store.commit('data/updateConnectionsStatus', { name: _connection.verboseName, value: false });
      };
      this.availableConnections.push(connection);
      inject(_connection.name, connection);
    },
    async start() {
      return Promise.all(this.connections.map((item) => this.initConnection(item)));
    },
    async connect(token) {
      return Promise.all(this.availableConnections.map((item) => item.connect(token)));
    },
    async disconnect() {
      return Promise.all(this.connections.map((item) => item.disconnect()));
    },
  };
  await connectionManager.start();
  inject('connectionManager', connectionManager);
};
