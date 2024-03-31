const urls = {
  invoices: {
    getPaymentUrlYookassa: 'yookassa/payments',
    getYookassaPaymentStatus: (orderId: string) => `invoices/status/${orderId}`,
  },
  location: (locationToken?: string) =>
    `https://api.geoapify.com/v1/ipinfo?&apiKey=${locationToken}`,
  user: {
    getUserById: (userId: number) => `users/${userId}/payer`,
    postUser: '/user',
    postUsers: '/users',
    signIn: '/sign_in_user',
    signUp: '/sign_up_user',
  },
};

export default urls;
