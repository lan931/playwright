import { test, expect } from '@playwright/test';
test.use({
    baseURL: 'https://jsonplaceholder.typicode.com',
    extraHTTPHeaders: {
        'Accept': 'application/json',
    }
});

test('GET /posts returns a list of posts', async ({ request }) => {
    const response = await request.get('/posts');
    expect(response.status()).toBe(200);
    expect(Array.isArray(await response.json())).toBe(true);
});
test('GET /posts/1 returns a single post', async ({ request }) => {
    const response = await request.get('/posts/1');
    const body = await response.json()
    expect(body).toHaveProperty('id');
    expect(body).toHaveProperty('title');
    expect(body).toHaveProperty('userId');
});
test('POST /posts creates a new post', async ({ request }) => {
    const newPost = {
        title: 'foo',
        body: 'bar',
        userId: 1
    };
    const response = await request.post('/posts', { data: newPost });
    expect(response.status()).toBe(201);
    const body = await response.json();
    expect(body).toHaveProperty('id');
    expect(body).toHaveProperty('title');
    expect(body).toHaveProperty('body');
    expect(body).toHaveProperty('userId');
});
test('GET /posts/200 returns 404 for non-existent post', async ({ request }) => {
    const response = await request.get('/posts/200');
    expect(response.status()).toBe(404);
});