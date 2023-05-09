import Axios from 'axios'

const instance = Axios.create({})

export const request = instance.request
