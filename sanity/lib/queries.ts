import { defineQuery } from 'next-sanity';

export const STARTUP_QUERY =
    defineQuery(`*[_type =='startup' && defined(slug.current)] | order(_createAt desc)
    {
  _id, _createAt, author ->{_id, name,image,bio}, pitch, description, category, image, views
    }`);
