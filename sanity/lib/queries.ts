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

export const AUTHOR_BY_GITHUB_ID_QUERY =
    defineQuery(`*[_type =='author' && id==$id][0]
    {
  _id, id, name, username, email, bio, image
    }`);

export const AUTHOR_BY_ID_QUERY =
    defineQuery(`*[_type =='author' && _id==$id][0]
    {
  _id, id, name, username, email, bio, image
    }`);

export const STARTUP_BY_AUTHOR_QUERY =
    defineQuery(`*[_type =='startup' && author._ref == $id ]  | order(_createdAt desc)
    {
  _id, _createdAt, author->{_id, name,image,bio}, description, category, image, title, views, slug
    }`);
