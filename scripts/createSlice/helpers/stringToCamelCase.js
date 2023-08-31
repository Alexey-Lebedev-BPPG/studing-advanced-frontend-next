// хелпер, который проводит строку в camelCase
module.exports = str =>
  `${str}`
    .replace(/[A-Z]/g, substr => ` ${substr}`)
    .toLowerCase()
    .replace(/[-_]+/g, ' ')
    .replace(/[^\w\s]/g, '')
    .replace(/\s+(.)(\w*)/g, ($1, $2, $3) => `${$2.toUpperCase() + $3}`)
    .replace(/\w/, s => s.toLowerCase());
