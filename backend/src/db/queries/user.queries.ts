import { eq } from 'drizzle-orm';
import { db } from '../index';
import { users, type NewUser, type UpdateUser } from '../schema';

export const userQueries = {
  findAll: () => db.select().from(users),

  findById: async (id: string) => {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  },

  findByEmail: async (email: string) => {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user;
  },

  findWithRelations: (id: string) =>
    db.query.users.findFirst({
      where: eq(users.id, id),
      with: {
        posts: true,
        comments: true,
        followers: true,
        following: true,
        blockedUsers: true,
        blockedBy: true,
        profileViews: true,
        viewedProfiles: true,
        likes: true,
        dislikes: true,
        postViews: true,
      },
    }),

  create: async (data: NewUser) => {
    const [user] = await db.insert(users).values(data).returning();
    return user;
  },

  update: async (id: string, data: UpdateUser) => {
    const [user] = await db.update(users).set(data).where(eq(users.id, id)).returning();
    return user;
  },

  delete: async (id: string) => {
    const [user] = await db.delete(users).where(eq(users.id, id)).returning();
    return user;
  },
};
