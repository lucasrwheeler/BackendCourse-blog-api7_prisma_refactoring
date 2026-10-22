import prisma from '../config/db.js';

export async function getAll({ postId, search, sortBy, order, offset, limit }) {
 const conditions = {};
 //need to reference postId
 if (postId) {
    conditions.postId = postId;
 }
  if (search) {
    conditions.content = { contains: search, mode: 'insensitive' };
  }
  const comments = await prisma.comment.findMany({
    where: conditions,
    orderBy: { [sortBy]: order },
    skip: offset,
    take: limit,
  });
return comments;
}

export async function getById(id) {
   const comment = await prisma.comment.findUnique({where: { id },});
  return comment;
}

export async function create(data) {
  try {
  const newComment = await prisma.comment.create({
    //different from postRepo.js, need to reference postId.
    data: { content: data.content, postId: data.postId}
  });
  return newComment;
}
  catch (error) {
    if (error.code === 'P2003') {
      return null; // Post not found
    }
    throw error; // Rethrow other errors
  }
}

export async function update(id, updatedData) {
  try{
    const upDatedComment = await prisma.comment.update({
    where: { id },
    data: updatedData,
  });
  return upDatedComment;
}
  catch (error) {
    if (error.code === 'P2025') {
      return null; // Comment not found
    }
    throw error; // Rethrow other errors
  }
}

export async function remove(id) {
  try {
    const deletedComment = await prisma.comment.delete({
      where: { id },
    });
    return deletedComment;
  }
  catch (error) {
    if (error.code === 'P2025') {
      return null; // Comment not found
    }
    throw error; // Rethrow other errors
  }
}
