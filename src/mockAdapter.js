import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import transferData from '@/mocks/transferData'
import news from '@/mocks/news'
import petsTable from '@/mocks/petsMock'
import info from '@/mocks/helpData'

const mock = new MockAdapter(axios, { delayResponse: 500 })
mock
  .onGet('/transfer').reply(200, transferData)
  .onGet('/pets').reply(200, petsTable)
  .onGet(/\/pets\/\d+/).reply(200, petsTable)
  .onGet('/news').reply(200, news)
  .onGet(/\/news\/\d+/).reply(200, news)
  .onGet('/help-info').reply(200, info)

export default {mock}
