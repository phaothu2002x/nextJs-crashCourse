import SearchForm from '../../components/SearchForm';

export default async function Home({
    searchParams,
}: {
    SearchParams: Promise<{ query?: string }>;
}) {
    const query = (await searchParams).query;
    return (
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
    );
}
