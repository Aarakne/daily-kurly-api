module 'libType' {
  type status = 200 | 201 | 400 | 401 | 403 | 404 | 409 | 500

  type statusMsg =
    | 'success'
    | 'created'
    | 'bad request'
    | 'unauthorized'
    | 'forbidden'
    | 'not found'
    | 'data redundancy'
    | 'server error'
}
