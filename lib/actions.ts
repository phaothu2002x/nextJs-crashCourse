'use server';

import { auth } from '@/auth';
import { parseServerActionResponse } from './utils';
import slugify from 'slugify';
import { writeClient } from '@/sanity/lib/write-client';
export const createPitch = async (
    state: any,
    form: FormData,
    pitch: string
) => {
    // check user exist
    const session = await auth();
    if (!session)
        return parseServerActionResponse({
            error: 'Not logged in',
            status: 'ERROR',
        });

    const { title, description, category, link } = Object.fromEntries(
        Array.from(form).filter(([key]) => key !== 'pitch')
    );

    // create slug from title
    const slug = slugify(title as string, { lower: true, strict: true });
    try {
        const startup = {
            title,
            description,
            category,
            image: link,
            slug: {
                _type: slug,
                current: slug,
            },
            author: {
                _type: 'reference',
                _ref: session?.id,
            },
            pitch,
        };

        const result = await writeClient.create({
            _type: 'startup',
            ...startup,
        });

        return parseServerActionResponse({
            ...result,
            error: '',
            status: 'success ',
        });
    } catch (error) {
        console.log(error);
        return parseServerActionResponse({
            error: JSON.stringify(error),
            status: 'ERROR',
        });
    }
};
