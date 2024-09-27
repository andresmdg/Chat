// babel.config.js
export default {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current'
        },
        modules: false // Asegúrate de que esto esté configurado en false
      }
    ]
  ]
}
