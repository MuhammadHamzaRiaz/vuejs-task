import type { GetUserBody, User } from '@/types'
import { faker } from '@faker-js/faker'
export let createdUsers: User[] = []
export const getUsers = (getUserBody: GetUserBody) =>
  new Promise((resolve) => {
    function createRandomUser() {
      const firstName = faker.person.firstName()
      const lastName = faker.person.lastName()
      return {
        _id: faker.string.uuid(),
        avatar: faker.image.avatar(),
        email: faker.internet.email({ firstName, lastName }),
        firstName,
        lastName
      }
    }
    if (createdUsers.length == 0) {
      createdUsers = Array.from({ length: 100 }, createRandomUser)
    }
    const paginatedUsers = createdUsers.slice(
      (getUserBody.page - 1) * getUserBody.per_page,
      getUserBody.page * getUserBody.per_page
    )

    const response = {
      page: getUserBody.page,
      per_page: getUserBody.per_page,
      total: createdUsers.length,
      total_pages: Math.ceil(createdUsers.length / getUserBody.per_page),
      data: paginatedUsers
    }
    setTimeout(() => resolve(response), 300)
  })

export const deleteUser = async (reqBody: User) => {
  return new Promise((resolve, reject) => {
    const user = createdUsers.find((user) => user._id === reqBody._id)
    if (!user) reject({ message: 'User not found' })
    createdUsers = createdUsers.filter((user) => user._id !== reqBody._id)
    const response = {
      data: {
        status: 'success'
      }
    }
    return resolve(response)
  })
}
