// user-utils.ts
export function generateUniqueUserId() {
    const timestamp = new Date().getTime();
    const random = Math.floor(Math.random() * 1000);
    const userId = `${timestamp}${random}`;
    return userId;
  }
  