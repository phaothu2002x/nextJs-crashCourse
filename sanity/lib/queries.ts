import { defineQuery } from 'next-sanity';

export const STARTUP_QUERY =
    defineQuery(`*[_type =='startup' && defined(slug.current) && (!defined($search) || title match $search || category match $search || author->name match $search)] | order(_createdAt desc)
    {
  _id, _createdAt, author->{_id, name,image,bio}, description, category, image, title, views, slug
    }`);

export const STARTUP_QUERY_BY_ID =
    defineQuery(`*[_type =='startup' && _id==$id][0]
    {
  _id, _createdAt, author->{_id, name,username,image,bio}, description, category, image, title, views, slug, pitch
    }`);

export const STARTUP_VIEWS_QUERY =
    defineQuery(`*[_type =='startup' && _id==$id][0]
    {
  _id, views 
    }`);
