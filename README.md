In this module, you are provided with starter code for a simple Blog API where posts and comments were originally stored in in-memory arrays.

Following the module demo videos, you have already refactored the Posts endpoints to persist data using PostgreSQL and Prisma ORM. Your task for this assignment is to refactor the Comments endpoints using the exact same layered database persistence pattern.
NOTE: Do NOT alter or bypass the established 3-tier layered structure in the starter code. Your submission will be evaluated using both Integration Tests (testing end-to-end endpoint functionality) and Unit Tests (verifying that you preserved the original Controller -> Service -> Repository separation of concerns).
1. Refactor the Comments API

You will refactor the following 5 endpoints to use Prisma ORM:
GET /api/comments

GET /api/comments/:id

POST /api/comments

PUT /api/comments/:id

DELETE /api/comments/:id

When creating a new comment, every comment must reference a valid postId that exists in the posts table. Prisma automatically enforces foreign key constraints for us. If a request sends a postId that does not exist in the posts table, Prisma will throw an error with code P2003.
To preserve our layered architecture contract, handle this error as follows:

Repository Layer (commentRepo.js):
Wrap your prisma.comment.create() call in a try...catch block.
In the catch block, check if error.code === 'P2003'.

If error.code === 'P2003': return null

Otherwise, re-throw the original error

Service Layer (commentService.js):
Check the result from commentRepo.create().
If the repository returns `null` (indicating foreign key failure), throw a new Error with a status property of 400 and the exact message:

Cannot create comment: referenced post with id <postId> does not exist
Your centralized error handler in server.js will automatically intercept this error and return our standardized API response format:

{ "errors": [ "Cannot create comment: referenced post with id 11 does not exist" ] }
2. Test Endpoints

Use Postman to check success cases and failures. 

Ensure proper HTTP status codes and clear data/error messages.
