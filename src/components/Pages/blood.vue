  <template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>Blood</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-text-field v-model="blood_search" append-icon="search" label="Search"></v-text-field>
      <!-- New Item Button Box Start -->
      <v-dialog v-model="dialog" max-width="500px">
        <template v-slot:activator="{ on }">
          <v-btn color="primary" dark class="mb-2" v-on="on">New Item</v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-alert type="error" :value="isError">All Fields are required.</v-alert>
            <v-container grid-list-md>
              <v-layout column wrap>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.b_name" label="Blood Type"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.b_description" label="Blood Description"></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
            <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- New Button Stop -->
    </v-toolbar>
    <v-data-table :headers="headers" :items="blood" class="elevation-1">
      <template v-slot:items="props">
        <td>{{ props.item.b_name }}</td>
        <td class="text-xs-right">{{ props.item.b_description }}</td>
        <td class="justify-center layout px-0">
          <v-icon small class="mr-2" @click="editItem(props.item)">edit</v-icon>
          <v-icon small @click="deleteItem(props.item)">delete</v-icon>
          
        </td>
      </template>
      <!--  -->
      <template v-slot:no-data>
        <v-flex>No Data!</v-flex>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { blood } from "../../services/blood-service.js";
export default {
  data: () => ({
    blood_search: "",
    dialog: false,
    isError: false,
    blood: [],
    headers: [
      {
        text: "Blood Type",
        align: "left",
        sortable: false,
        value: "name"
      },
      { text: "Blood Description", value: "calories" }
    ],
    editedIndex: -1,
    editedItem: {
      b_name: "",
      b_description: ""
    },
    defaultItem: { b_name: "", b_description: "" }
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      blood.getBlood().then(response => {
        // console.log(JSON.stringify(response.data));
        this.blood = response.data;
      });
    },

    editItem(item) {
      console.log("This is Edit Item"+this.item);
      this.editedIndex = this.blood.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.blood.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.blood.splice(index, 1);
    },

    close() {
      this.dialog = false;
      this.isError = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },
    save() {
      if (this.editedIndex > -1) {
        // This is Update Statement
        console.log("This Is Edited INdex" + this.editedIndex);
        Object.assign(this.blood[this.editedIndex], this.editedItem);
        console.log(this.blood);
        if (this.blood.b_name && this.blood.b_description) {
          blood
            .updateBlood(this.editedItem)
            .then(response => {
              this.initialize();
              this.close();
              this.isError = false;
            })
            .catch(error => {
              console.error(error);
            });
        } else {
          this.isError = true;
        }
      } else {
        if (this.editedItem.b_name && this.editedItem.b_description) {
          blood
            .setBlood(this.editedItem)
            .then(response => {
              this.initialize();
              this.close();
              this.isError = false;
            })
            .catch(error => {
              console.error(error);
            });
        } else {
          this.isError = true;
        }
      }
    }
  }
};
</script>
   