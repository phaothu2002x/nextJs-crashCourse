import StartupCard from '@/components/StartupCard';
import SearchForm from '../../components/SearchForm';

export default async function Home({
    searchParams,
}: {
    SearchParams: Promise<{ query?: string }>;
}) {
    const query = (await searchParams).query;

    const posts = [
        {
            _createAt: new Date(),
            views: 55,
            author: { _id: 1, name: 'Alex' },
            _id: 1,
            description: 'Welcome to my post ',
            image: 'https://plus.unsplash.com/premium_photo-1746718185468-86c85c1f431e?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            category: 'LifeStytle',
            title: 'WorkLife balance',
        },
    ];

    return (
        <>
            <section className="pink_container">
                <h1 className="text-2xl heading">
                    Pitch your startup <br />
                    Connect with entreprenuers
                </h1>
                <p className="sub-heading !max-w-3xl">
                    Submit Ideas, Vote on Pitches, and Get Noticed in Virtual
                    Competitions
                </p>

                <SearchForm query={query} />
            </section>
            <section className="section_container">
                <p className="text-30-semibold">
                    {query ? `Search results for "${query}" ` : 'All Startup'}
                </p>
                <ul className="mt-7 card_grid">
                    {posts?.length > 0 ? (
                        posts.map((post: StartupCardType, number) => (
                            <StartupCard key={post._id} post={post} />
                        ))
                    ) : (
                        <p className="no-result">No startups found</p>
                    )}
                </ul>
            </section>
        </>
    );
}
