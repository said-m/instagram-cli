

export const URL_REGEXP = {
  instagram: {
    host: /(https?:\/\/)?(www\.)?(instagram.com)/,
    key: /([a-zA-Z0-9_-]{11,})/,
    get beforeKey(): RegExp {
      return new RegExp(this.host.source + '(/p/)');
    },
    get full(): RegExp {
      return new RegExp(this.beforeKey.source + this.key.source);
    },
  },
}
