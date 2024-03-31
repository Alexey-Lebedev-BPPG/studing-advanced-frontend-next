// хелпер, который проводит строку в KebabCase
module.exports = str =>
  `${str}`
    .replace(/[A-Z]/g, substr => ` ${substr}`)
    .toLowerCase()
    .replace(/[-_]+/g, ' ')
    .replace(/[^\w\s]/g, '')
    .replace(/\s+(.)(\w*)/g, ($1, $2, $3) => `${$2.toLowerCase() + $3}`)
    .replace(/\w/, s => s.toLowerCase());
