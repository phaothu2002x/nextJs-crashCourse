import { formateDate } from '@/lib/utils';
import { client } from '@/sanity/lib/client';
import {
    PLAYLIST_BY_SLUG_QUERY,
    STARTUP_QUERY_BY_ID,
} from '@/sanity/lib/queries';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React, { Suspense } from 'react';

import markdownit from 'markdown-it';
import { Skeleton } from '@/components/ui/skeleton';
import View from '@/components/View';
import StartupCard, { StartupCardType } from '@/components/StartupCard';

const md = markdownit();
export const experimental_ppr = true;

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
    const id = (await params).id;

    // parallel fetching
    const [post, { select: editorPosts }] = await Promise.all([
        client.fetch(STARTUP_QUERY_BY_ID, { id }), // Fetching startup by ID
        client.fetch(PLAYLIST_BY_SLUG_QUERY, {
            slug: 'ediors-pick',
        }),
    ]);

    // If you want to fetch the post individually(in Sequence), you can uncomment the following lines
    // const post = await client.fetch(STARTUP_QUERY_BY_ID, { id });
    // const { select: editorPosts } = await client.fetch(PLAYLIST_BY_SLUG_QUERY, {
    //     slug: 'ediors-pick',
    // });

    if (!post) return notFound();

    const parsedContent = md.render(post?.pitch || '');

    return (
        <>
            <section className="pink_container  !min-h-[230px]">
                <p className="tag">{formateDate(post?._createdAt)}</p>
                <h1 className="heading">{post.title}</h1>
                <p className="sub-heading !max-w-5xl">{post.description}</p>
            </section>

            <section className="section_container">
                <img
                    src={post.image}
                    alt="thumbnail"
                    className="w-full h-auto rounded-xl"
                />

                <div className="space-y-5 mt-10 max-w-4xl mx-auto">
                    <div className="flex-between gap-5">
                        <Link
                            href={`/user/${post.author?._id}`}
                            className="flex items-center gap-2 mb-3"
                        >
                            <div className="relative h-16 w-16">
                                {/* Container must have position: relative */}

                                <Image
                                    src={post.author.image}
                                    alt="avatar"
                                    fill
                                    className="rounded-full drop-shadow-lg object-cover"
                                />
                            </div>

                            <div>
                                <p className="text-20-medium">
                                    {post.author.name}
                                </p>

                                <p className="text-16-medium !text-black-300">
                                    @{post.author.username}
                                </p>
                            </div>
                        </Link>

                        <div className="category-tag">{post.category}</div>
                    </div>

                    <h3 className="text-30-bold">Pitch Details</h3>
                    {parsedContent ? (
                        <article
                            className="prose max-w-4xl font-sans break-all"
                            dangerouslySetInnerHTML={{ __html: parsedContent }}
                        />
                    ) : (
                        <p className="no-result">No pitch detail provided.</p>
                    )}
                </div>
                <div className="divider"></div>
                {/* editor selected startups */}
                {editorPosts && editorPosts.length > 0 && (
                    <div className="mx-auto max-w-4xl">
                        <p className="text-30-sm">Editors Pick</p>
                        <ul className="mt-7 card_grid-sm ">
                            {editorPosts.map(
                                (post: StartupCardType, index: number) => (
                                    <StartupCard key={index} post={post} />
                                )
                            )}
                        </ul>
                    </div>
                )}

                <Suspense fallback={<Skeleton className="view_skeleton" />}>
                    <View id={id} />
                </Suspense>
            </section>
        </>
    );
};
export default page;
