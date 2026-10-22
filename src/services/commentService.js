import {
  getAll,
  getById,
  create,
  update,
  remove,
} from '../repositories/commentRepo.js';

export async function getAllComments(options) {
  return getAll(options);
}

export async function getCommentById(id) {
  const comment = await getById(id);
  if (comment) return comment;
  else {
    const error = new Error(`Comment ${id} not found`);
    error.status = 404;
    throw error;
  }
}

export async function createComment(data) {
const newComment = await create(data);
  if (newComment) return newComment;
  else {
    const error = new Error(`Cannot create comment: referenced post with id ${data.postId} does not exist`);
    error.status = 404;
    throw error;
  }  
}

export async function updateComment(id, data) {
  const updatedComment = await update(id, data);
  if (updatedComment) return updatedComment;
  else {
    const error = new Error(`Comment ${id} is not here, you should know that by now`);
    error.status = 404;
    throw error;
  }
}

export async function deleteComment(id) {
  const result = await remove(id);
  if (result) return;
  else {
    const error = new Error(`You can not delete comment ${id} because comment ${id} does not exist`);
    error.status = 404;
    throw error;
  }
}
