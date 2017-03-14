import Transfer from '@/components/Transfer'

export default {
  routes: [
    {
      path: '/transfer',
      name: 'transfer',
      component: Transfer
    },
    {
      path: '/',
      name: 'home',
      component: {
        template: '<router-link to="/transfer">Kliknij tutaj, aby wyświetlić dane do przelewu</router-link>'
      }
    }
  ]
}
