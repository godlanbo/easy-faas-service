export interface IBaseServiceResponse {
  code: number
  message: string
}

export interface IUserServiceResponse extends IBaseServiceResponse {
  data: {
    username: string // 'godlanbo1'
    _id: string // '645762b0951f1c7741d86776'
    createdAt: string // '2023-05-07T08:34:56.044Z'
    updatedAt: string // '2023-05-07T08:34:56.044Z'
  }
}

export interface ICreateFaasServiceResponse extends IBaseServiceResponse {
  data: {
    _id: string // '645762b0951f1c7741d86776'
    createdAt: string // '2023-05-07T08:34:56.044Z'
    updatedAt: string // '2023-05-07T08:34:56.044Z'
  }
}

interface IFaasInstance {
  _id: string // '645762b0951f1c7741d86776'
  createdAt: string // '2023-05-07T08:34:56.044Z'
  updatedAt: string // '2023-05-07T08:34:56.044Z'
  faasName: string
  owner: string
}

export interface IGetFaasInfoByIdServiceResponse extends IBaseServiceResponse {
  data: IFaasInstance
}

export interface IFaasListServiceResponse extends IBaseServiceResponse {
  data: IFaasInstance[]
}
