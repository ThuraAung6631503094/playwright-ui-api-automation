
const http = require('node:http');
const { randomUUID } = require('node:crypto');

const PORT = 5050;
const tasks = new Map();

// Send JSON responses
function sendJson(res, status, data) {
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8'
  });
  res.end(JSON.stringify(data));
}

// Read JSON request body
async function readBody(req) {
  let raw = '';

  for await (const chunk of req) {
    raw += chunk.toString();

    if (raw.length > 10000) {
      throw new Error('Request body too large');
    }
  }

  return JSON.parse(raw);
}

// Validate task information
function validTitle(title) {
  return (
    typeof title === 'string' &&
    title.trim().length > 0 &&
    title.trim().length <= 100
  );
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, 'http://127.0.0.1');
  const path = url.pathname;

  try {
    // Health check
    if (req.method === 'GET' && path === '/health') {
      return sendJson(res, 200, { status: 'ok' });
    }

    // Get all tasks
    if (req.method === 'GET' && path === '/api/tasks') {
      return sendJson(res, 200, Array.from(tasks.values()));
    }

    // Create a task
    if (req.method === 'POST' && path === '/api/tasks') {
      const data = await readBody(req);

      if (
        !validTitle(data?.title) ||
        (data.completed !== undefined &&
          typeof data.completed !== 'boolean')
      ) {
        return sendJson(res, 400, {
          error: 'Invalid task data'
        });
      }

      const task = {
        id: randomUUID(),
        title: data.title.trim(),
        completed: data.completed ?? false
      };

      tasks.set(task.id, task);
      return sendJson(res, 201, task);
    }

    // Individual task routes
    const match = path.match(/^\/api\/tasks\/([^/]+)$/);

    if (match) {
      const id = match[1];
      const task = tasks.get(id);

      if (!task) {
        return sendJson(res, 404, {
          error: 'Task not found'
        });
      }

      // Read a task
      if (req.method === 'GET') {
        return sendJson(res, 200, task);
      }

      // Update a task
      if (req.method === 'PUT') {
        const data = await readBody(req);

        if (
          !validTitle(data?.title) ||
          typeof data.completed !== 'boolean'
        ) {
          return sendJson(res, 400, {
            error: 'Invalid task data'
          });
        }

        const updated = {
          id,
          title: data.title.trim(),
          completed: data.completed
        };

        tasks.set(id, updated);
        return sendJson(res, 200, updated);
      }

      // Delete a task
      if (req.method === 'DELETE') {
        tasks.delete(id);
        res.writeHead(204);
        return res.end();
      }
    }

    return sendJson(res, 404, {
      error: 'Route not found'
    });
  } catch (error) {
    return sendJson(res, 400, {
      error: 'Invalid JSON or request body'
    });
  }
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`Task API running at http://127.0.0.1:${PORT}`);
});
