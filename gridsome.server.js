// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`
const Airtable = require('airtable');

module.exports = function (api) {
    api.loadSource(async actions => {

        const addCollection = actions.addCollection || actions.addContentType
        const tags = actions.addCollection('Tag')

        const base = new Airtable({apiKey: process.env.AIRTABLE_API_KE}).base(process.env.AIRTABLE_BASE_ID)
        const collection = addCollection({
            camelCasedFieldNames: true,
            typeName: 'Item',
        })

        // makes all ids in the `tags` field reference a `Tag`
        collection.addReference('tags', 'Tag')

        let tagCache = {};

        await base(process.env.AIRTABLE_TABLE_NAME)
            .select({})
            .eachPage((records, fetchNextPage) => {
                records.forEach((record) => {
                    const item = record._rawJson

                    collection.addNode({
                        id: item.id,
                        ...item.fields
                    });

                    if (item.fields.Tags !== '') {
                        //item.fields.Tags.split(',').forEach(tag => console.log(tag));

                        item.fields.Tags.split(',').forEach(tag => {
                            const cacheKey = `Tag-tags-${tag}`

                            if (!tagCache[cacheKey] && tag) {
                                tagCache[cacheKey] = true
                                tags.addNode({id: tag, name: tag})
                            }
                        })
                    }


                })
                fetchNextPage()
            })
    })

    api.createPages(({createPage}) => {
        // Use the Pages API here: https://gridsome.org/docs/pages-api/
    })
}
