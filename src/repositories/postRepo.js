import { posts, getNextId } from '../db/posts.js';
import prisma from '../config/db.js';

export async function getAll({ search, sortBy, order, offset, limit }) {
const conditions = {};
  if (search) {
    conditions.OR = [
      { title: { contains: search, mode: 'insensitive' } },
      { content: { contains: search, mode: 'insensitive' } },
    ];
  }
  const posts = await prisma.post.findMany({
    where: conditions,
    orderBy: { [sortBy]: order },
    skip: offset,
    take: limit,
  });
return posts;
}

export async function getById(id) {
  const post = await prisma.post.findUnique({where: { id },});
  return post;
}

export async function create(postData) {
  const newPost = await prisma.post.create({
    data: postData,
  });
  return newPost;
}

export async function update(id, updatedData) {
  try {
    const updatedPost = await prisma.post.update({
    where: { id },
    data: updatedData,
  });
  return updatedPost;
} catch (error) {
  if (error.code === 'P2025') {
    return null; // Post not found
  }
  throw error; // Rethrow other errors
}
}

export async function remove(id) {
  try {
    const deletedPost = await prisma.post.delete({
      where: { id },
    });
    return deletedPost;
  } catch (error) {
    if (error.code === 'P2025') {
      return false; // Post not found
    }
    throw error; // Rethrow other errors
  }
}
