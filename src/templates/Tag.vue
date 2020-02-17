<template>
    <Layout>
        <div class="flex flex-wrap -mx-2">
            <div class="w-full lg:w-4/5 px-2">
                <h1 v-html="$page.tag.name" />
            </div>
            <div class="w-full lg:w-1/5 px-2 text-sm">

            </div>
        </div>
    </Layout>
</template>

<page-query>
    query ($id: ID!) {
        tag(id: $id) {
            name
        }
    }
</page-query>

<style scoped>
</style>
