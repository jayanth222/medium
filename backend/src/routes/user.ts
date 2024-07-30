import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign, verify } from 'hono/jwt'
import { signinInput, signupInput } from "@jayanth_222/medium-common"


export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    },
    Variables: {
        userId: string;
    }
}>();


userRouter.post('/signup', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const body = await c.req.json();
    const { success } = signupInput.safeParse(body);
    if (!success) {
        c.status(411);
        return c.json({ error: "incorrect inputs" });
    }
    try {
        const user = await prisma.user.create({
            data: {
                email: body.email,
                password: body.password,
                name: body.name
            }
        })
        const jwt = await sign(
            { id: user.id },
            c.env.JWT_SECRET
        )
        return c.json({ jwt })
    } catch (e) {
        c.status(403);
        return c.json({ error: "error while signing up" });
    }
})

userRouter.post('/signin', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())
    const body = await c.req.json();
    const { success } = signinInput.safeParse(body);
    if (!success) {
        c.status(411);
        return c.json({ error: "incorrect inputs" });
    }
    try {
        const user = await prisma.user.findUnique({
            where: {
                email: body.email
            }
        })
        if (!user) {
            c.status(403);
            return c.json({ error: "user not found" });
        }
        const jwt = await sign(
            { id: user.id },
            c.env.JWT_SECRET
        )
        return c.json({ jwt })
    } catch (e) {
        c.status(403);
        return c.json({ error: "error while signing in" });
    }
})


userRouter.get('/allusers', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());
    try {
        const user = await prisma.user.findMany();
        return c.json(user);
    } catch (e) {
        c.status(403);
        return c.json({ error: "error while getting" });
    }
})

userRouter.use('/*', async (c, next) => {
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
userRouter.get('/details', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());
    const userId = c.get("userId")
    console.log(userId);
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }, select: {
                name: true,
                email: true
            }
        })
        if (!user) {
            c.status(403);
            return c.json({ error: "No user found" })
        }
        return c.json({ username: user.name, email: user.email })
    } catch (e) {
        c.status(403);
        return c.json({ error: "cannot able to get details" })
    }
})
