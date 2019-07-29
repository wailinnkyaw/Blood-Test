  <template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>Donor</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-text-field v-model="donor_search" append-icon="search" label="Search"></v-text-field>
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
            <v-container grid-list-md>
              <v-layout column wrap>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.name" label="Group-Name"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.address" label="Address"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.phone" label="Phone No"></v-text-field>
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
        <td class="text-xs-right">{{ props.item.g_address }}</td>
        <td class="text-xs-right">{{ props.item.g_phoneno }}</td>
        <td class="text-xs-right">{{ props.item.created_at}}</td>
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
export default {
  data: () => ({
    donor_search: "",
    dialog: false,
    headers: [
      {
        text: "Group-Name",
        align: "left",
        sortable: false,
        value: "donor_group_name"
      },
      {
        text: "Description",
        value: "donor_group_description",
        sortable: false
      },
      { text: "Location", value: "donor_group_location", sortable: false },
      { text: "Phone No", value: "donor_group_phone", sortable: false },
      { text: "Created Date", value: "donor_group_created_date" },
      { text: "Actions", value: "name", sortable: false }
    ],
    donorGroup: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      address: "",
      phone: ""
    },
    defaultItem: {
      name: "",
      address: "",
      phone: ""
    }
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
        this.donorGroup = response.data.data;
        // this.donorGroup = resData.data;
        // eslint-disable-next-line
        console.log(JSON.stringify(this.donorGroup));
        // console.log(JSON.stringify(this.donorGroup))
      });
      this.donorGroup = [];
    },

    editItem(item) {
      this.editedIndex = this.donorGroup.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.donorGroup.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.donorGroup.splice(index, 1);
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.donorGroup[this.editedIndex], this.editedItem);
      } else {
        this.donorGroup.push(this.editedItem);
      }
      this.close();
    }
  }
};
</script>
