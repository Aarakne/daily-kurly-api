export const SALT_ROUND = 10

export const PASSWORD_REGEX = new RegExp(
  '^(?=.*?[A-Za-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,20}$'
)

export const REASON = {
  DUPLICATED_ID: 'duplicated ID',
  INVALID_PASSWORD: 'password is invalid',
  MULTIPLE_USERS: 'multiple users',
  USERNAME_NOT_MATCHED: 'username does not match',
  PASSWORD_NOT_MATCHED: 'password does not match',
}
