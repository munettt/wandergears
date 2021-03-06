<template>
  <Layout>
    <div class="flex flex-wrap -mx-0 md:-mx-2">
      <div class="w-full lg:w-4/5 px-0 md:px-2">
        <g-image src="~/assets/images/main.jpg" class="md:rounded mb-3" />
        <!--<h2 class="text-3xl font-semibold mb-2">Lenses</h2>-->
        <div class="text-gray-800 font-light p-3 md:p-0">
          <p class="mb-3">
            We all wish we could bring all of our best gears with us on our travels to fit every need but that is not the case. Travelling long period of time with many gears will be difficult. Weight and space places a major role when picking what lens to bring with you. Most of the time you have to decide based on your
            <strong>personal shooting style</strong> and the destination you're heading to.
          </p>
          <p
            class="mb-5"
          >Here are a list of recommended travel lenses that I compiled from other photographers and professionals found on the web.</p>
        </div>
        <div class="items-container min-h-screen">
          <div
            class="item"
            :key="card.id"
            v-for="card in lensCard"
            v-show="filterCard($static.allItem.edges, card.name).length"
          >
            <div class="border-b border-gray-100 p-3">
              <h3 class="font-semibold text-gray-500 text-sm uppercase">
                <img class="card-logo" :src="cardLogo(card.logo)" v-if="card.logo !== ''" />
                {{card.logo === '' ? card.name : null }}
              </h3>
            </div>
            <div class="p-3">
              <ul>
                <li
                  class="mb-1"
                  v-for="{node} in filterCard($static.allItem.edges, card.name)"
                  :key="node.id"
                >
                  <a :href="node.link !== '' ? node.link : '#'" class>
                    {{node.name}}
                    <span
                      v-if="node.badge"
                      class="text-center text-xs rounded-sm bg-indigo-400 text-white px-1 ml-1"
                    >{{node.badge}}</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="w-full lg:w-1/5 px-2 text-sm">
        <div class="p-3 rounded bg-gray-100">
          <h3 class="font-bold mb-2">Tags</h3>
          <a href="#" @click.prevent="filterTag(node.name)" class="tag-item" :class="{'active': tagsActive.includes(node.id)}" :key="node.id" v-for="{node} in $static.allTag.edges">#{{node.name}}</a>

          <div class="mt-3" v-show="this.tagsActive.length>0">
              <button  @click="clearFilter()" class="rounded text-xs text-center py-1 px-3 bg-gray-500 uppercase text-white transition-colors duration-150 hover:bg-blue-600">Clear Filter</button>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>
<static-query>
 {
  allItem {
    edges {
      node
      {
        id
        type
        name
        badge
        link
        card
        tags
        {
            name
        }
      }
    }
  }

  allTag {
    edges
    {
      node
      {
        id
        name
      }
    }
  }
}
</static-query>

<script>
import Card from "@/components/Card";

export default {
  components: {
    Card
  },
  data() {
    return {
      lensCard: require("../../data/lenses.json"),
      tagsActive: []
    };
  },
  methods: {
    filterCard(obj, card) {
      card = card.toLowerCase();

      return obj.filter(item => {
            
        const tags = item.node.tags.map(tag => {
            return tag.name;
        });

        const checkTag = this.tagsActive.length > 0 ? this.tagsActive.every(val => tags.indexOf(val) !== -1) : true;

        //console.log(item.node.name, tags, checkTag)

        return item.node.card === card && checkTag;
      });
    },
    filterTag(tag){
       
        let tags = this.getTagsFromQs();

        if ( !tags.includes(tag) ) {
            tags.push(tag)
        }
        else
        {
            tags = tags.filter(e => e !== tag);
        }

        if ( this.$route.query['tags'] !== tags.join(',') ) {
            this.$router.push({ query: {
                'tags': tags.join(',')
            } });
        }
    
        this.tagsActive = tags;
    },
    getTagsFromQs()
    {
        let tags = this.$route.query['tags'] || '';

        return tags === '' ? [] : tags.split(',');
    },
    clearFilter(){
        this.tagsActive=[];
        this.$router.push({ query: {
            'tags': ''
        } });
    },
    cardLogo(logo) {
      return logo !== ""
        ? require("!!assets-loader!~/assets/images/svg/" + logo).src
        : null;
    }
  },
  mounted(){
      this.tagsActive = this.getTagsFromQs();
  },
  metaInfo: {
    title: "Best list of recommended travel lenses & gears"
  }
};
</script>

<style scoped>
.items-container {
  column-gap: 1.5em;
}

.item {
  margin: 0 0 1.5em;
  width: 100%;
  display: inline-block;
  @apply bg-white shadow-sm border;
}

.items-container a {
  transition: color 0.15s;
  @apply text-blue-500;
}

.items-container a:hover {
  @apply text-blue-700;
}

.tag-item {
  @apply text-indigo-700 py-1 px-1 rounded-full mb-2 block transition-all duration-100;
}

.tag-item:hover {
  @apply text-indigo-900;
}

.tag-item.active {
    color: rgb(158, 20, 238);
    font-weight: bold;
}

.card-logo svg {
  fill: #ccc;
}

@media only screen and (min-width: 768px) {
  .items-container {
    column-count: 3;
  }
}

@media only screen and (max-width: 767px) and (min-width: 540px) {
  .items-container {
    column-count: 1;
    padding: 0 1rem;
  }
}
</style>
