import { eq } from "drizzle-orm";
import { db } from "../database/db";
import { stories } from "../database/schema";
import { Story, StoryInput } from "../types/story.type";

export class StoryRepository {

    async find(): Promise<Story[]> {
        return await db.select().from(stories);
    }

    async findById(id: string): Promise<Story | null> {
        const storyResult = await db.select().from(stories).where(eq(stories.id,id));
        return storyResult.length ? storyResult[0] : null;
    }

    async create(input: StoryInput): Promise<Story | null> {
        const createStoryResult = await db.insert(stories)
        .values(input).returning();
        return createStoryResult.length ? createStoryResult[0] : null;
    }

    async update(id: string, input: StoryInput): Promise<Story | null> {
        const updatedStoryResult = await db.update(stories)
        .set({title:input.title, body: input.body})
        .where(eq(stories.id,id))
        .returning();
        return updatedStoryResult.length ? updatedStoryResult[0] : null;
    }

    async delete(id: string): Promise<Story | null> {
        const deletedStory = await db.delete(stories)
        .where(eq(stories.id, id))
        .returning();
        return deletedStory.length ? deletedStory[0] : null;
    }
}