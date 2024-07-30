import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { Hono } from "hono";
import { verify } from "hono/jwt";
import { createBlogInput, updateBlogInput } from "@jayanth_222/medium-common"

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    },
    Variables: {
        userId: string;
    }
}>()



blogRouter.use('/*', async (c, next) => {
    const authHeader = c.req.header('authorization') || "";
    if (!authHeader) {
        c.status(401);
        return c.json({ error: "unauthorized" });
    }
    const token = authHeader.split(' ')[1];
    const user = await verify(token, c.env.JWT_SECRET);
    if (!user) {
        c.status(401);
        return c.json({ error: "unauthorized" });
    }
    c.set("userId", String(user.id));
    await next();
})



blogRouter.post('/post', async (c) => {
    const body = await c.req.json();
    const { success } = createBlogInput.safeParse(body);
    if (!success) {
        c.status(411);
        return c.json({ error: "incorrect inputs" });
    }
    const userId = c.get("userId");
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try {
        const blog = await prisma.post.create({
            data: {
                title: body.title,
                content: body.content,
                authorId: userId
            }
        })
        return c.json({
            id: blog.id
        })
    }
    catch (e) {
        c.status(403);
        return c.json({ error: "error while posting" })
    }
})

blogRouter.put('/put', async (c) => {
    const body = await c.req.json();
    const { success } = updateBlogInput.safeParse(body);
    if (!success) {
        c.status(411);
        return c.json({ error: "incorrect inputs" });
    }
    const userId = c.get("userId");
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try {
        const blog = await prisma.post.update({
            where: {
                id: body.id,
                authorId: userId
            },
            data: {
                title: body.title,
                content: body.content
            }
        })
        return c.json({
            id: blog.id
        })
    }
    catch (e) {
        c.status(403);
        return c.json({ error: "error while updating" })
    }
})



blogRouter.get('/bulk', async (c) => {
    console.log("inside backend route");
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    try {
        const blogs = await prisma.post.findMany({
            select: {
                content: true,
                title: true,
                id: true,
                author: {
                    select: {
                        name: true
                    }
                }
            }
        });
        return c.json({
            blogs
        })
    } catch (e) {
        c.status(403);
        return c.json({ error: "error while fetching all" })
    }
})

blogRouter.get('/:id', async (c) => {
    const id = c.req.param("id")
    console.log(id);
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try {
        const blog = await prisma.post.findFirst({
            where: {
                id
            },
            select: {
                id: true,
                title: true,
                content: true,
                author: {
                    select: {
                        name: true,
                    }
                }
            }
        })
        return c.json({
            blog
        })
    }
    catch (e) {
        c.status(403);
        return c.json({ error: "error while fetching" })
    }
})