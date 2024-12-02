import { StoryRepository } from "../repositories/story.repository";
import { StoryInput } from "../types/story.type";


const storyRepository = new StoryRepository();

export const resolvers = {
    Query: {
        getStories: async () => {
            return await storyRepository.find()
        },
        getStory: async (_: any,{ id }: { id: string }) => {
            return await storyRepository.findById(id);
        },
    },
    Mutation: {
        createStory: async (_: any,{ input }: { input: StoryInput }) => {
            return await storyRepository.create(input);
        },
        updateStory: async (_: any,{ id, input }: { id: string; input: StoryInput }) => {
            return await storyRepository.update(id,input);
        },
        deleteStory: async (_: any,{ id }: { id: string }) => {
            await storyRepository.delete(id);
            return id;
        },
    },
};