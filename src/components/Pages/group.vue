  <template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>Group</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-text-field v-model="group_search" append-icon="search" label="Search"></v-text-field>
      <!-- New Item Button Box Start -->
      <v-dialog v-model="dialog" max-width="500px" persistent>
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
                  <v-text-field v-model="editedItem.g_name" label="Group-Name"></v-text-field>
                </v-flex>

                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.g_description" label="Description"></v-text-field>
                </v-flex>

                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.g_location" label="Location"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.g_phone" label="Phone No"></v-text-field>
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
    <v-data-table :headers="headers" :items="donorGroup" class="elevation-1">
      <template v-slot:items="props">
        <td>{{ props.item.g_name }}</td>
        <td class="text-xs">{{props.item.g_description}}</td>
        <td class="text-xs">{{ props.item.g_location }}</td>
        <td class="text-xs">{{ props.item.g_phone }}</td>
        <td class="text-xs">{{ props.item.created_at}}</td>
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
import { donorGroup } from "../../services/donor-group-service";
import { error } from "util";
import { truncate } from "fs";
export default {
  data: () => ({
    group_search: "",
    dialog: false,
    headers: [
      {
        text: "Group-Name",
        align: "left",
        sortable: false,
        value: "g_name"
      },
      {
        text: "Description",
        value: "g_description",
        sortable: false
      },
      { text: "Location", value: "g_location", sortable: false },
      { text: "Phone No", value: "g_phone", sortable: false },
      { text: "Created Date", value: "created_at" },
      { text: "Actions", value: "name", sortable: false }
    ],
    donorGroup: [],
    editedIndex: -1,
    editedItem: {
      g_name: "",
      g_description: "",
      g_location: "",
      g_phone: ""
    },
    defaultItem: {
      g_name: "",
      g_description: "",
      g_location: "",
      g_phone: ""
    },
    isError: false
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
      donorGroup.getAllDonorGroup().then(response => {
        // console.log(JSON.stringify(response.data));
        this.donorGroup = response.data;
        // console.log(response.data);
        // this.donorGroup = resData.data;
        // eslint-disable-next-line
        // console.log("Hi", JSON.stringify(this.donorGroup));
        // console.log(JSON.stringify(this.donorGroup))
      });
    },

    editItem(item) {
      console.log("This is item--->" + this.item);
      this.editedIndex = this.donorGroup.indexOf(item);
      this.editedItem = Object.assign({}, item);
      // console.log(this.editedItem);
      this.dialog = true;
    },


    deleteItem(item) {
      // const index = this.donorGroup.indexOf(item);
      // console.log(this.item);
      // confirm("Are you sure you want to delete this item?") &&
      donorGroup
        .deleteDonorGroup(item.id)
        .then(res => {
          // console.log(res)
          this.initialize();
          alert('We are success fucking deleting shit')
        })
        .catch(err => {
          console.log(err);
        });
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
      // console.clear();
      // console.log("This is New Save Flag-->" + this.editedIndex);
      // console.log("This is isError===>"+this.isError);
      if (this.editedIndex > -1) {
        if (this.isEditedItem()) {
          donorGroup
            .updateDonorGroup(this.editedItem)
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
        // this is New Register Item
        if (this.isEditedItem()) {
          console.clear();
          console.log(this.editedItem);
          donorGroup
            .setDonorGroup(this.editedItem)
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
          console.log("This is Error Statement===>" + this.isError);
        }
      }
    },
    isEditedItem() {
      if (
        this.editedItem.g_name &&
        this.editedItem.g_description &&
        this.editedItem.g_location &&
        this.editedItem.g_phone
      )
        return true;

      return false;
    }
  }
};
</script>
