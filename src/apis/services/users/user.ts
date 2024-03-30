import type { UserResponse } from '@/types'
import { createdUsers } from '.'
export const getUser = async (id: string) =>
  new Promise((resolve, reject) => {
    const user = createdUsers.find((user) => user._id === id)
    if (!user) {
      return setTimeout(() => reject(new Error('User not found')), 300)
    }
    const response: UserResponse = {
      data: user
    }

    setTimeout(() => resolve(response), 300)
  })
