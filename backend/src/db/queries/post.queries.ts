import { eq } from 'drizzle-orm';
import { db } from '../index';
import { posts, type NewPost, type UpdatePost } from '../schema';

export const postQueries = {
  findAll: () => db.select().from(posts),

  findById: async (id: string) => {
    const [post] = await db.select().from(posts).where(eq(posts.id, id));
    return post;
  },

  findByUser: (userId: string) =>
    db.select().from(posts).where(eq(posts.userId, userId)),

  findByCategory: (categoryId: string) =>
    db.select().from(posts).where(eq(posts.categoryId, categoryId)),

  findWithRelations: (id: string) =>
    db.query.posts.findFirst({
      where: eq(posts.id, id),
      with: {
        user: true,
        category: true,
        comments: { with: { user: true } },
        likes: true,
        dislikes: true,
        views: true,
      },
    }),

  create: async (data: NewPost) => {
    const [post] = await db.insert(posts).values(data).returning();
    return post;
  },

  update: async (id: string, data: UpdatePost) => {
    const [post] = await db.update(posts).set(data).where(eq(posts.id, id)).returning();
    return post;
  },

  delete: async (id: string) => {
    const [post] = await db.delete(posts).where(eq(posts.id, id)).returning();
    return post;
  },
};
