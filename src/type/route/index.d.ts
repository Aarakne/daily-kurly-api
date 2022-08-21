declare module 'routeType' {
  type JWTtoken = {
    username: string
  }

  interface imagePromises {
    imageUrls: string[]
    promises: Promise<any>[]
  }
}
