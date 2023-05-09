class BaseResponse {
  constructor(public data: any, public message: string) {
    this.data = data
    this.message = message
  }
}

export class SuccessResponse extends BaseResponse {
  code: number
  constructor(data: any, message: string) {
    super(data, message)

    this.code = 0
  }

  setDataField(field: string, value: any) {
    this.data[field] = value
  }
}

export class ErrorResponse extends BaseResponse {
  code: number
  constructor(message: string) {
    super(null, message)

    this.code = -1
  }
}
