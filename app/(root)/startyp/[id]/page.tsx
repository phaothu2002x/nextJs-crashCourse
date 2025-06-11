import { formateDate } from '@/lib/utils';
import { client } from '@/sanity/lib/client';
import { STARTUP_QUERY_BY_ID } from '@/sanity/lib/queries';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React from 'react';
export const experimental_ppr = true;
const page = async ({ params }: { params: Promise<{ id: string }> }) => {
    const id = (await params).id;
    const post = await client.fetch(STARTUP_QUERY_BY_ID, { id });
    if (!post) return notFound();
    return <></>;
};
export default page;
