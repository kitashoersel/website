export function GET() {
  return new Response(
    `
    <?xml version="1.0" encoding="UTF-8" ?>
    <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
      <channel>
        <atom:link href="http://wwww.davidwparker.com/rss" rel="self" type="application/rss+xml" />
        <title>David W Parker</title>
        <link>https://www.davidwparker.com</link>
        <description>David W Parker's blog about Code, Entrepreneurship, and more</description>

        <item>
          <title>RSS Tutorial</title>
          <link>https://www.w3schools.com/xml/xml_rss.asp</link>
          <description>New RSS tutorial on W3Schools</description>
        </item>
      </channel>
    </rss>`.trim(),
    {
      headers: {
        'Cache-Control': `max-age=0, s-max-age=${3600}`,
        'Content-Type': 'application/xml',
      },
    }
  );
}
