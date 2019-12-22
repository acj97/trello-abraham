<template>
  <div class="row">
    <v-card class="bg-yellow" v-for="item in dataProps" :key="item.id">
      <v-list-item three-line>
        <v-list-item-content>
          <v-list-item-title class="headline mb-1" @click="listClick(item)">
            <div class="field">
              <span class="field-value" v-show="!showField('name')" @click="focusField('name')">{{item}}</span>
              <v-text-field v-model="listName" v-show="showField('name')" type="text" class="field-value form-control" @focus="focusField('name')" @blur="blurField" @keydown.enter="saveField"></v-text-field>
            </div>
          </v-list-item-title>
          <draggable :list="list" class="list-group" draggable=".item" group="a" ghost-class="ghost" v-bind="dragOptions" @start="drag = true" @end="drag = false">
            <transition-group type="transition" :name="!drag ? 'flip-list' : null">
              <v-list-item-subtitle class="list-group-item item" v-for="(element,index) in list" :key="element.id">
                <v-dialog max-width="600px" v-model="dialog">
                  <template v-slot:activator="{ on }">
                    <v-card outlined class="mt-2 pa-2" v-on="on" @click="cardClick(element.name)">{{ element.name }}</v-card>
                  </template>
                  <v-card>
                    <v-card-title>
                      <span class="headline">Edit Card</span>
                    </v-card-title>
                    <v-card-text>
                      <v-form class="px-3">
                        <v-text-field name="editCard" label="Card Name" v-model="cardName">
                        </v-text-field>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn color="black" class="bg-yellow" text @click="saveCard(index);dialog=false;">Save</v-btn>
                        </v-card-actions>
                      </v-form>
                    </v-card-text>
                  </v-card>
                </v-dialog>
              </v-list-item-subtitle>
            </transition-group>
          </draggable>
        </v-list-item-content>
      </v-list-item>
       <v-container>
        <v-text-field v-model="card" name="card" placeholder="Add another card" solo>
          <template v-slot:append>
              <v-btn depressed class="btn ma-0" @click="add">
                Add
              </v-btn>
          </template>
        </v-text-field>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import draggable from "vuedraggable";
let id = 0;
export default {
  name: "trello",
  display: "Trello",
  components: {
    draggable
  },
  props:['dataProps'],
  data() {
    return {
      card: "",
      listName: "",
      cardName: "",
      drag: false,
      dialog: false,
      list: [
        // { name: "John 1", id: 0 },
        // { name: "John 2", id: 1 },
        // { name: "John 3", id: 2 }
      ],
      editField: ""
    };
  },
  methods: {
    add: function() {
      if(this.card != "") {
        this.list.push({ name: this.card, id: id++ });
        this.card = "";
      }
      
    },
    listClick: function(name) {
      this.listName = name;
    },
    cardClick: function(name) {
      this.cardName = name;
    },
    saveCard: function(index) {
      this.list[index].name = this.cardName;
    },
    focusField: function(name) {
      this.editField = name;
    },
    blurField: function() {
      this.dataProps.title = this.listName;
      this.editField = '';
    },
    showField: function(name) {
      return (this.listName  == name || this.editField == name)
    },
    saveField: function() {
      this.dataProps.title = this.listName;
      this.editField = '';
    }
  },
  computed: {
    dragOptions() {
      return {
        animation: 200,
        group: "list",
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
  .btn {
    background: #393f4d !important;
    color: white !important;
  }
  .ghost {
    opacity: 0.75;
  }
</style>
