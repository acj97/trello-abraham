<template>
    <div style="display:flex;overflow-x:auto;height:100%;">
      <div class="mt-3">
        <draggable :list="items" tag="v-layout" ghost-class="ghost" v-bind="dragOptions" @start="drag = true" @end="drag = false">
            <v-flex v-for="item in items" :key="item.id" pa-3>
              <List class="ml-3" style="width:275px;cursor:pointer;" :dataProps="item.title"/>
            </v-flex>
        </draggable>
      </div>
      <v-flex class="mt-3">
        <v-card class="ml-3" style="width:275px;background:none;">
          <v-list-item three-line>
            <v-list-item-content>
              <v-text-field v-model="list" name="list" class="" placeholder="Add another list" solo>
              </v-text-field>
              <v-btn class="btn bg-yellow" @click="add" style="height:50px;padding:0px;">
                Add
              </v-btn>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-flex>
    </div>
</template>

<script>
import draggable from "vuedraggable";
import List from './List';
import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import Firebase from 'firebase';

let config = {
  apiKey: "AIzaSyAqvRb6j2h1FNYGL4jXhUCrKYydjXT9728",
  authDomain: "abraham-trello.firebaseapp.com",
  databaseURL: "https://abraham-trello.firebaseio.com",
  projectId: "abraham-trello",
  storageBucket: "abraham-trello.appspot.com",
  messagingSenderId: "616251895759"
};
  
let app = Firebase.initializeApp(config);
let db = app.database();
let listRef = db.ref('list');
let id = 3;
Vue.use(Vuetify);
export default {
  name: "functional",
  display: "Functional third party",
  order: 17,
  Firebase: {
    lists: listRef
  },
  components: {
    List,
    draggable
  },
  data() {
    return {
      enabled: true,
      list: "",
      drag: false,
      items: [
        {
          id: 0,
          title: {title: "item 1"}
        },
        {
          id: 1,
          title: {title: "item 2"}
        },
        {
          id: 2,
          title: {title: "item 3"}
        }
      ]
    };
  },
  methods: {
    // debug (event) {
    //   console.log(event.target.name)
    // },
    add: function() {
      if(this.list != "") {
        this.items.push({ id: id++,title: {title: this.list}});
        this.list = "";
      }
    }
  },
  computed: {
    dragOptions() {
      return {
        animation: 200,
        group: "description",
        disabled: false,
        ghostClass: "ghost"
      };
    }
  }
};
</script>
<style scoped>
  .bg-yellow {
    background: #feda6a !important;
  }
  .ghost {
    opacity: 0.75;
  }
</style>